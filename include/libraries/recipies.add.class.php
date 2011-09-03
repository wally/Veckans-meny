<?php

	require_once('recipies.class.php');

	class RecipiesAdd extends Recipies
	{
		var $allowedFields = array(
								  array('name'=>'title'			, 'text'=>'Titel'						, 'required'=>true)
								, array('name'=>'link'			, 'text'=>'Länk'						, 'required'=>false)
								, array('name'=>'description'	, 'text'=>'Beskrivning (valfritt)'		, 'required'=>false)
								, array('name'=>'portions'		, 'text'=>'Portioner'					, 'required'=>false)
								, array('name'=>'ingredients'	, 'text'=>'Ingredienser'				, 'required'=>false)
								, array('name'=>'method'		, 'text'=>'Metod'						, 'required'=>false)
							);
		var $validFields = array();
		var $errors = array();
		var $errorCounter = 0;

		function __construct()
		{
			parent::__construct();
		}

		public function processRecipieAddition($data = array())
		{
			if(count($data) > 0 || (isset($_SESSION['forms']['recipie']['add']['data']) && count($_SESSION['forms']['recipie']['add']['data']) > 0) )
			{
				if( isset($data['action']) && in_array($data['action'], array('edit', 'add')) && isset($_SESSION['forms']['recipie']['add']['data']) )
				{
					$action = $data['action'];
					$data = $_SESSION['forms']['recipie']['add']['data'];
					$data['action'] = $action;
				}
				elseif( !isset($data['action']) )
				{
					unset($_SESSION['forms']['recipie']['add']['data']);
					return $this->drawAddRecipieForm();
				}

				if( $this->validateFields($data) )
				{

					switch ($data['action'])
					{
						case 'preview':
							return $this->displayPreview();
						break;
						case 'add':
							return $this->AddRecipie($this->validFields);
						break;
						case 'edit':
							return $this->drawAddRecipieForm($data);
						break;
						default:
							return $this->drawAddRecipieForm();
						break;
					}
				}
				else
				{
					return $this->drawAddRecipieForm();
				}
			}
			else
			{
				return $this->drawAddRecipieForm();
			}
		}
		
		public function validateFields($data)
		{
			$this->data = $data;
			unset($this->data['action']);
			
			foreach($this->allowedFields as $field)
			{
				$fieldName = $field['name'];
				if(isset($this->data[$fieldName]))
				{
					if( !empty($this->data[$fieldName]) || (empty($this->data[$fieldName]) && !$field['required']) )
					{
						if($fieldName == 'portions')
						{
							$this->data[$fieldName] = intval($this->data[$fieldName]);
						}
						
						$this->validFields[$fieldName] = $this->data[$fieldName];
					}
					else
					{
						$this->addError(
							array('error'=>'Detta får inte vara tomt!'
								, 'field'=>$fieldName
							)
						);
					}
				}
			}
			
			// v-- CUSTOM ERROR MESSAGES ---v
			
			$checkExistingArguments = array('identifier'=>'title', 'identifierValue'=>$data['title'], 'fields'=>'id,webb,title');
			$recipieExists = $this->checkExistingRecipie( $checkExistingArguments );
			
			//title already exists
			if(is_array($recipieExists))
			{
				$recipieLink = $this->createRecipieLink( null, false, $recipieExists[0] );
				$this->addError( array('error'=>'Receptet finns redan. Den är tillagd under &quot;'.$recipieLink.'&quot.', 'field'=>'title') );
			}
			
			//if the user has entered both a link and a recipie, the user must descide which of them to keep
			if( isset($this->validFields['link'], $this->validFields['ingredients'], $this->validFields['method'])
				&& !empty($this->validFields['link']) && !empty($this->validFields['ingredients']) && !empty($this->validFields['method'])
			)
			{
				$error = array('error'=>'Du kan inte ange en länk till ett recept, samtidigt som du skriver in ett recept. Du måste välja mellan de två.'
							, 'field'=>'link');
				$this->addError($error);
			}
			elseif ( !empty($this->validFields['link']) && empty($this->validFields['ingredients'])) // if the user has entered a link, the link must be valid
			{
				if(!$this->checkLink($this->data['link']))
				{
					$this->addError( array('error'=>'Felaktig länk.', 'field'=>'link') );
				}
			}
			elseif ( isset($this->validFields['link'], $this->validFields['ingredients'], $this->validFields['method'], $this->validFields['portions'] )
				&& empty($this->validFields['link']) && 
				( 
					!empty($this->validFields['ingredients'])
					 || !empty($this->validFields['method'])
					 || !empty($this->validFields['portions']) 
				)
			)
			{
				// user want's to add a recipie
				if( empty($this->validFields['ingredients']) )
				{
					$this->addError( array('error'=>'Detta fältet måste fyllas i!', 'field'=>'ingredients') );
				}
				
				if( empty($this->validFields['method']) )
				{
					$this->addError( array('error'=>'Detta fältet måste fyllas i!', 'field'=>'method') );
				}
				
				if( intval($this->validFields['portions']) <= 0 )
				{
					$this->addError( array('error'=>'Det måste vara 1 eller fler portioner', 'field'=>'portions') );
				}
			}
			else
			{
				$this->addError( array('error'=>'Du måste ange ett recept! Antingen som länk eller genom att skriva in det nedan.', 'field'=>'link') );
			}
						
			if($this->errorCounter > 0)
			{
				return false;
			}
			
			$_SESSION['forms']['recipie']['add']['data'] = $this->data;
			
			return true;
		}

		public function AddRecipie($data)
		{
			$checkExistingArguments = array('identifier'=>'title', 'identifierValue'=>$data['title'], 'fields'=>'id,webb');
			$recipieExists = $this->checkExistingRecipie( $checkExistingArguments );
			
			if($recipieExists === false)
			{
				$recipieType = $this->getRecipieType($data);
				
				switch ($recipieType)
				{
					case 'link':
						$content = $data['link'];
					break;
					case 'recipie':
						$content = $data['portions'].' portion'.($data['portions'] == 1 ? '' : 'er')."\n\n".'INGREDIENSER:'."\n".$data['ingredients']."\n\nMETOD:\n".$data['method'];
					break;
					default:
						$content = '';
					break;
				}
				
			
				$webb = $this->make_webbable_easy($data['title']);
				$query = '
				INSERT INTO recipies_main(title, webb, added, addedBy) 
				VALUES("'.$data['title'].'", "'.$webb.'", NOW(), '.$_SESSION['userid'].')';
				$result = $this->db->query($query, __FILE__, __LINE__);
				$id_main = $this->db->mysqli->insert_id;
				
				$query = '
				INSERT INTO recipies_recipies(parentId, description, content, type) 
				VALUES('.$id_main.', "'.trim($data['description']).'", "'.trim($content).'", "'.$recipieType.'")
				';
				$result = $this->db->query($query, __FILE__, __LINE__);
				
				$this->successfulAddition($webb, $id_main);
			}
			else
			{
				$recipieLink = $this->createRecipieLink( null, true, $recipieExists[0] );
				$this->addError( array('error'=>'Receptet finns redan. Den är tillagd under &quot;'.$recipieLink.'&quot.', 'field'=>'title') );
			}
		}
		
		public function successfulAddition($webb = '', $id = 0)
		{
			if(!empty($webb) && intval($id) > 0)
			{
				$href = $this->createRecipieLink(null, true, array('webb'=>$webb, 'id'=>$id));
			}
			else
			{
				$href = '/recept/add/';
			}
			header('Location: '.$href);
			exit;
		}
		
		public function drawAddRecipieForm($data = array())
		{
			$fieldData = array();
			foreach($this->allowedFields as $field)
			{
				$name = $field['name'];
				if( isset($this->validFields[$name]) )
				{
					$fieldData[ $name ] = $this->validFields[ $name ];
				}
				elseif( isset( $data[$name]) )
				{
					$fieldData[ $name ] = $data[ $name ];
				}
				else
				{
					$fieldData[ $name ] = '';
				}
			}
			
			$output = '<h2>Lägg till recept</h2>'."\n";
			$output .= '<form action="/recept/add/" method="post">'."\n";

			if($this->errorCounter > 0)
			{
				$output .= $this->error_box($this->displayErrors())."\n";
			}
			
			$output .= '<div class="rounded-16 clearfix">'."\n";
				$output .= '<label for="title">Titel: <span class="required">*</span></label><br /><input type="text" maxlength="60" style="font-size:24px;" name="title" id="title" value="'.$fieldData['title'].'" '.$this->errorInlineStyle('title').' />'."\n";
				$output .= $this->displayError('title')."\n";
				$output .= '<br /><br />'."\n";
				$output .= '<label for="description">Beskrivning (valfritt)</label><br />'."\n";
				$output .= '<textarea name="description" id="description" rows="4" cols="30" >'.$fieldData['description'].'</textarea>'."\n";
				
			$output .= '</div>'."\n";
			
			$output .= '<h3>Fyll i med en länk till ett recept eller med ett recept du skriver in själv</h3>'."\n";
			

			
			//link
			$output .= '<div class="rounded-16 clearfix">'."\n";
			$output .= '<h3><label for="link">Länk <span class="help" title="Länk till receptet">?</span></label></h3><input type="text" name="link" id="link" value="'.$fieldData['link'].'" '.$this->errorInlineStyle('link').' />'."\n";
			$output .= $this->displayError('link')."\n";
			$output .= '</div>'."\n";
			
			// or manual interaction
			
			$output .= '<div class="rounded-16 clearfix">'."\n";
			$output .= '<h3>Eget recept</h3>'."\n";
			$output .= '<div class="clearfix">'."\n";
			$output .= '<div style="width:520px;" class="left">'."\n";
			$output .= '<input type="text" name="portions" id="portions" value="'.$fieldData['portions'].'" '.$this->errorInlineStyle('portions', 'noClassLeft').' style="width:15px;" /> <label for="portions">portioner</label>'."\n";
			$output .= '</div>'."\n";
			$output .= $this->displayError('portions')."\n";
			$output .= '</div>'."\n";
			$output .= '<br /><br />'."\n";
			$output .= '<label for="ingredients">Ingredienser</label><br />'."\n";
			$output .= '<div class="clearfix">'."\n";
			$output .= '<textarea name="ingredients" id="ingredients" rows="6" cols="60" '.$this->errorInlineStyle('ingredients').'>'.$fieldData['ingredients'].'</textarea>'."\n";
			$output .= $this->displayError('ingredients')."\n";
			$output .= '</div>'."\n";
			
			
			$output .= '<br /><br />'."\n";
			$output .= '<label for="method">Metod (gärna i listform)</label><br />'."\n";
			$output .= '<div class="clearfix">'."\n";
			$output .= '<textarea name="method" id="method" rows="6" cols="60" '.$this->errorInlineStyle('method').'>'.$fieldData['method'].'</textarea>'."\n";
			$output .= $this->displayError('method')."\n";
			$output .= '</div>'."\n";
			$output .= '</div>'."\n";
			
			$output .= '<div class="submits">'."\n";
				$output .= '<button type="submit" class="green" name="action" value="preview">Förhandstitta</button>'."\n";
				$output .= ' eller <a href="/recept/" title="Avbryt">avbryt</a>.'."\n";
			$output .= '</div>'."\n";
			$output .= '</form>'."\n";

			return $output;
		}
		
		public function displayPreview($data = array())
		{
			$output = '';
			
			if( (isset($this->validFields) && (count($this->validFields) > 0) || count($data) > 0 ))
			{
				if(count($data) <= 0)
				{
					$data = $this->validFields;
				}
				
				$output .= '<div class="top-banner">'."\n";
					$output .= '<form action="/recept/add/" method="post">'."\n";
					$output .= 'Ser det inte rätt ut? <button type="submit" name="action" value="edit" class="button blue">Gå tillbaka och ändra</button> eller <button type="submit" name="action" value="add" class="button green">Bekräfta och lägg till receptet</button>. <!--<a href="#" class="close">Stäng</a>-->'."\n";
				$output .= '</div>'."\n";
				
				require_once( 'recipies.view.class.php' );
				
				$class_RecipiesView = new RecipiesView();
				
				$recipieSimulation = $class_RecipiesView->viewRecipie($data, true); //preview = true
				$output .= $recipieSimulation['output'];
			}
			else
			{
				header('Location: /recept/add/');
				exit;
			}
			
			return $output;
		}
		
		public function addError($error = array())
		{
			if( isset($error['error'], $error['field']) && !isset($this->errors[$error['field']]) )
			{
				$this->errorCounter++;
				$this->errors[$error['field']] = $error['error'];
			}
		}
		
		public function displayErrors()
		{
			$output = '';
			if($this->errorCounter > 0)
			{
				return 'Oops! Det var visst några fel i ditt recept. Prova igen, så kanske det går bättre.';
			}
			else
			{
				return '';
			}
		}
		
		public function errorInlineStyle($field, $options='')
		{	
			if(isset($this->errors[$field]))
			{
				$output = 'class="inlineError';
				
				if( stristr($options, 'noClassLeft') === false )
				{
					$output .= ' left';
				}
				
				$output .= '"';
				return $output;
			}
		}
		
		public function displayError($field = '')
		{
			$output = '';
			
			if(isset($this->errors[$field]))
			{
				$output .= '<span class="error left">'.$this->errors[$field].'</span>'."\n";
			}
			
			return $output;
		}
	}
?>