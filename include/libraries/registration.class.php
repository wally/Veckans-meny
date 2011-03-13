<?php

	class Registration extends PublicFunctions
	{
		var $db, $numErrors;
		var $errors = array();

		public function __construct()
		{
			$this->db = new DB();
		}

		public function drawRegistrationForm($data = array())
		{
			$output = '';

			$data = $this->getRegistrationData();
			
			if($this->numErrors > 0)
			{
				$output .= $this->error_box( $this->displayErrors() );
			}
			
			$output .= $this->notice_box( 'Du kan ändra din anmälan fram till den 28 feb 23.59, sedan är det försent!<br /><br />Denna anmälan är INTE bindande. Den blir det när du godkänt priset för resan (priset kommer kort efter den 1 mars).<br /><br />Det är tänkt att resan skulle ta plats i första eller andra veckan av juni men det beror på när alla slutar/är lediga.' );

			$output .= '<form action="/registration.php" method="post" id="registrationForm">'."\n";
				$output .= '<input type="checkbox" name="willGo" id="willGo" '.$this->checked($data['willGo']).' /> <label for="willGo">Ja, jag vill gärna följa med till Amsterdam 2011</label>'."\n";
				
				$output .= '<br />'."\n";
				$output .= '<br />'."\n";
				
				$output .= '<input type="checkbox" name="hotel" id="hotel" '.$this->checked($data['hotel']).' /> <label for="hotel">Ja, jag vill bo på <strong>hotell</strong> under hela vistelsen</label>'."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";

				$output .= '<input type="checkbox" name="flight" id="flight" '.$this->checked($data['flight']).' /> <label for="flight">Ja, jag vill <strong>flyga till Amsterdam</strong> och inte spendera en vecka i en stinkig husbil tillsammans med <strong><big>LUDVIG</big></strong>.</label>'."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";
				
				$output .= '<input type="checkbox" name="public" id="public" '.$this->checked($data['public']).' /> <label for="public">Ja, jag vill visa för andra att jag åker med/åker inte med.</label>'."\n";

				$output .= '<br />'."\n";
				$output .= '<br />'."\n";
				
				$output .= '<input type="submit" onclick="return confirm(\'Är du säker på detta? Du kan ändra din anmälan fram till den 28 feb 23.59 sedan är det försent!\n\nDenna anmälan är INTE bindande!\');" value="Ja, anmäl mig nu!" />'."\n";
				$output .= '<input type="hidden" name="token" value="' . $this->createFormToken('registration') . '"/>'."\n";
			$output .= '</form>'."\n";
			return $output;
		}

		public function checked($value)
		{
			return $value == 1 ? 'checked="checked"' : '';
		}

		public function getRegistrationData($id = null)
		{
			if(intval($id) == 0)
			{
				$id = intval($_SESSION['id']);
			}

			$sql = 'SELECT willGo, hotel, flight, public FROM amsterdam2011_accounts WHERE id = ' . $id . ' LIMIT 1';
			$result = $this->db->query($sql, __FILE__, __LINE__);

			if($result->num_rows > 0)
			{
				$data = $result->fetch_assoc();
				return $data;
			}
			else
			{
				return array('willGo', 'hotel', 'flight', 'public');
			}
			
		}

		public function processRegistrationForm($data = array())
		{
			if(time() > strtotime('2011-02-28 23:59'))
			{
				$this->addError( 'Anmälningstiden har gått ut! Du kan inte ändra din anmålan.' );
				return false;
			}
			
			$valid_fields = array('willGo', 'hotel', 'flight', 'public');
			foreach($valid_fields as $field)
			{
				if(isset($data[$field]))
				{
					$update[$field] = 1;
				}
				else
				{
					$update[$field] = 0;
				}
			}
			

			
			if( !(isset($data['token']) && $this->createFormToken('registration') == $data['token']) )
			{
				$this->addError( 'Autentiseringskoden var fel. Var god försök igen.' );
			}
			
			if( ($update['hotel'] == 1 || $update['flight'] == 1) && $update['willGo'] == 0)
			{
				$this->addError( 'Du måste kryssa i att du vill till Amsterdam om du vill åka flyg eller bo på hotell.' );
			}
			
			if($this->numErrors > 0)
			{
				return false;
			}
			
			
			$fields = '';

			foreach($update as $field=>$value)
			{
				$fields .= $field . ' = ' . $value . ', ';
			}

			$fields = substr($fields,0,-2);

			$sql = 'UPDATE amsterdam2011_accounts SET '.$fields.' WHERE id = ' . intval($_SESSION['id']).' LIMIT 1';
			
			return $this->db->query($sql, __FILE__, __LINE__);

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