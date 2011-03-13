<?php

	class Login extends PublicFunctions
	{
		private $db;

		function __construct()
		{
			$this->db = new DB();
		}

		public function login($email, $password)
		{
			$this->email = $email;
			$this->password = $password;
		
			$this->checkUserCredentials($this->email, $this->password);			
		}

		
		public function checkUserCredentials($email='', $password='')
		{
			if( $this->controllPassword($email, $this->password) )
			{	
					$this->successfulLogin($email);
			}
			else
			{
				return $this->UnsuccessfulLogin('wrong-password');
			}

		}

		public function successfulLogin($email)
		{
			
			session_regenerate_id(true);
			
			$sql = 'UPDATE amsterdam2011_accounts 
			SET 
			lastlogon = ' . time() . '
			, lastip = "' . $_SERVER['REMOTE_ADDR'] . '"
			, lastaction = ' . time() . '
			, session_id = "' . session_id() . '"
			
			 WHERE email = "' . $email.'" LIMIT 1';

			 $result = $this->db->query($sql, __FILE__, __LINE__);
			 
			 $this->updateSessionData($email);
			 
			 header('Location: /');
			 exit;

		}

		public function updateSessionData($email)
		{
			$query = 'SELECT 
						id, userlevel, lastip, firstname, sirname, session_id, willGo, hotel, flight, public, streetAddress, zipcode, city 
					FROM  amsterdam2011_accounts 
					WHERE email = "'.$email.'" LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			$data = $result->fetch_assoc();
			$_SESSION = $data;
			$_SESSION['email'] = $email;
			$_SESSION['isLoggedIn'] = true;
		}

		public function UnsuccessfulLogin($code='')
		{
			if($code <> '')
			{
				switch ($code)
				{
					case 'no-account':
						$redirectUrl = '?error=no-account';
						break;
					case 'wrong-password':
						$redirectUrl = '?error=wrong-password';
						break; 
					default:
						$redirectUrl = '';
						break;
				}

				header( 'Location: /' . $redirectUrl );
				exit;
			}
		}

		public function drawLoginForm($error = '')
		{
			$output = '';
			$output .= '<form action="login.php" method="post">'."\n";

			switch($error)
			{
				case 'wrong-password':
					$output .= '<div class="error">OOops! Du skrev fel lösenord, eller är du en såndär hAck3r??!?!?</div>'."\n";
					break;
				case 'no-account':
					$output .= '<div class="error">Nehe du! Något sådant användarnamn finns inte!</div>'."\n";
			}

			$output .= '<label for="username">E-post:</label><br /><input type="text" style="width:200px;" name="username" id="username" />'."\n";
			$output .= '<br />'."\n";
			$output .= '<label for="password">Lösenord:</label><br /><input type="password" style="width:200px;" name="password" id="password" />'."\n";
			$output .= '<br /><br />'."\n";
			$output .= '<input type="submit" value="Logga in!" /> eller <a href="/createAccount.php">skapa ett konto</a>'."\n";
			$output .= '</form>'."\n";

			return $output;
		}
		
		public function controllPassword($email='', $passwordToCheck='')
		{
			if($email == '' && $this->checkLogin(false) )
			{
				$email = $_SESSION['email'];
			}
						
			$correctPassword = $this->getPassword($email);
			
			$hashedUnknownPassword = $this->hashPassword($email, $passwordToCheck);
			
			return $hashedUnknownPassword == $correctPassword;
		}
		
		public function hashPassword($email='', $password='', $privateSalt='')
		{
			if($email == '' && $this->checkLogin(false) )
			{
				$email = $_SESSION['email'];
			}
			else if($email == '' && !$this->checkLogin(false))
			{
				$this->logout();
			}
			
			if($privateSalt == '')
			{	
				$privateSalt = $this->getPrivateSalt($email);
			}
			
			return $this->encrypt_pass($email, $password, $privateSalt);
		}
		
		public function getPassword($email = '')
		{
			if($email == '' && $this->checkLogin(false) )
			{
				$email = $_SESSION['email'];
			}
			else if($email == '' && !$this->checkLogin(false))
			{
				$this->logout();
			}
			
			$query = 'SELECT `password` FROM amsterdam2011_accounts WHERE email = "'.$email.'" LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			if($result->num_rows > 0)
			{
				$data = $result->fetch_assoc();
				return $data['password'];
			}
			else
			{
				return false;
			}
		}

		public function getPrivateSalt($email = '')
		{
			if($email == '' && $this->checkLogin(false) )
			{
				$email = $_SESSION['email'];
			}
			else if($email == '' && !$this->checkLogin(false))
			{
				$this->logout();
			}
			
			$query = 'SELECT privateSalt FROM amsterdam2011_accounts WHERE email = "'.$email.'" LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			if($result->num_rows > 0)
			{
				$data = $result->fetch_assoc();
				return $data['privateSalt'];
			}
			else
			{
				return false;
			}
		}
		
		public function updatePassword($email = '', $newPassword = '')
		{
			if($email == '' && $this->checkLogin(false) )
			{
				$email = $_SESSION['email'];
			}
			else if($email == '' && !$this->checkLogin(false))
			{
				$this->logout();
			}
			
			$newHashedPassword = $this->hashPassword($email, $newPassword);
			
			$query = 'UPDATE amsterdam2011_accounts SET password = "'.$newHashedPassword.'" WHERE email = "'.$email.'" LIMIT 1';
			return $this->db->query($query, __FILE__, __LINE__);
		}
		
		public function generatePrivateSalt($max = 150)
		{
			/** {{{ http://code.activestate.com/recipes/576894/ (r2) */
			/**
			* This function generates a password salt as a string of x (default = 15) characters
			* ranging from a-zA-Z0-9.
			* @param $max integer The number of characters in the string
			* @author AfroSoft <scripts@afrosoft.co.cc>
			*/
			$characterList = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			$i = 0;
			$salt = "";
			do {
				$salt .= $characterList{mt_rand(0,strlen($characterList)-1)};
				$i++;
			} while ($i <= $max);
			return $salt;
		}


		
		public function logout()
		{
			session_unset();
			session_destroy();
			
			header('Location: /');
			exit;
		}

	}

?>