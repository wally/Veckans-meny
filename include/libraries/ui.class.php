<?php
	
	class UI extends PublicFunctions
	{
		var $ui_options = null;
		
		public function __construct($options = null)
		{
			global $menu;
			$this->menu = $menu;
			$this->ui_options = $options;
		}
		
		public function top()
		{

			$output = '';
			
			$this->ui_options['return'] = isset($this->ui_options['return']) ? $this->ui_options['return'] : false;

			$this->ui_options['sidebar'] = isset($this->ui_options['sidebar']) ? $this->ui_options['sidebar'] : true;
			
			$this->ui_options['title'] = (isset($this->ui_options['title'])) ? $this->ui_options['title'] : '';
			$this->ui_options['title'] .= 'Veckans meny';
			
			$this->ui_options['login'] = (isset($this->ui_options['login'])) ? $this->ui_options['login'] : '';
			
			$this->ui_options['noMenu'] = (isset($this->ui_options['noMenu'])) ? $this->ui_options['noMenu'] : false;
			
			$this->ui_options['menu'] = (isset($this->ui_options['menu']) ? $this->ui_options['menu'] : 'home');

			//robots
			$this->ui_options['meta_robots'] = (isset($this->ui_options['meta_robots']) ? $this->ui_options['meta_robots'] : 'index,follow');
			
			$this->ui_options['header_extra'] = (isset($this->ui_options['header_extra']) ? $this->ui_options['header_extra'] : '');

			//javascript
			$this->ui_options['javascripts'] = (isset($this->ui_options['javascripts']) ? $this->ui_options['javascripts'] : array());
			//array_unshift($this->ui_options['javascripts'], 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', '/javascript/main.js', 'http://users.tpg.com.au/j_birch/plugins/superfish/js/superfish.js', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/superfish/supersubs.js?ver=1.4.8', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/slideshow/jquery.nivo.slider.pack.js?ver=2.4');
			$this->ui_options['javascripts'] = array('/javascript/jquery-1.6.2.min.js', '/javascript/date.js', '/javascript/date_se.js', '/javascript/jquery.datePicker.js', '/javascript/jquery.bxSlider.min.js', '/javascript/jquery.fancybox-1.3.4.pack.js', '/javascript/jquery.placeholder.min.js', '/javascript/main.js');
			$this->ui_options['javascripts'] = array_unique($this->ui_options['javascripts']);
			
			//stylesheets
			$this->ui_options['stylesheets'] = isset($this->ui_options['stylesheets']) ? $this->ui_options['stylesheets'] : array();
			array_unshift($this->ui_options['stylesheets'], '/css/style.css', '/css/superfish.css', '/css/nivo-slider.css', '/css/custom-nivo-slider.css', '/css/datePicker.css', '/bx_styles/bx_styles.css', '/css/pagenavi-css.css', '/css/jquery.fancybox-1.3.4.css');
	

			$output .= '
			
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="se-sv">  
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<title>'. $this->ui_options['title'] .'</title>
	';
		
			if(count($this->ui_options['stylesheets']) > 0)
			{
				foreach($this->ui_options['stylesheets'] as $stylesheet)
				{
					$output .= "\t"."\t".'<link rel="stylesheet" type="text/css" '.(is_array($stylesheet) ? (isset($stylesheet['media']) ? 'media="'.$stylesheet['media'].'" ' : '') : '').'href="'.(is_array($stylesheet) ? $stylesheet['href'] : $stylesheet).'" />'."\n";
		
				}
			}
	
		$output .= '
	
	<!--[if IE]>
	<link rel="stylesheet" href="/css/ie.css" type="text/css" media="screen" />
	<![endif]-->
	<!--[if IE 7]>
	<link rel="stylesheet" href="/css/ie7.css" type="text/css" media="screen" />
	<![endif]-->
	';
	
			$output .= $this->ui_options['header_extra'];

			$output .= '</head>'."\n";

			$output .= (isset($this->ui_options['body_extra'])) ? "\t".'<body ' . $this->ui_options['body_extra']  . "\n" : "\t".'<body ';
			$output .= 'class="bkgConcrete';
			
			if($this->ui_options['menu'] == 'home')
			{
				$output .= ' home';
			}
			
			$output .= '">'."\n";
			
			$output .= '
				<div id="container" class="clearfix">	
		<div id="header">
			<div class="inside clearfix">			
				<div id="logo"> 
							
					<h1 class="logo"><a href="/"><img src="/images/logo.png" alt="Veckans meny" /></a></h1> 
				
				</div>
				
				<div id="mainNav">
					<div class="menu-main-menu-container">
							'.$this->generateMenu().'
					</div>			
				</div>	
			</div>		
		</div> 
		
		<div id="content" class="clearfix threeFourth"> 
		';
						
			
			if($this->ui_options['return'])
			{
				return $output;
			}
			else
			{
				echo $output;
			}
		}
		
		public function generateMenu()
		{
			$output = '<ul id="menu-main-menu" class="sf-menu">';
			
			if(count($this->menu) > 0)
			{
				foreach($this->menu as $handle=>$menuItem)
				{
					$output .= '<li class="menu-item';
					
					if($handle == $this->ui_options['menu'])
					{
						$output .= ' current-menu-item';
					}
					$output .= '">'."\n";
					
					$output .= '<a href="'.$menuItem['href'].'" title="'.$menuItem['title'].'">'.$menuItem['label'].'</a></li>'."\n";
				}
			}
			$output .= '</ul>'."\n";
			
			return $output;
		}
		
		public function sidebar()
		{
			require_once( PATHS_LIBRARIES . 'recipies.class.php' );
			
			$this->classes->recipies = new Recipies();
			
			$this->sidebar['title'] = 'Andra recept';
			$this->sidebar['numSummary'] = 1;
			$this->sidebar['maxItems'] = 6;
			
			$this->sidebar['items'] = $this->classes->recipies->getSidebarItems( array('limit'=>$this->sidebar['maxItems']) );
			
			$output = '';
			$output .= '
			
			</div><!-- /content -->
			
			<div id="sidebar" class="oneFourth"> 
			<div id="ttrust_recent_posts-3" class="oneHalf oneFourth ttrust_recent_posts sidebarBox widgetBox">';
			
			$output .= '<h3>'.$this->sidebar['title'].'</h3>'."\n";
			
			$output .= '<ul>'."\n";
			
			if(count($this->sidebar['items']) > 0)
			{
				foreach($this->sidebar['items'] as $i=>$item)
				{
					if($i >= $this->sidebar['maxItems'])
					{
						break;
					}
					
					$class = ($i == 0 ? 'firstPost' : 'secondaryPost');
					
					if(!isset($item['description']))
					{
						$item['description'] = '';
					}
					
					if(!isset($item['added']))
					{
						$item['added'] = date('Y-m-d H:i:s');
					}
					
					$item['added'] = strftime('%e %b, %Y', strtotime( $item['added'] ) );;
					$item['added'] = strtolower($item['added']);
					
					$item['url'] = $this->classes->recipies->createRecipieLink(null, false, $item);
					
					$output .= '
				<li class="'.$class.'">
					<h2>'.$item['url'].'</h2> 
					<span class="meta">'.$item['added'].'</span>';

					if(!empty($item['description']) && ($i-$this->sidebar['numSummary'] < 0))
					{
						
						$output .= '<p>'.$this->wordCut($item['description'], 100, '...').'</p>'."\n";
					}
					
					$output .= '</li>'."\n";
														
				}
			}
			$output .= '</ul>'."\n";
			
			$output .= '
													
			</div>						
		    
		</div><!-- end sidebar -->';
		
			return $output;
		}
		
		public function bottom()
		{
			$output = '';
			
			if($this->ui_options['sidebar'])
			{
				$output .= self::sidebar();
			}
			
			$output .= '</div>
			
				<div id="footer">		
		<div class="main clearfix">
				
			<div class="oneFourth widget_ttrust_flickr footerBox widgetBox">				
				
				<h3>Länkar</h3>				
    			<div class="clearfix">
    				<ul>
    					<li><a href="/">Hem</a></li>
    					<li><a href="/veckans-meny/">Menyer</a></li>
    					<li><a href="/recept/">Recept</a></li>
    					<li><a href="/teman/">Teman</a></li>
    					<li><a href="/om-oss/">Om oss</a></li>
    				</ul>
    			</div> 
  
			</div>
				
			<div id="ttrust_twitter-3" class="oneFourth widget_ttrust_twitter footerBox widgetBox">
				<h3>Latest Tweets</h3>								
			<div id="twitterBox" class="clearfix"></div> 
 
   				<p class="twitterLink"><a class="action" href="http://twitter.com/"><span>Twitter</span></a></p> 
                 
			</div>
			<div id="text-3" class="oneFourth footerBox widgetBox">

				<h3>Om veckans meny</h3>
				<div class="textwidget"><p>Veckans meny startades sommaren 2011 av Waldemar Axdorph för att han ville ha ett bra sätt att få sin veckomeny gjord utan för mycket arbete. Sidan innehåller just nu över 40 recept och blir bättre för varje dag som går.</p> 
<p><a href="/om-oss/" class="button ">Läs mer</a></p> 
				</div>

			</div>
			
			<div id="text-4" class="oneFourth footerBox widgetBox">
				<div class="textwidget"><img src="/images/footer_logo.png" alt="Veckans meny" /></div> 
			</div>	
						
		</div><!-- end footer main -->
		
		<div class="secondary clearfix">
									<div class="left">&copy; 2011 <a href="http://www.veckansmeny.dev"><strong>Veckans meny</strong></a></div>
			<div class="right">&lt;3</div>
		</div><!-- end footer secondary-->		
				
	</div><!-- end footer -->
';

			if(count($this->ui_options['javascripts']) > 0)
			{
				foreach($this->ui_options['javascripts'] as $javascript)
				{
					$output .= "\t"."\t".'<script type="text/javascript" charset="utf-8" ';
					$output .= 'src="'.$javascript.'"></script>' . "\n";
				}
			}
			

			$output .= '

<script type="text/javascript"> 
jQuery(window).load(function() {
	jQuery("#slider").nivoSlider({		
			effect:"fold", //Specify sets like: "fold,fade,sliceDown"
			slices:12,			
			pauseTime: 5000, //Slide transition speed			
			captionOpacity:1, //Universal caption opacity
			manualAdvance:false //Force manual transitions
	});
});
</script>

</body>
</html>';	

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