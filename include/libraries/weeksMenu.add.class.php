<?php

	require_once('weeksMenu.class.php');

	class weeksMenuAdd extends weeksMenu
	{
		var $allowedFields = array(
								  array('name'=>'title'			, 'text'=>'Titel'								, 'required'=>true)
								, array('name'=>'week'			, 'text'=>'Vecka'								, 'required'=>true)
								, array('name'=>'description'	, 'text'=>'Beskrivning (valfritt)'				, 'required'=>false)
								, array('name'=>'recipie_0'		, 'text'=>'Recept måndag'						, 'required'=>false)
								, array('name'=>'recipie_1'		, 'text'=>'Recept tisdag'						, 'required'=>false)
								, array('name'=>'recipie_2'		, 'text'=>'Recept onsdag'						, 'required'=>false)
								, array('name'=>'recipie_3'		, 'text'=>'Recept torsdag'						, 'required'=>false)
								, array('name'=>'recipie_4'		, 'text'=>'Recept fredag'						, 'required'=>false)
								, array('name'=>'recipie_5'		, 'text'=>'Recept lördag'						, 'required'=>false)
								, array('name'=>'recipie_6'		, 'text'=>'Recept söndag'						, 'required'=>false)
								
							);
		var $validFields = array();
		var $errors = array();
		var $errorCounter = 0;
		var $class = null;

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
					return $this->drawAddMenuForm();
				}

				if( $this->validateFields($data) )
				{

					switch ($data['action'])
					{
						case 'preview':
							return $this->displayPreview();
						break;
						case 'add':
							return $this->AddMenu($this->validFields);
						break;
						case 'edit':
							return $this->drawAddMenuForm($data);
						break;
						default:
							return $this->drawAddMenuForm();
						break;
					}
				}
				else
				{
					return $this->drawAddMenuForm();
				}
			}
			else
			{
				return $this->drawAddMenuForm();
			}
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
				case 'getRecipiesSuggestions':
					$return['output'] = $this->getRecipieSuggestions($data);
				break;
				case 'getRecipieSummaryHTML':
					$return['output'] = $this->getRecipieSummaryHTML($data);
				break;
				case 'getMenuSuggestion':
					$return['output'] = $this->getMenuSuggestion($data);
				break;
			}
			
			return $return;
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
			if(!empty($this->validFields['title']))
			{
				$checkExistingArguments = array('identifier'=>'title', 'identifierValue'=>$this->validFields['title'], 'fields'=>'id,webb,title');
				$recipieExists = $this->checkExistingMenu( $checkExistingArguments );
				
				//title already exists
				if(count($recipieExists) > 0)
				{
					$recipieLink = $this->createMenuLink( null, false, $recipieExists[0] );
					$this->addError( array('error'=>'Receptet finns redan. Den är tillagd under &quot;'.$recipieLink.'&quot.', 'field'=>'title') );
				}
			}
			
			$foundRecipie = false;
			foreach($this->weekDays as $i=>$weekday)
			{
				if(isset($this->validFields['recipie_'.$i]) && intval($this->validFields['recipie_'.$i]) > 0)
				{
					$foundRecipie = true;
					break;
				}
			}
			
			if(!$foundRecipie)
			{
				$this->addError( array('field'=>'recipies', 'error'=>'Du måste ange minst ett recept.') );
			}
						
			if($this->errorCounter > 0)
			{
				return false;
			}
			
			$_SESSION['forms']['recipie']['add']['data'] = $this->data;
			
			return true;
		}

		public function AddMenu($data)
		{
			$checkExistingArguments = array('identifier'=>'title', 'identifierValue'=>$data['title'], 'fields'=>'id,webb');
			$recipieExists = $this->checkExistingMenu( $checkExistingArguments );
			
			$recipieExists = count($recipieExists) > 0;
			
			if($recipieExists === false)
			{
				$this->preint_r($data);
						
				$webb = $this->make_webbable_easy($data['title']);
				$query = '
				INSERT INTO recipies_menus(title, description, webb, added, addedBy) 
				VALUES("'.$data['title'].'", "'.$data['description'].'", "'.$webb.'", NOW(), '.$_SESSION['userid'].')';
				$result = $this->db->query($query, __FILE__, __LINE__);
				$id_menu = $this->db->mysqli->insert_id;
				
				$values_parts = array();
				foreach($this->weekDays as $i=>$weekDay)
				{
					if(isset($data['recipie_'.$i]) && intval($data['recipie_'.$i]) > 0)
					{
											//recipieId, menuId, weekDay
						$values_parts[] = '('.intval($data['recipie_'.$i]).', '.$id_menu.', '.$i.')';
					}
				}
				
				$values = implode(',', $values_parts);
				
				$query = '
				INSERT INTO recipies_menus_rel(recipieId, menuId, weekDay) 
				VALUES'.$values;
				
				$result = $this->db->query($query, __FILE__, __LINE__);
				
				$this->successfulAddition($webb, $id_menu);
			}
			else
			{
				$recipieLink = $this->createMenuLink( null, true, $recipieExists[0] );
				$this->addError( array('error'=>'Menyn finns redan. Den är tillagd under &quot;'.$recipieLink.'&quot.', 'field'=>'title') );
			}
		}
		
		public function successfulAddition($webb = '', $id = 0)
		{
			if(!empty($webb) && intval($id) > 0)
			{
				$href = $this->createMenuLink(null, true, array('webb'=>$webb, 'id'=>$id));
			}
			else
			{
				$href = '/recept/add/';
			}
			header('Location: '.$href);
			exit;
		}
		
		public function drawAddMenuForm($data = array())
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
			
			$output = '<h2>Lägg till meny</h2>'."\n";
			$output .= '<form action="/veckans-meny/add/" method="post">'."\n";

			if($this->errorCounter > 0)
			{
				$output .= $this->error_box($this->displayErrors())."\n";
			}
			
			$output .= '<div class="rounded-16 clearfix">'."\n";
				$output .= '<label for="title">Titel: <span class="required">*</span></label><br /><input type="text" maxlength="60" style="font-size:24px;" name="title" id="title" value="'.$fieldData['title'].'" '.$this->errorInlineStyle('title').' />'."\n";
				$output .= $this->displayError('title')."\n";
				$output .= '<br /><br />'."\n";
				$output .= '<div class="clearfix">'."\n";
				$output .= '<label for="week">Gäller för vecka: <span class="required">*</span></label><br />'."\n";
				$output .= '<input type="text" name="week" id="week" maxlength="2" style="width:15px;" value="'.$fieldData['week'].'" '.$this->errorInlineStyle('week').' />'."\n";
				$output .= $this->displayError('week')."\n";
				$output .= '</div>'."\n";
				$output .= ''."\n";
				$output .= '<br /><label for="description">Beskrivning (valfritt)</label><br />'."\n";
				$output .= '<textarea name="description" id="description" rows="4" cols="30" >'.$fieldData['description'].'</textarea>'."\n";
				
			$output .= '</div>'."\n";
			
			//add recipies
			$output .= '<h3>Recept <span class="required">*</span>'."\n";
			$output .= '<span class="right"><img src="/images/shuffle.png" class="shuffleRecipies" alt="Skapa en meny åt mig" /> <input type="checkbox" id="overwriteExisting" name="overwriteExisting" /><label for="overwriteExisting" style="font-size:12px">Ersätt valda recept</label></span>'."\n";
			$output .= '</h3>'."\n";
			$output .= '<div class="rounded-16 clearfix">'."\n";
			
			$output .= $this->displayError('link')."\n";
			
			$output .= '<ul class="recipie-selection">'."\n";
			foreach($this->weekDays as $i=>$weekDay)
			{
				$output .= '<li class="clearfix" id="weekday-'.$i.'">'."\n";
					$output .= '<h4 class="weekDays '.strtolower($this->weekDays_eng[$i]).'">'.$weekDay.'<a href="#" class="right button-edit">Ändra</a><img src="/images/loader-small.gif" alt="Laddar..." class="right hide loading-indicator" /></h4>'."\n";
					$output .= '<input type="hidden" name="recipie_'.$i.'" id="recipie_'.$i.'" value="'.$fieldData['recipie_'.$i].'" />'."\n";
					
					$output .= '<div class="recipieInfo-container">'."\n";
					if( !(isset($fieldData['recipie_'.$i]) && !empty($fieldData['recipie_'.$i])) )
					{
						$output .= 'Inget recept valt'."\n";
					}
					else
					{
						$output .= $this->getRecipieSummaryHTML(array('recipieId'=>$fieldData['recipie_'.$i]));
					}
					$output .= '</div>'."\n";
					$output .= '<div class="recipie-picker hide"></div>'."\n";
				$output .= '</li>'."\n";
			}
			$output .= '</ul>'."\n";
			
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
					$output .= '<form action="/veckans-meny/add/" method="post">'."\n";
					$output .= 'Ser det inte rätt ut? <button type="submit" name="action" value="edit" class="button blue">Gå tillbaka och ändra</button> eller <button type="submit" name="action" value="add" class="button green">Bekräfta och lägg till menyn</button>. <!--<a href="#" class="close">Stäng</a>-->'."\n";
				$output .= '</div>'."\n";
				
				require_once( 'weeksMenu.view.class.php' );
				require_once( 'recipies.class.php' );
				$this->classes->weeksMenuView = new weeksMenuView();
				$this->classes->recipies = new Recipies();
				
				foreach($this->weekDays as $i=>$weekDay)
				{
					if(isset($data['recipie_'.$i]) && intval($data['recipie_'.$i]) > 0)
					{
						$options = array();
						$options['fields'] = 'id,title,webb,grade,views';
						$options['identifier'] = 'id';
						$options['identifierValue'] = intval($data['recipie_'.$i]);
						$recipieData = $this->classes->recipies->getRecipie($options);
						$description = $this->classes->recipies->getRecipieContent(array('whereSQL'=>'parentId = '.intval($data['recipie_'.$i]), 'fields'=>'description'));
						$recipieData[0]['description'] = $description['description'];

						if(count($recipieData) > 0)
						{
							$recipieData = $recipieData[0];
						}
						$recipieData['weekDay'] = $i;
						$data['recipies'][$i] = $recipieData;
					}
				}
				
				$simulation = $this->classes->weeksMenuView->displayMenu($data, true); //preview = true
				$output .= $simulation['output'];
			}
			else
			{
				header('Location: /recept/add/');
				exit;
			}
			
			return $output;
		}
		
		public function getRecipieSuggestions($data = array())
		{
			if( !(isset($data['chosenRecipies']) && !empty($data['chosenRecipies'])) )
			{
				$data['chosenRecipies'] = 0;
			}
			else
			{
				$data['chosenRecipies'] = $this->cleanChosenRecipies($data['chosenRecipies']);
			}
			
			$query = 'SELECT id, title, webb, views, grade FROM '.TABLE_RECIPIES.' WHERE id NOT IN('.$data['chosenRecipies'].') ORDER BY RAND() LIMIT 12';
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			$output = '';
			require_once('recipies.class.php');
			$this->class->recipies = new Recipies();
			
			require_once('ratings.class.php');
			$this->class->ratings = new Ratings();
			
			if($result->num_rows > 0)
			{
				$output .= '<ul class="recipies-slides">'."\n";
				
				$i = 1;
				$page = 1;
				while($row = $result->fetch_assoc())
				{
					if($i == 4)
					{
						$page++;
						$i = 1;
					}
					
					if($i == 1)
					{
						$output .= '<li class="recipies-slides-container-slide clearfix">'."\n";
					}
					
					$userRating = $this->class->ratings->getUsersRatings(array('type'=>'recipie', 'recipieId'=>$row['id']));

					$output .= '<div class="recipies-slides-recipie-container';
					
					if(isset($userRating['favourite']) && $userRating['favourite'])
					{
						$output .= ' favourite'."\n";
					}
					
					$output .= '">'."\n";
					
					$output .= '<div class="text">'."\n";
					$link = $this->class->recipies->createRecipieLink(null, false, $row);
					$output .= '<h5>'.$link.'</h5>'."\n";
					
					$output .= '<ul>'."\n";
						$output .= '<li>Betyg: ';
						if($row['grade'] == 0)
						{
							$output .= 'För få röster'."\n";
						}
						else
						{
							$output .= $row['grade'].'/5'."\n";
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

						$output .= '<li>';

							$output .= $row['views'].' visning'. ($row['views'] == 1 ? '' : 'ar');

						$output .= '</li>' ."\n";

					$output .= '</ul>'."\n";
					
					$output .= '</div>'."\n";
					$output .= '<ul class="buttons">'."\n";
					$output .= '<li><a href="#"><img src="/images/love-btn.png" alt="Favorit" /></a></li>'."\n";
					$output .= '<li><a href="#"><img src="/images/add-btn.png" alt="Välj/Lägg till" class="add-recipie-button" id="recipieId-'.$row['id'].'" /></a></li>'."\n";
					$output .= '<li><a href="#"><img src="/images/remove-btn.png" alt="Ta bort" /></a></li>'."\n";
					$output .= '</ul>'."\n";
					$output .= '</div>'."\n";
					
					if($i == 3)
					{
						$output .= '</li>'."\n";
					}
					
					$i++;
				}
				
				$output .= '</ul>'."\n";
			}
			
			return $output;
		}
		
		public function getRecipieSummaryHTML($data = array())
		{
			if( !(isset($data['recipieId']) && intval($data['recipieId']) > 0 ) )
			{
				return '';
			}
			
			if(!isset($this->class->recipies))
			{
				require_once( 'recipies.class.php' );
				$this->class->recipies = new Recipies();
			}
			
			$info = $this->class->recipies->getRecipie( array('fields'=>'title,webb,added,addedBy,views', 'identifier'=>'id', 'identifierValue'=>$data['recipieId']) );
			$output = '';

			if(count($info) > 0)
			{
				$info = $info[0];
				$info['id'] = $data['recipieId'];
				$added = strftime('%e %b %Y', strtotime($info['added']));
				$added = strtolower($added);
				
				$output .= '<h5>' . $this->class->recipies->createRecipieLink(null, false, $info) . ' <a href="#" class="recipie-quicklook" id="quicklook-'.$info['id'].'"><img src="/images/quicklook.png" alt="Förhandstitta" /></a></h5>'."\n";
				$output .= '<span class="meta-recipie">Tillagd '.$added.' av '.$info['addedBy'].' - '. $info['views'].' visning'.($info['views'] == 1 ? '' : 'ar').'</span>'."\n";
				$output .= '<span class="buttons"><img src="/images/remove-btn.png" alt="Ta bort" class="removeRecipie" /></span>'."\n";
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