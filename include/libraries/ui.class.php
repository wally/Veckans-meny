<?php
	
	class UI extends PublicFunctions
	{
		var $ui_options = null;
		
		public function __construct($options = null)
		{
			$this->ui_options = $options;
		}
		
		public function top()
		{

			$output = '';
			
			$this->ui_options['return'] = isset($this->ui_options['return']) ? $this->ui_options['return'] : false;
			
			$this->ui_options['title'] = (isset($this->ui_options['title'])) ? $this->ui_options['title'] : 'Amsterdam 2011';
			
			$this->ui_options['login'] = (isset($this->ui_options['login'])) ? $this->ui_options['login'] : '';
			
			$this->ui_options['noMenu'] = (isset($this->ui_options['noMenu'])) ? $this->ui_options['noMenu'] : false;
			
			$this->ui_options['menu'] = (isset($this->ui_options['menu']) ? (is_array($this->ui_options['menu']) ? $this->ui_options['menu'] : array($this->ui_options['menu'])) : array('start'));

			//robots
			$this->ui_options['meta_robots'] = (isset($this->ui_options['meta_robots']) ? $this->ui_options['meta_robots'] : 'index,follow');
			
			$this->ui_options['header_extra'] = (isset($this->ui_options['header_extra']) ? $this->ui_options['header_extra'] : '');

			//javascript
			$this->ui_options['javascripts'] = (isset($this->ui_options['javascripts']) ? $this->ui_options['javascripts'] : array());
			array_unshift($this->ui_options['javascripts'], 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js');
			
			//stylesheets
			$this->ui_options['stylesheets'] = isset($this->ui_options['stylesheets']) ? $this->ui_options['stylesheets'] : array();
			array_unshift($this->ui_options['stylesheets'], '/css/reset.css', '/css/global.css');
	
			$output .= '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' . "\n";
			$output .= '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' . "\n";
			$output .= "\t".'<head>' . "\n";
						
			$output .= "\t"."\t".'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' . "\n";
			$output .= "\n\t"."\t".'<title>' . $this->ui_options['title'] . '</title>' . "\n";
			
			//favicon
			$output .= "\n\t"."\t".'<link rel="icon" href="/favicon.ico" type="image/x-icon" />' . "\n";
			$output .= "\t"."\t".'<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />' . "\n";
	
			if(count($this->ui_options['stylesheets']) > 0)
			{
				foreach($this->ui_options['stylesheets'] as $stylesheet)
				{
					$output .= "\t"."\t".'<link rel="stylesheet" type="text/css" '.(is_array($stylesheet) ? (isset($stylesheet['media']) ? 'media="'.$stylesheet['media'].'" ' : '') : '').'href="'.(is_array($stylesheet) ? $stylesheet['href'] : $stylesheet).'" />'."\n";
		
				}
			}
	
			$output .= "\n"."\t"."\t".'<!--[if lt IE 7]>'."\n";
			$output .= "\t"."\t".'<script defer type="text/javascript" src="/javascripts/pngfix.js"></script>'."\n";
			$output .= "\t"."\t".'<link rel="stylesheet" type="text/css" href="/css/ie-is-the-worst-browser-in-the-world.css" />'."\n";
			$output .= "\t"."\t".'<![endif]-->'."\n\n";
	
			if(count($this->ui_options['javascripts']) > 0)
			{
				foreach($this->ui_options['javascripts'] as $javascript)
				{
					$output .= "\t"."\t".'<script type="text/javascript" ';
					$output .= 'src="'.$javascript.'"></script>' . "\n";
				}
			}
			$output .= "\n\n";
	
			$output .= $this->ui_options['header_extra'];
	
			$output .= "\t".'</head>' . "\n";
			$output .= (isset($this->ui_options['body_extra'])) ? "\t".'<body ' . $this->ui_options['body_extra'] . '>' . "\n" : "\t".'<body>' . "\n";
						
			$output .= '<div id="container'.$this->ui_options['login'].'">'."\n";

			$output .= '<h1 id="logo"><a href="/">Amsterdam 2011!</a></h1>'."\n";			

			$output .= '<div id="content">'."\n";
			
			
			if(!$this->ui_options['noMenu'] && $this->checkLogin(false) )
			{
				$output .= '<ul id="menu">'."\n";
					$output .= '<li><a href="/">Start</a></li>'."\n";
					$output .= '<li><a href="/registration.php">Anmälan</a></li>'."\n";
					$output .= '<li><a href="/participants.php">Vilka följer med?</a></li>'."\n";
					$output .= '<li><a href="/contactInfo.php">Kontaktuppgifter</a></li>'."\n";
					$output .= '<li class="right"><a href="/logout.php">Logga ut</a></li>'."\n";
					$output .= '<li class="right"><a href="/changePassword.php">Ändra lösenord</a></li>'."\n";
				$output .= '</ul>'."\n";
				$output .= '<div class="clear"></div>'."\n";
				
				$output .= '<hr />';
			}
			
			
			if($this->ui_options['return'])
			{
				return $output;
			}
			else
			{
				echo $output;
			}
		}
		
		public function bottom()
		{
			$output = '';
			
			$output .= '</div>'."\n";
			$output .= '</div>'."\n";
			
			$output .= "\t".'</body>'."\n";
			$output .= '</html>';

			if($this->ui_options['return'])
			{
				return $output;
			}
			else
			{
				echo $output;
			}
		}
	}
?>