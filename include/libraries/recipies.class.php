<?php

	class Recipies extends PublicFunctions
	{
		public $allowedRecipieIdentifiers = array(
												'id'
												, 'title'
												, 'link'
												, 'webb'
											);
		
		private $db;
		
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
		
		public function createRecipieLink($data, $hrefOnly=false)
		{
			$data['fields'] = 'id,title';
			$info = $this->getRecipie($data);
			$link = $href = '';
			if($info !== false)
			{
				$info = $info[0];
				$href = 'viewRecipie.php?id='.$info['id'];
				$link = '<a href="'.$href.'">'.$info['title'].'</a>';
			}
			
			if($hrefOnly === true)
			{
				return $href;
			}
			
			return $link;
		}
		
		public function cleanFields($fields)
		{
			return parent::cleanFields($fields, $this->allowedRecipieIdentifiers);
		}
		
	}

?>