<?php

	class Search extends PublicFunctions
	{
		public $db;
		
		public $allowedFields 	= array(
									 array('title'=>'Sök', 'default'=>'', 'fieldName'=>'q')
									, array('title'=>'Sök efter', 'default'=>'recipies', 'fieldName'=>'searchFor')
									, array('title'=>'Sida', 'default'=>1, 'fieldName'=>'page')
								);
		public $options = array();
		public $searchResults = '';
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function processAJAXrequest($GET_data = array(), $POST_data = array())
		{
			if(!isset($GET_data['action']))
			{
				return false;
			}
			
			$return = array();
			
			switch($GET_data['action'])
			{
				case 'getInlineSearchResults':
					$return['output'] = $this->getInlineSearchResults($GET_data, $POST_data);
				break;
			}
			
			return $return;
		}
		
		public function search($options = array())
		{
			if( !(isset($options['q']) && !empty($options['q'])) )
			{
				$hasSearched = false;
			}
			else
			{
				$hasSearched = true;
			}
			
			$this->options = $this->cleanOptions($options);
			$this->page = 1;
			
			if(isset($options['page']) && is_numeric($options['page']))
			{
				$this->page = intval($options['page']);
			}
			$this->offset = $this->viewLimit*($this->page-1);
			
			$return = array('output'=>'','info'=>array());
			
			$return['output'] .= $this->drawSearchForm();
			
			if($hasSearched && ($this->options['recipies'] || $this->options['menus']))
			{
				$return['output'] .= $this->displaySearchResults();
			}
			
			return $return;
		}
		
		public function drawSearchForm()
		{
			$output = '';
			
			$output .= '<form action="/sok/" method="get" id="searchForm" class="bigSearchForm">'."\n";
			$output .= '<input type="text" name="q" id="q" placeholder="Sök efter recept och menyer" value="'.$this->options['q'].'" />'."\n";
			$output .= ' <input type="submit" value="Sök" class="blue" />'."\n";
			$output .= '<br />'."\n";
			$output .= 'Sök efter <input type="radio" name="searchFor" value="recipies" id="recipies" '.($this->options['recipies'] ? 'checked="checked"' : ''). ' />'."\n";
			$output .= '<label for="recipies"> Recept</label>'."\n";
			$output .= ' <input type="radio" name="searchFor" id="menus" value="menus" '.($this->options['menus'] ? 'checked="checked"' : ''). ' />'."\n";
			$output .= '<label for="menus"> Menyer</label>'."\n";
			$output .= '</form>'."\n";
			
			return $output;
		}
		
		public function displaySearchResults()
		{
			if( !is_array($this->searchResults) ) //check if a search has been made. If it has, searchResults should be an array
			{
				$this->getSearchResults();
			}
			
			$output = '';

			$pagination = $this->displayPagination($this->page, $this->offset, $this->numResults, array('baseHref'=>'/sok/'));
			
			$output .= $pagination['top'];

			$output .= '<div id="searchResults">'."\n";
			
			if(count($this->searchResults) > 0)
			{
				$output .= '<ul>'."\n";

				require_once( 'recipies.class.php' );
				require_once( 'weeksMenu.class.php' );
				require_once( 'ratings.class.php' );
				
				$this->classes->recipies = new Recipies();
				$this->classes->weeksMenu = new WeeksMenu();
				$this->classes->ratings = new Ratings();
				foreach($this->searchResults as $result)
				{
					switch($result['type'])
					{
						case 'recipie':
							$link = $this->classes->recipies->createRecipieLink(null, false, $result);
							break;
						case 'menu':
							$link = $this->classes->weeksMenu->createMenuLink(null, false, $result);
						break;
					}
					
					$output .= '<li>'."\n";
					
					$userRating = array('favourite'=> false);
					
					if(isset($_SESSION['userId']))
					{
						$userRating = $this->classes->ratings->getUserRating(array('type'=>$result['type'], 'typeId'=>$result['id'], 'userId'=>intval($_SESSION['user_id'])));
					}
					$output .= '<h2>'.$link.'</h2>'."\n";
					
					if($userRating['favourite'])
					{
						$output .= 'Favorit';
					}
					
					if(!empty($result['description']))
					{
						$output .= '<p>'.$this->bbcode($result['description']).'</p>'."\n";
					}
					
					$added = strftime('%e %b %Y', strtotime( $result['added'] ) );
					$added = strtolower( $added );

					
					$output .= 'Tillagd '.$added.' av '.$result['addedBy'].' &bullet; '. $result['views'].' visning'.($result['views'] == 1 ? '' : 'ar').' &bullet; '.(is_null($result['grade']) ? 'Inget betyg än' : $result['grade'])."\n";
					
					$output .= '</li>'."\n";
				}
				$output .= '</ul>'."\n";
			}
			else
			{
				$output .= '<li>'."\n";
				
				$output .= 'Hittade inga ';
				
				if($this->options['recipies'])
				{
					$output .= 'recept';
				}
				
				if($this->options['recipies'] && $this->options['menus'])
				{
					$output .= ' eller ';
				}
				
				if($this->options['menus'])
				{
					$output .= 'menyer';
				}
				
				$output .= '. Prova med en annan term eller leta själv bland <a href="/recept/">recepten</a> och <a href="/veckans-meny/">menyer</a>.'."\n";
				$output .= '</li>'."\n";
			}
			
			$output .= '</div>'."\n";
			
			$output .= $pagination['bottom'];
			
			return $output;
		}
		
		public function getSearchResults()
		{
			$this->searchResults = array();
			
			if($this->options['recipies'])
			{
				$select = '
				r_main.id,
				r_main.title,
				r_main.webb, 
				r_main.added, 
				r_main.addedBy, 
				r_main.views, 
				r_main.grade, 
				"recipie" AS `type`, 
				"" AS `description` ,
				(MATCH (r_main.title) AGAINST("'.$this->options['q'].'") * 0.6 + MATCH(r_r.description, r_r.content) AGAINST("'.$this->options['q'].'") * 0.4 ) AS relevance';
				$table = 'recipies_main AS r_main';
				$innerJoin = 'INNER JOIN recipies_recipies AS r_r ON r_r.parentId = r_main.id';
				$where = 'MATCH (r_main.title) AGAINST("'.$this->options['q'].'") OR MATCH(r_r.description, r_r.content) AGAINST("'.$this->options['q'].'")'.' OR r_main.title LIKE "%'.$this->options['q'].'%" OR r_r.content LIKE "%'.$this->options['q'].'%"';
				$sort = 'DESC';
				$orderBy = 'relevance '.$sort.', title';
				$query = $queryRecipies = 'SELECT '.$select.' FROM '.$table.' '.$innerJoin.' WHERE '.$where.' ORDER BY '.$orderBy.' LIMIT '.$this->offset.', '.$this->viewLimit;
				
				$totalRowsQuery = 'SELECT NULL FROM '.$table.' '.$innerJoin.' WHERE '.$where;
				$result = $this->db->query($totalRowsQuery, __FILE__, __LINE__);
				$this->numResults = $result->num_rows;
			}
			
			if($this->options['menus'])
			{
				$select = '
				r_menu.id, 
				r_menu.title, 
				r_menu.webb, 
				r_menu.added, 
				r_menu.addedBy, 
				r_menu.views, 
				r_menu.grade, 
				"menu" AS `type`, 
				r_menu.description,
				MATCH(title,description) AGAINST ("'.$this->options['q'].'") AS relevance';
				$table = 'recipies_menus AS r_menu';
				$where = 'MATCH(title,description) AGAINST ("'.$this->options['q'].'") OR r_menu.title LIKE "%'.$this->options['q'].'%"';
				$sort = 'DESC';
				$orderBy = 'relevance '.$sort.', title';
				$query = $queryMenus = 'SELECT '.$select.' FROM '.$table.' WHERE '.$where.' ORDER BY '.$orderBy.' LIMIT '.$this->offset.', '.$this->viewLimit;
				$totalRowsQuery = 'SELECT NULL FROM '.$table.' WHERE '.$where;
				$result = $this->db->query($totalRowsQuery, __FILE__, __LINE__);
				$this->numResults = $result->num_rows;
			}
			
			
			$result = $this->db->query($query, __FILE__, __LINE__);
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$this->searchResults[] = $row;
				}
			}
			
			return $this->searchResults;
		}
		
		public function cleanOptions($options = array())
		{
			$cleanOptions = array();
			foreach($this->allowedFields as $field)
			{
				if( isset($options[$field['fieldName']]) && !empty($options[$field['fieldName']]) )
				{
					$cleanOptions[$field['fieldName']] = $options[$field['fieldName']];
				}
				else
				{
					$cleanOptions[$field['fieldName']] = $field['default'];
				}
			}
			
			if(strtolower($cleanOptions['searchFor']) == 'recipies')
			{
				$cleanOptions['recipies'] = true;
				$cleanOptions['menus'] = false;
			}
			else
			{
				$cleanOptions['recipies'] = false;
				$cleanOptions['menus'] = true;
			}
						
			return $cleanOptions;
		}
		
		public function getInlineSearchResults($requestInfo, $data)
		{
			if( !(isset($data['q']) && !empty($data['q'])) )
			{
				$hasSearched = false;
			}
			else
			{
				$hasSearched = true;
			}
			
			$this->options = $this->cleanOptions($data);
			$this->page = 1;
			
			if(isset($data['page']) && is_numeric($data['page']))
			{
				$this->page = intval($data['page']);
			}
			$this->offset = $this->viewLimit*($this->page-1);
			$data['recipies'] = true;
			$result = $this->getSearchResults($data);
			
			$output = '';
			
			$output .= '<h4>Sökresultat</h4>'."\n";
			/*
			if(count($this->searchResults) > 0)
			{
				$output .= '<p style="font-size:12px;font-weight:bold;color:black;">'.count($this->searchResults).' träff'.(count($this->searchResults) == 1 ? '' : 'ar').'</p>'."\n";
				$output .= '<ul class="search-results-slide">'."\n";

				require_once( 'recipies.class.php' );
				require_once( 'weeksMenu.class.php' );
				require_once( 'ratings.class.php' );
				
				$this->classes->recipies = new Recipies();
				$this->classes->weeksMenu = new WeeksMenu();
				$this->classes->ratings = new Ratings();
				foreach($this->searchResults as $result)
				{
					switch($result['type'])
					{
						case 'recipie':
							$link = $this->classes->recipies->createRecipieLink(null, false, $result);
							break;
						case 'menu':
							$link = $this->classes->weeksMenu->createMenuLink(null, false, $result);
						break;
					}
					
					$output .= '<li>'."\n";
					$userRating = array('favourite'=> false);
					
					if(isset($_SESSION['userId']))
					{
						$userRating = $this->classes->ratings->getUserRating(array('type'=>$result['type'], 'typeId'=>$result['id'], 'userId'=>intval($_SESSION['user_id'])));
					}
					$output .= '<h5>'.$link.'</h5>'."\n";
					
					if($userRating['favourite'])
					{
						$output .= 'Favorit';
					}
					
					if(!empty($result['description']))
					{
						$output .= '<p>'.$this->bbcode($result['description']).'</p>'."\n";
					}
					
					$added = strftime('%e %b %Y', strtotime( $result['added'] ) );
					$added = strtolower( $added );

					
					$output .= 'Tillagd '.$added.' av '.$result['addedBy'].' &bullet; '. $result['views'].' visning'.($result['views'] == 1 ? '' : 'ar').' &bullet; '.(is_null($result['grade']) ? 'Inget betyg än' : $result['grade'])."\n";
					
					$output .= '</li>'."\n";
				}
				$output .= '</ul>'."\n";
				
				*/
				
			if(count($this->searchResults) > 0)
			{
			
				$output .= '<p style="font-size:12px;font-weight:bold;color:black;">'.count($this->searchResults).' träff'.(count($this->searchResults) == 1 ? '' : 'ar').'</p>'."\n";
				
				require_once( 'recipies.class.php' );
				require_once( 'weeksMenu.class.php' );
				require_once( 'ratings.class.php' );
				
				$this->classes->recipies = new Recipies();
				$this->classes->weeksMenu = new WeeksMenu();
				$this->classes->ratings = new Ratings();
				
				$output .= '<ul class="search-results-slides">'."\n";
				
				$i = 1;
				$page = 1;
				
				foreach($this->searchResults as $result)
				{
					switch($result['type'])
					{
						case 'recipie':
							$link = $this->classes->recipies->createRecipieLink(null, false, $result);
							break;
						case 'menu':
							$link = $this->classes->weeksMenu->createMenuLink(null, false, $result);
						break;
					}

					if($i == 4)
					{
						$page++;
						$i = 1;
					}
					
					if($i == 1)
					{
						$output .= "\t".'<li class="recipies-slides-container-slide clearfix">'."\n";
					}
					
					$userRating = array('favourite'=> false);
					
					if(isset($_SESSION['userId']))
					{
						$userRating = $this->classes->ratings->getUserRating(array('type'=>$result['type'], 'typeId'=>$result['id'], 'userId'=>intval($_SESSION['user_id'])));
					}

					$output .= "\t"."\t".'<div class="recipies-slides-recipie-container';
					
					if(isset($userRating['favourite']) && $userRating['favourite'])
					{
						$output .= ' favourite'."\n";
					}
					
					$output .= '">'."\n";
					
						$output .= "\t"."\t"."\t".'<div class="text">'."\n";
							$output .= "\t"."\t"."\t"."\t".'<h5>'.$link.'</h5>'."\n";
							
							$output .= "\t"."\t"."\t"."\t".'<ul>'."\n";
								$output .= "\t"."\t"."\t"."\t"."\t".'<li>Betyg: ';
								if($result['grade'] == 0)
								{
									$output .= 'För få röster';
								}
								else
								{
									$output .= $result['grade'].'/5';
								}
								
								$favouriteClass = '';
								if($userRating['favourite'])
								{
									$title = 'Favoritmåltid - klicka för att ta bort som favorit';
									$favouriteClass = 'favouritedRecipie';
								}
								else
								{
									$title = 'Klicka för att göra till favoritmåltid';
								}
					
								$output .= '</li>'."\n";
		
								$output .= "\t"."\t"."\t"."\t"."\t".'<li>';
		
									$output .= $result['views'].' visning'. ($result['views'] == 1 ? '' : 'ar');
		
								$output .= '</li>' ."\n";
		
							$output .= "\t"."\t"."\t"."\t".'</ul>'."\n";
						
						$output .= "\t"."\t"."\t".'</div>'."\n";
					
						$output .= "\t"."\t"."\t".'<ul class="buttons">'."\n";
							$output .= "\t"."\t"."\t"."\t".'<li><a href="#"><img src="/images/love-btn.png" alt="Favorit" /></a></li>'."\n";
							$output .= "\t"."\t"."\t"."\t".'<li><a href="#"><img src="/images/add-btn.png" alt="Välj/Lägg till" class="add-recipie-button" id="recipieId-'.$result['id'].'" /></a></li>'."\n";
							$output .= "\t"."\t"."\t"."\t".'<li><a href="#"><img src="/images/remove-btn.png" alt="Ta bort" /></a></li>'."\n";
						$output .= "\t"."\t"."\t".'</ul>'."\n";
					$output .= "\t"."\t".'</div>'."\n";
					
					if($i == 3)
					{
						$output .= "\t".'</li>'."\n";
					}
					
					$i++;
				}
				
				$output .= '</ul>'."\n";
			}
			else
			{
				$output .= 'Hittade inga recept. Försök med ett mer allmänt sökord eller bläddra bland recepten.';
			}
			return $output;
		}
	//close class
	}
?>