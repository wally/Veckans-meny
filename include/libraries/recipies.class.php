<?php

	class Recipies extends PublicFunctions
	{
		public $allowedRecipieIdentifiers = array(
												'id'
												, 'title'
												, 'webb'
												, 'added'
												, 'addedBy'
												, 'views'
												, 'grade'
											);
		public $allowedsortBy 	= array('title'=>'Titel'
									,'added'=>'Tillagd'
									,'views'=>'Visningar'
									,'grade'=>'Betyg'
								);
		
		public $db;
		
		public $viewLimit = 10;
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function checkExistingRecipie($data = array())
		{
			$data['limit'] = 1;	
			return $this->getRecipie($data);
		}
		
		
		
		/*
			@param fields required string What fields to select. Fields separated by comma (blanks will be removed)
			@param identifier optional string What type of identifier (id, link etc)
			@param identifierValue optional string What to match the identifer with
			@param offset optional integer
			@param limit optional integer
		*/
		public function getRecipie($data = array())
		{

			if( !(isset($data['fields']) && !empty($data['fields']) ) )
			{
				return false;
			}
			
			
			if( isset($data['identifier'], $data['identifierValue']) )
			{
				
				if( !in_array($data['identifier'], $this->allowedRecipieIdentifiers) || empty($data['identifierValue']) )
				{
					return false;
				}

				$whereSQL = 'WHERE '.$data['identifier'].' = "'.$data['identifierValue'].'"';
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
			
			$query = 'SELECT '. $fieldsSQL.' FROM '. TABLE_RECIPIES . ' '.$whereSQL.' ORDER BY '. $sortBy.' ' . $sort .' LIMIT '.$offset. ', '.$limit;
			
			$result = $this->db->query($query, __FILE__, __LINE__);

			if($result->num_rows > 0)
			{
				$rows = array();
				while($row = $result->fetch_assoc())
				{
					$rows[] = $row;
				}
				return $rows;
			}
			else
			{
				return false;
			}
		}
		
		public function getRecipieContent($id = false)
		{
			if( $id === false && isset($this->recipieInfo['id']) )
			{
				$id = $this->recipieInfo['id'];
			}
			
			$whereSQL = '';
			$limit = 1;
			$data = array();
			
			if(is_array($id))
			{
				$data = $id;
				if(isset($data['whereSQL']))
				{
					$whereSQL = $data['whereSQL'];
				}
				
				if(isset($data['limit']))
				{
					$limit = intval($data['limit']);
				}
				
				if(!isset($data['fields']))
				{
					$data['fields'] = 'description,content,type';
				}
			}
			elseif(intval($id) > 0)
			{
				$id = intval($id);
				$whereSQL = 'parentId = '.$id;
				$data['fields'] = 'description,content,type';
			}
			else
			{
				return array('description'=>'', 'content'=>'', 'type'=>'unknown');;
			}
			
			
			$allowedFields = array('id','parentId', 'description', 'content', 'type');
			$fields = $this->cleanFields($data['fields'], $allowedFields);
			
			$fields = implode(', ', $fields);
			$whereSQL = !empty($whereSQL) ? 'WHERE '.$whereSQL : '';
			
			$sql = 'SELECT '.$fields.' FROM recipies_recipies '. $whereSQL .' LIMIT '.$limit;
			$result = $this->db->query($sql, __FILE__, __LINE__);
			
			if($result->num_rows > 0)
			{
				return $result->fetch_assoc();
			}
			else
			{
				return array('description'=>'', 'content'=>'', 'type'=>'unknown');
			}
		}
		
		public function createRecipieLink($data, $hrefOnly=false, $precachedInfo = array())
		{
			if(count($precachedInfo) == 0)
			{
				$data['fields'] = 'id,webb,title';
				$info = $this->getRecipie($data);
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
				
				$href = '/recept/'.$info['webb'].'/'.$info['id'].'/';

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
		
		public function getNumRecipies()
		{
			$query = 'SELECT NULL FROM '. TABLE_RECIPIES . ' WHERE is_removed = 0';
						
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			return $result->num_rows;
		}
		
		public function getUserRecipieRating($options)
		{

			if( !(isset($options['recipieId']) && intval($options['recipieId']) > 0) )
			{
				return false;
			}
			
			$options['type'] = 'recipie';
			
			require_once('ratings.class.php');
			
			$class_Ratings = new Ratings();
			return $class_Ratings->getUsersRatings($options);
		}
		
		public function cleanFields($fields, $allowedFields=array())
		{
			if(count($allowedFields) == 0)
			{
				$allowedFields = $this->allowedRecipieIdentifiers;
			}
			return parent::cleanFields($fields, $allowedFields);
		}
		
		public function getRecipieType($data = array())
		{
			$type = 'unknown';
			if(count($data) > 0)
			{
				if(isset($data['link']) && !empty($data['link']))
				{
					$type = 'link';
				}
				elseif(isset($data['portions'], $data['method'], $data['ingredients']) 
					&& !empty($data['portions']) 
					&& !empty($data['method']) 
					&& !empty($data['ingredients']) 
				)
				{
					$type = 'recipie';
				}				
			}
			return $type;
		}
		
		public function addView($id = 0)
		{
			if( intval($id) <= 0 )
			{
				if( isset($this->recipieInfo['id']) )
				{
					$id = $this->recipieInfo['id'];
				}
				else
				{
					return 0;
				}
			}
			else
			{
				$id = intval($id);
			}
			
			$query = 'UPDATE recipies_main SET views = views + 1 WHERE id = '.$id.' LIMIT 1';
			$this->db->query($query, __FILE__, __LINE__);
			
			if( isset($this->recipieInfo['views']) )
			{
				return ++$this->recipieInfo['views'];
			}
			
			return true;
		}
		
		public function getSidebarItems($options = array())
		{
			if( !(isset($options['limit']) && intval($options['limit']) > 0) )
			{
				$options['limit'] = 6;
			}
			
			$query = '
				SELECT r_m.id, r_m.title, r_m.webb, r_m.added, r_r.description
				 FROM recipies_main AS r_m
				 INNER JOIN recipies_recipies AS r_r ON r_r.parentId = r_m.id
				 WHERE r_r.description != ""
				 ORDER BY RAND()
				 LIMIT ' . $options['limit'];

			$result = $this->db->query($query, __FILE__, __LINE__);
			
			$return = array();
			
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$return[] = $row;
				}
			}
			return $return;
		}
		
		public function getRecipieSuggestion($options = array())
		{
			if(!(isset($options['limit']) && intval($options['limit']) > 0))
			{
				$options['limit'] = 7;
			}
			else
			{
				$options['limit'] = intval($options['limit']);
			}
			
			if( !(isset($options['chosenRecipies']) && !empty($options['chosenRecipies'])) )
			{
				$options['chosenRecipies'] = 0;
			}
			else
			{
				$options['chosenRecipies'] = $this->cleanChosenRecipies($options['chosenRecipies']);
			}
			
			$query = 'SELECT id FROM '. TABLE_RECIPIES.' WHERE id NOT IN ( '. $options['chosenRecipies'] .' ) ORDER BY RAND() LIMIT '.$options['limit'];
			$result = $this->db->query($query, __FILE__, __LINE__); 
			
			$data = array();
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$data[] = $row['id'];
				}
			}
			
			$data = implode(',', $data);
			return $data;
		}
	}

?>