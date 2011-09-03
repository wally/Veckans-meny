<?php
	require_once('recipies.class.php');
	
	class RecipiesView extends Recipies
	{
	
		public function __construct()
		{
			parent::__construct();
		}
		
		public function processAJAXrequest($data = array())
		{
			if(!isset($data['action']))
			{
				return false;
			}
			
			$return = array();
			
			switch($data['action'])
			{
				case 'getRecipieInfoFull':
					$return['output'] = $this->getRecipieInfoFull($data);
				break;
			}
			
			return $return;
		}
		
		public function viewAllRecipies($data = array())
		{
			$page = 1;
			
			if(isset($data['page']) && is_numeric($data['page']))
			{
				$page = intval($data['page']);
			}
			
			$offset = $this->viewLimit*($page-1);
			$output = '';
			
			$options = array();
			$options['offset'] = $offset;
			$options['limit'] = $this->viewLimit;
			$options['fields'] = 'id, title, webb';
			$options['sortBy'] = (isset($data['sortBy']) && !empty($data['sortBy']) && array_key_exists(strtolower($data['sortBy']), $this->allowedsortBy) ? $data['sortBy'] : 'added');
			$options['order'] = (isset($data['order']) && in_array(strtoupper($data['order']), array('ASC', 'DESC')) ? strtoupper($data['order']) : 'DESC');
		
			$recipies = $this->getRecipie($options);

			$numRecipies = $this->getNumRecipies();
			
			
			
			if($recipies === false)
			{
				$output .= $this->notice_box('Just nu finns det inga inlagda recept. <a href="/recept/add/">Lägg till ett du!</a>');
			}
			else
			{
				$options = array('button'=>array('href'=>'/recept/add/', 'title'=>'Lägg till recept'), 'baseHref'=>'/recept/');
				$pagination = $this->displayPagination($page, $offset, $numRecipies, $options);
				$output .= $pagination['top'].'<ul id="recipie-list">';
				
				foreach($recipies as $recipieInfo)
				{
					$userRating = $this->getUserRecipieRating(array('typeId'=>$recipieInfo['id']));
					
					$recipieLink = $this->createRecipieLink(array(), true, array('webb'=>$recipieInfo['webb'], 'id'=>$recipieInfo['id']));
					$output .= '<li>'."\n";
					$output .= '<h2><a href="'.$recipieLink.'">'.$recipieInfo['title'].'</a></h2>'."\n";
					
					if($userRating['favourite'])
					{
						$output .= 'Favorit';
					}
					
					$output .= 'Betyg: ';
					if($userRating['rating'] == 0)
					{
						$output .= 'Det här receptet har fått för få röster.';
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
		
		public function viewRecipie($data = array(), $preview = false)
		{
			if( !(isset($data['webb']) && !empty($data['webb'])) && !$preview)
			{
				header('Location: /recept/');
				exit;
			}
						
			$recipieInfo = false;
			$this->preview = $preview;
			
			if( !$this->preview )
			{
				$options = array();
				$options['fields'] = 'id, title, added, views';
				$options['identifier'] = 'webb';
				$options['identifierValue'] = $data['webb'];
				$recipieInfo = $this->getRecipie($options);
			}
			
			//create fake info for preview
			if($recipieInfo === false)
			{
				if($this->preview)
				{
					$data['webb'] = $this->make_webbable_easy($data['title']);
					$data['added'] = date('Y-m-d H:i:s');
					$data['id'] = 0;
					$data['views'] = 1;

					$recipieInfo = array($data);
				}
				else
				{
					 return $this->createNotFoundRecipieOutput();
				}
			}
			
			$recipieInfo[0]['webb'] = $data['webb'];
			$recipieInfo = $recipieInfo[0];
			$this->recipieInfo = $recipieInfo;
			
			//add a view to the recipie
			$this->addView();
			
			if($this->preview)
			{
				$userRating = array('rating'=>0, 'favourite'=>false);	
			}
			else
			{
				$userRating = $this->getUserRecipieRating(array('typeId'=>$this->recipieInfo['id']));
			}

			$output = '';

			$output .= '<div id="pageHead">'."\n";
			
			$output .= '<h1><a href="' . $this->createRecipieLink(null, true, $this->recipieInfo) . '">'.$this->recipieInfo['title'].'</a></h1>'."\n";
			
			$output .= '</div>'."\n";
			
			$output .= '
			<div class="threeFourth clearfix"> 
							    
			    <div class="page clearfix">';


			$output .= '<div class="recipie-meta clearfix">';
			
			$output .= '<span class="recipie-left">';
				
				$dateAddedFormatted = strftime('%e %b %Y', strtotime( $this->recipieInfo['added'] ) );
				$dateAddedFormatted = strtolower( $dateAddedFormatted );
				
				$output .= $dateAddedFormatted;
				
			$output .= '</span>'."\n";
			
			$output .= '<span class="recipie-middle">';
				$output .= $this->recipieInfo['views'] . ' visning' . ($this->recipieInfo['views'] == 1 ? '' : 'ar');
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
				$title = 'Favoritmåltid - klicka för att ta bort som favorit';
			}
			else
			{
				$title = 'Klicka för att göra till favoritmåltid';
			}

			$output .= '<a class="toggleFavoriteRecipie" href="/account/favourite/'.$this->recipieInfo['webb'].'" title="'.$title.'">'.$title.'</a>';


			$output .= '</span>'."\n";
			
			$output .= '</div>'."\n";
			$output .= '<div class="clear"></div>';
			
				$output .= $this->displayRecipieContent();
			
			$output .= '
			</div>
		</div>'."\n";
			
			return array('output'=>$output, 'info'=>$this->recipieInfo);
		}
		
		public function displayRecipieContent()
		{

			if( !$this->preview && !isset($this->recipieInfo['content'], $this->recipieInfo['description'], $this->recipieInfo['type']) )
			{
				$this->recipieInfo = array_merge($this->recipieInfo, $this->getRecipieContent());
			}
			elseif($this->preview)
			{
				$this->recipieInfo['type'] = $this->getRecipieType($this->recipieInfo);
				$this->recipieInfo['content'] = 'INGREDIENSER:'."\n".$this->recipieInfo['ingredients']."\n\nMETOD:\n".$this->recipieInfo['method'];
			}
			
			$output = '';
			
			if(!empty($this->recipieInfo['description']))
			{
				$output .= '<p>'.$this->bbcode($this->recipieInfo['description']).'</p>'."\n";
			}
			
			switch($this->recipieInfo['type'])
			{
				case 'link':
					$output .= '<p><a href="'.$this->recipieInfo['content'].'" rel="nofollow" target="_blank" class="button">Besök receptet!</a> Receptet finns inte här, utan på en annan hemsida. </p>'."\n";
				break;
				case 'recipie':
				default:
					$output .= $this->bbcode($this->recipieInfo['content'])."\n";
				break;
			}
			
			return $output;
		}
		
		
		public function createNotFoundRecipieOutput()
		{
			$output = '';

			$output .= '<div id="pageHead">'."\n";
			
			$output .= '<h1>Receptet hittades inte</h1>'."\n";
			
			$output .= '</div>'."\n";
			
			$output .= '
		<div id="main" class="clearfix">			 
			<div class="threeFourth clearfix">
			
			<a href="/recept/" class="button blue">Leta efter några andra!</a>
			
			</div>
		</div>';
		
			return array('output'=>$output, 'info'=>array('title'=>'Receptet hittades inte'));
		}
		
		public function getRecipieInfoFull($data = array())
		{
			if( !(isset($data['recipieId']) && intval($data['recipieId']) > 0) )
			{
				return false;
			}
			
			$data['recipieId'] = intval($data['recipieId']);
			
			$options = array();
			$options['fields'] = 'id, title, added, views';
			$options['identifier'] = 'id';
			$options['identifierValue'] = $data['recipieId'];
			$recipieInfo = $this->getRecipie($options);
			
			$output = '';
			
			if($recipieInfo !== false)
			{
				$this->recipieInfo = $recipieInfo[0];
				$this->recipieContent = $this->getRecipieContent($this->recipieInfo['id']);
				$output .= '<h3>'.$this->recipieInfo['title'].'</h3>'."\n";
				$output .= '<p>'.$this->bbcode($this->recipieContent['description']).'</p>'."\n";
				$output .= '<p>'.$this->bbcode($this->recipieContent['content']).'</p>'."\n";
			}
			else
			{
				$output .= 'Receptet hittades inte.'."\n";
			}
			
			return $output;
		}
	}
	
?>