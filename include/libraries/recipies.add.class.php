<?php

	require_once('recipies.class.php');

	class RecipiesAdd extends Recipies
	{
		private $db;
		var $allowedFields = array('title'=>'Titel', 'link'=>'Länk');
		var $errors = array();
		var $errorCounter = 0;

		function __construct()
		{
			$this->db = new DB();
		}

		public function processRecipieAddition($data)
		{
			$this->data = $data;
			$this->validFields = array();
			
			foreach($this->allowedFields as $name=>$title)
			{
				if(isset($this->data[$name]))
				{
					if( !empty($this->data[$name]) )
					{
						$this->validFields[$name] = $this->data[$name];
					}
					else
					{
						$this->addError('Fältet <strong>'.$title.'</strong> får inte vara tomt!');
					}
				}
			}
			
			if($this->errorCounter > 0)
			{
				return false;
			}
			
			return $this->AddRecipie($this->validFields);
		}

		public function AddRecipie($data)
		{
			//check existing records
			$query = 'SELECT id, title WHERE link LIKE "'.$data['link'].'%" LIMIT 1';
			$sql = $this->db->query($query, __FILE__, __LINE__);
			if($sql->num_rows == 0)
			{
				$query = 'INSERT INTO recipies(title, link) VALUES("'.$data['title'].'", "'.$data['link'].'")';
				$sql = $this->db->query($query, __FILE__, __LINE__);
				$id = $this->db->insert_id;
				successfulAddition($id);
			}
			else
			{
				$result = $sql->fetch_assoc();
				$this->addError('Receptet finns redan. Den är tillagd under &quot;<a href="viewRecipie.php?id='.$result['id'].'">'.$result['title'].'</a>&quot.');
			}
			
		}
		
		public function successfulAddition($id)
		{
			
		}
		
		public function drawAddRecipieForm($data)
		{
			$fieldData = array();
			foreach($this->allowedFields as $field=>$name)
			{
				if(isset($data[$field]))
				{
					$fieldData[$field] = $data[$field];
				}
				else
				{
					$fieldData[$field] = '';
				}
			}
			
			$output = '';
			$output .= '<form action="addRecipie.php" method="post">'."\n";

			if($this->errorCounter > 0)
			{
				$output .= $this->error_box($this->displayErrors())."\n";
			}
			

			$output .= '<label for="title">Titel:</label><br /><input type="text" style="width:200px;font-size:24px;" name="title" id="title" value="'.$fieldData['title'].'" />'."\n";
			$output .= '<br />'."\n";
			$output .= '<label for="link">Länk:</label><br /><input type="text" style="width:200px;" name="link" id="link" value="'.$fieldData['link'].'" />'."\n";
			$output .= '<br /><br />'."\n";
			$output .= '<input type="submit" value="Lägg till recept" />'."\n";
			$output .= '</form>'."\n";

			return $output;
		}
		
		public function addError($error)
		{
			$this->errorCounter++;
			$this->errors[] = $error;
		}
		
		public function displayErrors()
		{
			$output = '';
			if($this->errorCounter > 0)
			{
				$output .= '<ul>'."\n";
				foreach($this->errors as $error)
				{
					$output .= '<li>'.$error.'</li>'."\n";
				}
				$output .= '</ul>'."\n";
				return $output;
			}
			else
			{
				return '';
			}
		}
	}
?>