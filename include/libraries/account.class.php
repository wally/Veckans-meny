<?php

	class Account extends PublicFunctions
	{
		var $db, $numErrors;
		var $errors = array();
		var $validFieldNames = array(
							'firstname'=>'Förnamn'
							, 'sirname'=>'Efternamn'
							, 'email'=>'E-mail'
							, 'streetAddress'=>'Adress'
							, 'zipcode'=>'Postnummer'
							, 'city'=>'Stad'
							, 'available'=>'När slutar du skolan/är ledig? (YYYY-MM-DD)'
							, 'password'=>'Lösenord'
							, 'password2'=>'Lösenord igen'
						);
		
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function drawChangePasswordForm()
		{
			$output = '';
			
			if($this->numErrors > 0)
			{
				$output .= $this->error_box( $this->displayErrors() );
			}
			
			$output .= '<form action="/changePassword.php" method="post">'."\n";

				$output .= '<input type="hidden" name="token" value="' . $this->createFormToken('changePassword') . '"/>'."\n";
				
				$output .= '<label for="oldPassword">Gammalt lösenord</label>'."\n";
				$output .= '<br />'."\n";
				$output .= '<input type="password" name="oldPassword" id="oldPassword" /> '."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";
				
				$output .= '<label for="newPassword">Nytt lösenord</label>'."\n";
				$output .= '<br />'."\n";
				$output .= '<input type="password" name="newPassword" id="newPassword" /> '."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";

				$output .= '<label for="newPassword2">Nytt lösenord igen</label>'."\n";
				$output .= '<br />'."\n";
				$output .= '<input type="password" name="newPassword2" id="newPassword2" /> '."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";
				
				$output .= '<input type="submit" value="Ändra lösenord" />'."\n";
				
			$output .= '</form>'."\n";
			
			return $output;
		}
		
		public function processPasswordChange($data=array(), $email='')
		{
			if( $email == '')
			{
				$email = $_SESSION['email'];
			}
			
			if( !isset($data['oldPassword'], $data['newPassword'], $data['newPassword2']) )
			{
				$this->addError( 'Du måste fylla i alla fält!' );
			}
			else if( empty($data['oldPassword']) || empty($data['newPassword']) || empty($data['newPassword2']) )
			{
				$this->addError( 'Du måste fylla i alla fält!' );
			}
			else
			{
				require_once( 'login.class.php' );
				$login = new Login();
				if( !$login->controllPassword($_SESSION['email'], $data['oldPassword']) )
				{
					$this->addError( 'Ditt gamla lösenord stämmer inte.' );
				}
				else if( $data['newPassword'] != $data['newPassword2'] )
				{
					$this->addError( 'Dina nya lösenord stämmer inte överens.' );
				}
			}
		
			if( !( isset($data['token']) && $this->createFormToken('changePassword') == $data['token']) )
			{
				$this->addError( 'Autentiseringskoden var fel. Var god försök igen.' );
			}
			
			if($this->numErrors > 0)
			{
				return false;
			}
			
			
			return $login->updatePassword($email, $data['newPassword']);
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
		
		public function drawCreateAccountForm($data=array())
		{
			$output = '';

			if($this->numErrors > 0)
			{
				$output .= $this->error_box( $this->displayErrors() );
			}

			$output .= '<form action="/createAccount.php" method="post">'."\n";
			foreach($this->validFieldNames as $field=>$value)
			{
				if(!in_array($field, array('password', 'password2')) )
				{
					$output .= '
					<label for="'.$field.'">'.$value.'</label>
					<br />
					<input type="text" name="'.$field.'" id="'.$field.'" value="' . (isset($data[$field]) ? $data[$field] : '') . '" />
					<br /><br />'."\n";
				}
			}
			
			foreach(array('password'=>'Lösenord', 'password2'=>'Lösenord igen') as $field=>$value)
			{
				$output .= '
				<label for="'.$field.'">'.$value.'</label>
				<br />
				<input type="password" name="'.$field.'" id="'.$field.'" />
				<br /><br />'."\n";
			}
			
			$output .= '<input type="hidden" name="token" value="' . $this->createFormToken('createAccount') . '"/>'."\n";
			
			$output .= '<input type="submit" value="Skapa konto" />'."\n";
			
			return $output;
		
		}
		
		public function processAccountCreation($data)
		{
			
			foreach($this->validFieldNames as $fieldName=>$fieldDisplayName)
			{
				if(isset($data[$fieldName]))
				{
					$updateFields[$fieldName] = $data[$fieldName];
				}
			}
			
			if( !(isset($data['token']) && $this->createFormToken('createAccount') == $data['token']) )
			{
				$this->addError( 'Autentiseringskoden var fel. Var god försök igen.' );
			}
			
			
			//check empty fields
			
			$cantBeEmptyFields = array(
									'firstname'
									, 'sirname'
									, 'email'
									, 'streetAddress'
									, 'zipcode'
									, 'city'
									, 'available'
									, 'password2'
									, 'password'
								);
			foreach($cantBeEmptyFields as $field)
			{
				if( !isset( $updateFields[$field] ) || empty( $updateFields[$field] ) )
				{
					$this->addError( 'Du måste fylla fältet <em>'. $this->validFieldNames[$field] .'</em>.' );
				}
				else if($field == 'email' && !$this->is_valid_email_address($updateFields[$field]))
				{
					$this->addError('E-postadressen är felaktig.');
				}
			}
			
			if( isset( $updateFields['zipcode'] ) && !preg_match( '/^\d{3} ?\d{2}$/', $updateFields['zipcode'] ) )
			{
				$this->addError( 'Felangivet postnummer. XXXXX eller XXX XX är tillåtet.' );
			}
			else if ( isset( $updateFields['zipcode'] ) )
			{
				$updateFields['zipcode'] = str_replace(' ', '', $updateFields['zipcode']);
			}
			
			if( isset( $updateFields['email'] ) && $this->isEmailInUse( $updateFields['email'] ))
			{
				$this->addError( 'E-postadressen du angivit är redan i bruk.' );
			}
			
			if( isset( $updateFields['available'] ) && !$this->is_date( $updateFields['available'] ) )
			{
				$this->addError( 'Felangivet datum. Är du säker på att du skrev på formatet YYYY-MM-DD?' );
			}
			
			
			if(isset($updateFields['password'], $updateFields['password2']))
			{
				if(!empty($updateFields['password']) && $updateFields['password'] != $updateFields['password2'])
				{
					$this->addError( 'Lösenorden stämmer inte överens.' );
				}
			}
			else
			{
				$this->addError( 'Du måste fylla i lösenord.' );
			}
			
			if(count($this->numErrors) > 0)
			{
				return false;
			}
			
			if($this->addAccount($updateFields))
			{
				return true;
			}
			else
			{
				$this->addError('Något gick fel vid kontoskapandet. Var god försök igen.');
				return false;
			}
		}
		
		public function addAccount($data=array())
		{
			require_once( 'login.class.php' );
			$login = new Login();

			$privateSalt = $login->generatePrivateSalt(254); // IMPORTANT! CANNOT be 255
			$hashedPassword = $login->hashPassword($data['email'], $data['password'], $privateSalt);
                
			$query = 'INSERT INTO 
                    amsterdam2011_accounts
                        ( 
                            email
                            , password
                            , privateSalt
                            , regtimestamp
                            , regip
                            , firstname
                            , sirname
                            , streetAddress
                            , zipcode
                            , city
                            , available
                            , session_id
                        )
                        VALUES 
                        (
                            "'.$data['email'].'"
                            , "'.$hashedPassword.'"
                            , "'.$privateSalt.'"
                            , '.time().'
                            , "'.$_SERVER['REMOTE_ADDR'].'"
                            , "'.$data['firstname'].'"
                            , "'.$data['sirname'].'"
                            , "'.$data['streetAddress'].'"
                            , '.intval($data['zipcode']).'
                            , "'.$data['city'].'"
                            , "'.$data['available'].'"
                            , "'.$data['password'].'"
                        )';
			return $this->db->query($query, __FILE__, __LINE__);
		}
		
		public function isEmailInUse($email)
		{
			$query = 'SELECT NULL FROM amsterdam2011_accounts WHERE email = "'.$email.'" LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			return $result->num_rows;
			
		}
		
		public function displayWelcomeMessage()
		{
			$output = '';
			
			$output .= $this->success_box('<h2>Ditt konto har nu skapats!</h2><p>Logga in nedan för att komma åt det och för att <strong>göra din anmälan!</strong></p>');
			
			require_once( 'login.class.php' );
			
			$login = new Login();
			
			$output .= $login->drawLoginForm();
			
			return $output;
		}
	}

?>