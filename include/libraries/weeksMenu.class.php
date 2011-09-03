<?php
	
	class weeksMenu extends PublicFunctions
	{
		public $allowedMenuIdentifiers = array(
												'id'
												, 'title'
												, 'description'
												, 'webb'
												, 'added'
												, 'addedBy'
												, 'views'
											);
		public $allowedsortBy 	= array('title'=>'Titel'
									,'added'=>'Tillagd'
									,'views'=>'Visningar'
									,'grade'=>'Betyg'
								);
		public $viewLimit = 10;
		
		public $weekDays = array('Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag');
		public $weekDays_eng = array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function getMenus( $data = array(), $debug = false )
		{
			if( !(isset($data['fields']) && !empty($data['fields'])) )
			{
				return false;
			}
			if(isset($data['debug']))
			{
				$debug = $data['debug'];
			}
			
			if( isset($data['WHERE']) && !empty($data['WHERE']) )
			{
				$whereSQL = 'WHERE ' . $data['WHERE'];
			}
			elseif( isset($data['identifier'], $data['identifierValue']) )
			{
				
				if( in_array($data['identifier'], $this->allowedMenuIdentifiers) && !empty($data['identifierValue']) )
				{
					$whereSQL = 'WHERE '.$data['identifier'].' = "'.$data['identifierValue'].'"';
				}
			}
			else
			{
				$whereSQL = '';
			}
			
			$limit = isset($data['limit']) ? intval($data['limit']) : 1;
			$offset = isset($data['offset']) ? intval($data['offset']) : 0;
			
			$sortBy = isset($data['sortBy']) ? $data['sortBy'] : 'id';
			$sort = isset($data['order']) ? (in_array(strtolower($data['order']), array('asc', 'desc')) ? strtoupper($data['order']) : 'ASC' ) : 'ASC';
			
			$fields = $this->cleanFields($data['fields']);
			
			$fieldsSQL = implode(', ', $fields);
			
			$query = 'SELECT '. $fieldsSQL.' FROM '. TABLE_MENUS . ' '.$whereSQL.' ORDER BY '. $sortBy.' ' . $sort .' LIMIT '.$offset. ', '.$limit;

			$result = $this->db->query($query, __FILE__, __LINE__);
			
			if($debug)
			{
				var_dump($query);
			}
			
			$rows = array();
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$rows[] = $row;
				}
			}
			return $rows;
		}
		
		public function checkExistingMenu($data = array())
		{
			$data['limit'] = 1;	
			return $this->getMenus($data);
		}
		
		public function getMenuRecipies($data = array())
		{
			if( !(isset($data['id']) && intval($data['id']) > 0) )
			{
				return array();
			}
			
			$query = '
				SELECT r_m.title, r_m.webb, r_m.grade, r_m.views, m_rel.weekDay, m_rel.recipieId as id, r_r.description
				 FROM '.TABLE_MENUS_REL.' AS m_rel
				 INNER JOIN '.TABLE_RECIPIES.' AS r_m ON r_m.id = m_rel.recipieId
				 INNER JOIN recipies_recipies AS r_r ON r_r.parentId = m_rel.recipieId
				 WHERE m_rel.menuId = '.$data['id'].' AND m_rel.is_removed = 0 AND r_m.is_removed = 0
				 ORDER BY m_rel.weekDay ASC';
			$result = $this->db->query($query, __FILE__, __LINE__);
			$recipies = array();
			
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$recipies[$row['weekDay']] = $row;
				}
			}
			return $recipies;
		}
		
		public function getNumMenus()
		{
			$query = 'SELECT NULL FROM '. TABLE_MENUS . ' WHERE is_removed = 0';
						
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			return $result->num_rows;
		}

		public function getUserMenuRating( $options = array() )
		{
			if( !(isset($options['typeId']) && intval($options['typeId']) > 0) )
			{
				return false;
			}
			
			$options['type'] = 'menu';
			
			require_once('ratings.class.php');
			
			$class_Ratings = new Ratings();
			return $class_Ratings->getUsersRatings($options);		
		}
		
		public function cleanFields($fields)
		{
			return parent::cleanFields($fields, $this->allowedMenuIdentifiers);
		}
		
		public function createMenuLink($data = array(), $hrefOnly=false, $precachedInfo = array())
		{
			if(count($precachedInfo) == 0)
			{
				$data['fields'] = 'id,webb,title';
				$info = $this->getMenus($data);
				$link = $href = '';
			}
			else
			{
				$info = array($precachedInfo);
			}
			
			if($info !== false)
			{
				$info = $info[0];
			
				if(!isset($info['webb']))
				{
					$info['webb'] = $this->make_webbable_easy($info['title']);
				}
				
				$href = '/veckans-meny/'.$info['webb'].'/'.$info['id'].'/';

				if($hrefOnly === true)
				{
					return $href;
				}
				
				$link = '<a href="'.$href.'" title="'.$info['title'].'">'.$info['title'].'</a>';
			}
			else
			{
				return '/';
			}
			
			return $link;
		}
		
		public function addView($id = 0)
		{
			if( intval($id) <= 0 )
			{
				if( isset($this->menuInfo['id']) )
				{
					$id = $this->menuInfo['id'];
				}
				else
				{
					return 0;
				}
			}
			
			$id = intval($id);
						
			$query = 'UPDATE '.TABLE_MENUS.' SET views = views + 1 WHERE id = '.$id.' LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			return true;
		}
		
		public function getNewestMenus($options=array())
		{
			$options['sortBy'] = 'added';
			$options['order'] = 'desc';
			$options['fields'] = 'title,webb,added,addedBy';
			return $this->getMenus($options);
		}
		
		public function getMenuSuggestion($options = array())
		{
			if( !isset($options['chosenRecipies']) )
			{
				$options['chosenRecipies'] = '';
			}
			
			$options['chosenRecipies'] = $this->cleanChosenRecipies($options['chosenRecipies']);
			
			if(!isset($this->classes->recipies))
			{
				require_once( 'recipies.class.php' );
				$this->classes->recipies = new Recipies();
			}
			
			$recipieOptions = array();
			if($options['chosenRecipies'] == 0)
			{
				$recipieOptions['limit'] = 7;
			}
			else
			{
				$recipieOptions['limit'] = 7-count(explode(',', $options['chosenRecipies']));
			}
			$recipieOptions['chosenRecipies'] = $options['chosenRecipies'];
			
			$recipies = $this->classes->recipies->getRecipieSuggestion($recipieOptions);
			
			return $recipies;
		}
	}
?>