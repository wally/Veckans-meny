<?php

	require_once('recipies.class.php');

	class RecipiesAdd extends Recipies
	{
		var $allowedFields = array('title'=>'Titel', 'link'=>'Länk');
		var $errors = array();
		var $errorCounter = 0;

		function __construct()
		{
			parent::__construct();
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
						if($name == 'link')
						{
							if(!$this->checkLink($this->data['link']))
							{
								$this->addError('Du har angivit en felaktig länk.');
							}
						}
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
			
			$checkExistingArguments = array('identifier'=>'link', 'identifierValue'=>$data['link'], 'fields'=>'id');
			
			$recipieExists = $this->checkExistingRecipie( $checkExistingArguments );
			
			if($recipieExists === false)
			{
				$webb = $this->make_webbable_easy($data['title']);
				$query = 'INSERT INTO recipies(title, link, webb) VALUES("'.$data['title'].'", "'.$data['link'].'", "'.$webb.'")';
				$sql = $this->db->query($query, __FILE__, __LINE__);
				$id = $this->db->mysqli->insert_id;
				$this->successfulAddition($id);
			}
			else
			{
				$recipieLink = $this->createRecipieLink(array('identifier'=>'id', 'identifierValue'=>$recipieExists[0]['id']));
				$this->addError('Receptet finns redan. Den är tillagd under &quot;'.$recipieLink.'&quot.');
			}
			
		}
		
		public function successfulAddition($id)
		{
			$href = $this->createRecipieLink(array('identifier'=>'id', 'identifierValue'=>$id), true);
			header('Location: '.$href);
			exit;
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
			

			$output .= '<label for="title">Titel:</label><br /><input type="text" style="font-size:24px;" name="title" id="title" value="'.$fieldData['title'].'" />'."\n";
			$output .= '<br /><br /><br /><h3>Fyll i med en länk till ett recept eller med ett recept du skriver in själv</h3>'."\n";
			
			//link
			$output .= '<div class="rounded-16">'."\n";
			$output .= '<h4><label for="link">Länk <span class="help" title="Länk till receptet">?</span></label></h4><input type="text" style="" name="link" id="link" value="'.$fieldData['link'].'" />'."\n";
			$output .= '</div>'."\n";
			
			// or manual interaction
			$output .= '<br /><br />'."\n";

			
			$output .= '<div class="rounded-16">'."\n";
			$output .= '<h4>Eget recept</h4>'."\n";
			$output .= '<label for="ingredients">Ingredienser</label><br />'."\n";
			$output .= '<textarea name="ingredients" id="ingredients" rows="6" cols="60"></textarea>'."\n";
			
			$output .= '<br /><br />'."\n";
			$output .= '<label for="method">Metod (gärna i listform)</label><br />'."\n";
			$output .= '<textarea name="method" id="method" rows="6" cols="60">1.&nbsp;&#10;2.&nbsp;</textarea>'."\n";
			$output .= '</div>'."\n";
			
			$output .= '<div class="submits">'."\n";
				$output .= '<input type="submit" class="green" name="preview" value="Förhandstitta" />'."\n";
				$output .= ' eller <a href="/recept/" title="Avbryt">avbryt</a>.'."\n";
			$output .= '</div>'."\n";
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