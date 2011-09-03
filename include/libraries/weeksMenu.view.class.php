<?php
	require_once('weeksMenu.class.php');
	
	class weeksMenuView extends weeksMenu
	{
		public function __construct()
		{
			parent::__construct();
		}
		
		public function processMenuView( $data = array() )
		{
			if( isset($data['webb'], $data['id']) && !empty($data['webb']) && intval($data['id']) > 0 )
			{
				$return = $this->displayMenu( $data );
			}
			else
			{
				$return = $this->listMenus( $data );
			}
			
			return $return;
		}
		
		public function displayMenu( $data = array(), $preview = false )
		{
			$output = '';
			$error_msg = 'Menyn du försökte titta på kunde vi inte hitta. Du kan <a href="/veckans-meny/">leta efter den</a> om du vill, eller kolla så att du skrev in rätt länk.';
			
			$menuInfo = false;
			$this->preview = $preview;
			
			if( !(isset($data['webb'], $data['id']) && intval($data['id']) > 0) && !$this->preview)
			{
				return $this->error_box($error_msg)."\n";
			}
			
			if( !$this->preview )
			{
				$options = array();
				$options['fields'] = 'id,title,added,addedBy,views,description';
				$options['recipies'] = true;
				$options['WHERE'] = 'webb = "'.$data['webb'].'" OR id = '.intval($data['id']);
			
				$menuInfo = $this->getMenus($options);
			}
					
			if($menuInfo === false)
			{
				if($this->preview)
				{
					$data['webb'] = $this->make_webbable_easy($data['title']);
					$data['added'] = date('Y-m-d H:i:s');
					$data['id'] = 0;
					$data['views'] = 1;

					$menuInfo = array($data);
				}
				else
				{
					 return $this->error_box($error_msg)."\n";
				}
			}
			
			$menuInfo[0]['webb'] = $data['webb'];
			$menuInfo = $menuInfo[0];
			$this->menuInfo = $menuInfo;
			
			//add a view to the menu
			$this->addView();
			
			if($this->preview)
			{
				$userRating = array('rating'=>0, 'favourite'=>false);	
			}
			else
			{
				$userRating = $this->getUserMenuRating(array('typeId'=>$this->menuInfo['id']));
			}

			$output = '';

			$output .= '<div id="pageHead">'."\n";
			
			$output .= '<h1><a href="' . $this->createMenuLink(null, true, $this->menuInfo) . '">'.$this->menuInfo['title'].'</a></h1>'."\n";
			
			$output .= '</div>'."\n";
			
			$output .= '
			<div class="threeFourth clearfix"> 
							    
			    <div class="page clearfix">';


			$output .= '<div class="recipie-meta clearfix">';
			
			$output .= '<span class="recipie-left">';
				
				$dateAddedFormatted = strftime('%e %b %Y', strtotime( $this->menuInfo['added'] ) );
				$dateAddedFormatted = strtolower( $dateAddedFormatted );
				
				$output .= $dateAddedFormatted;
				
			$output .= '</span>'."\n";
			
			$output .= '<span class="recipie-middle">';
				$output .= $this->menuInfo['views'] . ' visning' . ($this->menuInfo['views'] == 1 ? '' : 'ar');
			$output .= '</span>'."\n";
			
			$output .= '<span class="recipie-right">';

			if($userRating['rating'] == 0)
			{
				$output .= 'Inget betyg än';
			}
			else
			{
				$output .= $userRating['rating'].'/5 *';
			}

			if($userRating['favourite'])
			{
				$title = 'Favoritmeny - klicka för att ta bort som favorit';
			}
			else
			{
				$title = 'Klicka för att göra till favoritmeny';
			}

			$output .= '<a class="toggleFavoriteRecipie" href="/account/favourite/'.$this->menuInfo['webb'].'" title="'.$title.'">'.$title.'</a>';


			$output .= '</span>'."\n";
			
			$output .= '</div>'."\n";
			
				$output .= $this->displayMenuContent($data);
			
			$output .= '
			</div>
		</div>'."\n";
			
			return array('output'=>$output, 'info'=>$this->menuInfo);
		}
		
		public function listMenus( $data = array() )
		{	
			$page = 1;
			
			if(isset($data['page']) && is_numeric($data['page']))
			{
				$page = intval($data['page']);
			}
			
			$offset = $this->viewLimit*($page-1);
			
			$options = array();
			$options['offset'] = $offset;
			$options['limit'] = $this->viewLimit;
			$options['fields'] = 'id,title,webb,description';
			$options['sortBy'] = (isset($data['sortBy']) && !empty($data['sortBy']) && array_key_exists(strtolower($data['sortBy']), $this->allowedsortBy) ? $data['sortBy'] : 'added');
			$options['order'] = (isset($data['order']) && in_array(strtoupper($data['order']), array('ASC', 'DESC')) ? strtoupper($data['order']) : 'DESC');
		
			$menus = $this->getMenus($options);

			$numMenus = $this->getNumMenus();
			
			$output = '';

			if($menus === false)
			{
				$output .= $this->notice_box('Just nu finns det inga inlagda menyer. <a href="/veckans-meny/add/">Lägg till en du!</a>');
			}
			else
			{
				$options = array('button'=>array('href'=>'/veckans-meny/add/', 'title'=>'Gör din egen meny!'), 'baseHref'=>'/veckans-meny/');
				$pagination = $this->displayPagination($page, $offset, $numMenus, $options);
				$output .= $pagination['top'].'<ul id="recipie-list">';
				
				foreach($menus as $menuInfo)
				{
					$userRating = $this->getUserMenuRating(array('typeId'=>$menuInfo['id']));
					
					$recipieLink = $this->createMenuLink(array(), true, array('webb'=>$menuInfo['webb'], 'id'=>$menuInfo['id']));
					$output .= '<li>'."\n";
					$output .= '<h2><a href="'.$recipieLink.'">'.$menuInfo['title'].'</a></h2>'."\n";
					
					if($userRating['favourite'])
					{
						$output .= 'Favorit';
					}
					
					$output .= 'Betyg: ';
					if($userRating['rating'] == 0)
					{
						$output .= 'Den här menyn har fått för få röster.';
					}
					else
					{
						$output .= $userRating['rating'];
					}
					$output .= '</li>'."\n";
				}
				
				$output .= '</ul>'.$pagination['bottom'];
			}
			
			return array('output'=>$output);
		}
		
		public function displayMenuContent($data = array())
		{
			
			//check for existing data
			if(!isset($data['recipies']))
			{
				if(isset($data['id']) && intval($data['id']) > 0)
				{
					$data['recipies'] = $this->getMenuRecipies($data);
				}
			}
			
			if( !(isset($data['id']) && intval($data['id']) > 0) && !$this->preview)
			{
				return false;
			}
			
			if(!isset($data['editable']))
			{
				$data['editable'] = false;
			}
						
			require_once('recipies.class.php');
			$this->classes->recipies = new Recipies();
			
			$output = ''."\n\n";
			
			$output .= '<ul id="weekMenu-list">'."\n";
			
			foreach($this->weekDays as $i=>$weekDay)
			{
				if( !isset($data['recipies'][$i]) )
				{
					$recipie['weekDay'] = $i;
					$recipie['description'] = '';
					$recipieLink = '<em>Inget recept valt!</em>';
					$recipie['exists'] = false;
					$recipie['id'] = 0;
				}
				else
				{
					$recipie = $data['recipies'][$i];
					$recipie['title'] = $this->wordCut($recipie['title'], 60);
					$recipie['exists'] = true;
					$recipieLink = $this->classes->recipies->createRecipieLink(null, false, $recipie);
				}
				
				$output .= "\t".'<li id="recipieId-'.$recipie['id'].'-menuId-'.$data['id'].'-day-'.$i.'">'."\n";
				
					$output .= '<h3 class="weekDays '.strtolower($this->weekDays_eng[$i]).'">'.$weekDay.'</h3>'."\n";
					$output .= '<div class="recipie-container">'."\n";
						$output .= '<h4>'.$recipieLink;
						
						if($recipie['exists'])
						{
							$output .= '<a href="#" class="recipie-quicklook" id="quicklook-'.$recipie['id'].'"><img src="/images/quicklook.png" alt="Förhandstitta" /></a>'."\n";
						}
						
						$output .= '</h4>'."\n";
						
						$output .= '<p class="description">'.$this->bbcode($recipie['description']).'</p>'."\n";
					$output .= '</div>'."\n";
				$output .= "\t".'</li>'."\n";
			}
			
			$output .= '</ul>'."\n";
			return $output;
		}
	}
?>