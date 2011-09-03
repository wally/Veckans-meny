<?php

	class Frontpage extends PublicFunctions
	{
		public $db;
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function processFrontpage($options = array())
		{
			$return = array('output'=>'', 'title'=>'');
			
			switch(isset($options['action']) ? $options['action'] : 'standard')
			{
				case 'standard':
				default:
					$return = $this->displayFrontpage($options);
				break;
			}
			
			return $return;
		}
		
		public function displayFrontpage($options=array())
		{
			$return = array('output'=>'', 'title'=>'');
			$output = '';
			
			$output .= $this->welcomeMessage();
			$output .= $this->displayNewestMenus($options);
			$output .= $this->displayNewestRecipies($options);
		}
		
		public function welcomeMessage()
		{
			$output = '';
			$output .= '<h1>Välkommen till Veckans meny</h1>'."\n";
			$output .= '<p>Veckans meny är en sida som innehåller veckomenyer för att underlätta matplaneringen. Du kan <a href="/veckans-meny/add" title="Skapa en egen veckomeny">skapa egna menyer</a> eller <a href="/veckans-meny/" title="Bläddra bland veckomenyer">ta del av andras</a>.</p>'."\n";
			
			return $output;
		}
		
		public function displayNewestMenus($options=array())
		{
			require_once( 'weeksMenu.class.php' );
			$this->classes->weeksMenus = new weeksMenu();
			
			$options['limit'] = isset($options['limit-menus']) && intval($options['limit-menus']) ? intval($options['limit-menus']) : 5; 
			
			$newestMenus = $this->classes->weeksMenus->getNewestMenus($options);
			
			$this->preint_r($newestMenus);
		}
		
		public function displayNewestRecipies($options=array())
		{
		
		}
	}
?>