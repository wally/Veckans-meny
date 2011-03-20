<?php

	class Recipies extends PublicFunctions
	{
		public $allowedRecipieIdentifiers = array(
												'id'
												, 'title'
												, 'link'
												, 'webb'
											);
		
		public $db;
		
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
			
			$fields = $this->cleanFields($data['fields']);
			
			$fieldsSQL = implode(', ', $fields);
			
			$query = 'SELECT '. $fieldsSQL.' FROM recipies '.$whereSQL.' LIMIT '.$limit;
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
		
		public function createRecipieLink($data, $hrefOnly=false, $precachedInfo = array())
		{
			if(count($precachedInfo) == 0)
			{
				$data['fields'] = 'webb,title';
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
				$href = '/recept/'.$info['webb'];
				$link = '<a href="'.$href.'">'.$info['title'].'</a>';
			}
			else
			{
				return '/';
			}
			
			if($hrefOnly === true)
			{
				return $href;
			}
			
			return $link;
		}
		
		public function getUserRecipieRating($options)
		{

			if( !(isset($options['recipieId']) && intval($options['recipieId']) > 0) )
			{
				return false;
			}
			
			require_once('ratings.class.php');
			
			$class_Ratings = new Ratings();
			return $class_Ratings->getUserRecipieRating($options);
		}
		
		public function cleanFields($fields)
		{
			return parent::cleanFields($fields, $this->allowedRecipieIdentifiers);
		}
		
	}

?>