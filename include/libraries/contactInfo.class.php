<?php

	class ContactInfo extends PublicFunctions
	{
		var $db, $numErrors;
		var $errors = array();

		public $validFieldNames = array(
							'firstname'=>'Förnamn'
							, 'sirname'=>'Efternamn'
							, 'email'=>'E-mail'
							, 'streetAddress'=>'Adress'
							, 'zipcode'=>'Postnummer'
							, 'city'=>'Stad'
							, 'available'=>'När slutar du skolan/är ledig? (YYYY-MM-DD)'
						);
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function drawAddressForm($id=0)
		{
			$output = '';
			
			$data = $this->getAddressInfo($id);
			
			$output .= '<h2>Kontaktuppgifter</h2>'."\n";

			if($this->numErrors > 0)
			{
				$output .= $this->error_box( $this->displayErrors() );
			}

			$output .= '<form action="/contactInfo.php" method="post">'."\n";
			
			foreach($data as $field=>$value)
			{
				$output .= '
				<label for="'.$field.'">'.$this->getFieldName($field).'</label>
				<br />
				<input type="text" name="'.$field.'" id="'.$field.'" value="'.$value.'"'.($field == 'email' ? ' disabled="disabled"'  : '') .' />
				<br /><br />'."\n";
			
			}
			
			$output .= '<input type="hidden" name="token" value="' . $this->createFormToken('contactInfo') . '"/>'."\n";
			
			$output .= '<input type="submit" value="Spara" />'."\n";
			
			$output .= '</form>'."\n";
			
			return $output;
		}
		
		public function getFieldName($field)
		{
			return $this->validFieldNames[$field];
		}
		
		public function getAddressInfo($id=0)
		{
			if(intval($id) == 0)
			{
				$id = $_SESSION['id'];
			}
			
			$query = 'SELECT 
						firstname, sirname, email, streetAddress, zipcode, city, available 
					FROM amsterdam2011_accounts
					WHERE id = '.$id.' LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			if($result->num_rows > 0)
			{
				$data = $result->fetch_assoc();
				return $data;
			}
			else
			{
				require_once('login.class.php');
				Login::logout();
				exit;
			}
		}
		
		public function processUpdate($data, $id=0)
		{
			if(intval($id) == 0)
			{
				$id = intval($_SESSION['id']);
			}
			
			$updateFields = array();
			
			foreach($this->validFieldNames as $fieldName=>$fieldDisplayName)
			{
				if(isset($data[$fieldName]) && $fieldName != 'email')
				{
					$updateFields[$fieldName] = $data[$fieldName];
				}
			}
			
			//check empty fields
			$cantBeEmptyFields = array(
									'firstname'
									, 'sirname'
									, 'streetAddress'
									, 'zipcode'
									, 'city'
									, 'available'
								);
								
			foreach($cantBeEmptyFields as $field)
			{
				if( !isset( $updateFields[$field] ) || empty( $updateFields[$field] ))
				{
					$this->addError( 'Du måste fylla fältet '. $this->validFieldNames[$field] .'.' );
				}
			}
			
			if( !(isset($data['token']) && $this->createFormToken('contactInfo') == $data['token']) )
			{
				$this->addError( 'Autentiseringskoden var fel. Var god försök igen.' );
			}
			
			if( isset($updateFields['zipcode']) && !preg_match('/^\d{3} ?\d{2}$/', $updateFields['zipcode']) )
			{
				$this->addError( 'Felangivet postnummer. XXXXX eller XXX XX är tillåtet.' );
			}
			else if ( isset( $updateFields['zipcode'] ) )
			{
				$updateFields['zipcode'] = str_replace(' ', '', $updateFields['zipcode']);
			}
			
			if( isset( $updateFields['available'] ) && !$this->is_date( $updateFields['available'] ) )
			{
				$this->addError( 'Felangivet datum. Är du säker på att du skrev på formatet YYYY-MM-DD?' );
			}
			
			if(count($this->numErrors) > 0)
			{
				return false;
			}

			
			if( count($updateFields) > 0 )
			{
				$updateSQL = '';
				foreach($updateFields as $field=>$value)
				{
					if($field != 'email')
					{
						$updateSQL .= '`'.$field.'` = "' . $value . '", ';
					}
				}
				
				$updateSQL = substr($updateSQL, 0, -2);
				
				$query = 'UPDATE amsterdam2011_accounts SET ' . $updateSQL . ' WHERE id = ' . $id .' LIMIT 1';
				
				return $this->db->query($query, __FILE__, __LINE__);
			}
			return false;
		}
		
		public function addError($error)
		{
			$this->numErrors++;
			array_push($this->errors, $error);
			return $this->errors;
		}
		
		public function displayErrors()
		{
			if($this->numErrors > 0)
			{
				$output = '<ul>'."\n";
				
				foreach($this->errors as $error)
				{
					$output .= '<li>'.$error.'</li>'."\n";
				}
				
				$output .= '</ul>'."\n";
			}
			
			return $output;
		}
	}


?>