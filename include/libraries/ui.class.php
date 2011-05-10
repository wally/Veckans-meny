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

			$this->ui_options['sidebar'] = isset($this->ui_options['sidebar']) ? $this->ui_options['sidebar'] : true;
			
			$this->ui_options['title'] = (isset($this->ui_options['title'])) ? $this->ui_options['title'] : '';
			$this->ui_options['title'] .= 'Veckans meny';
			
			$this->ui_options['login'] = (isset($this->ui_options['login'])) ? $this->ui_options['login'] : '';
			
			$this->ui_options['noMenu'] = (isset($this->ui_options['noMenu'])) ? $this->ui_options['noMenu'] : false;
			
			$this->ui_options['menu'] = (isset($this->ui_options['menu']) ? (is_array($this->ui_options['menu']) ? $this->ui_options['menu'] : array($this->ui_options['menu'])) : array('name'=>''));

			//robots
			$this->ui_options['meta_robots'] = (isset($this->ui_options['meta_robots']) ? $this->ui_options['meta_robots'] : 'index,follow');
			
			$this->ui_options['header_extra'] = (isset($this->ui_options['header_extra']) ? $this->ui_options['header_extra'] : '');

			//javascript
			$this->ui_options['javascripts'] = (isset($this->ui_options['javascripts']) ? $this->ui_options['javascripts'] : array());
			array_unshift($this->ui_options['javascripts'], 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js', '/javascript/main.js', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/jquery.jcarousel.min.js?ver=0.2.7', 'http://users.tpg.com.au/j_birch/plugins/superfish/js/superfish.js', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/superfish/supersubs.js?ver=1.4.8', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/slideshow/jquery.nivo.slider.pack.js?ver=2.4', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/fancybox/jquery.fancybox-1.3.4.pack.js?ver=1.3.4');
			$this->ui_options['javascripts'] = array_unique($this->ui_options['javascripts']);
			
			//stylesheets
			$this->ui_options['stylesheets'] = isset($this->ui_options['stylesheets']) ? $this->ui_options['stylesheets'] : array();
			array_unshift($this->ui_options['stylesheets'], '/css/style.css', '/css/superfish.css');
	

			$output .= '
			
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="se-sv">  
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<title>'. $this->ui_options['title'] .'</title>
	
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Serif:regular,italic,bold,bolditalic">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold"> 
	';
		
			if(count($this->ui_options['stylesheets']) > 0)
			{
				foreach($this->ui_options['stylesheets'] as $stylesheet)
				{
					$output .= "\t"."\t".'<link rel="stylesheet" type="text/css" '.(is_array($stylesheet) ? (isset($stylesheet['media']) ? 'media="'.$stylesheet['media'].'" ' : '') : '').'href="'.(is_array($stylesheet) ? $stylesheet['href'] : $stylesheet).'" />'."\n";
		
				}
			}
	
	$output .= '
	
	<link rel="stylesheet" id="slideshow-css"  href="http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/slideshow/nivo-slider.css?ver=2.42 type="text/css" media="all" /> 
	<link rel="stylesheet" id="slideshow_custom-css"  href="http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/slideshow/custom-nivo-slider.css?ver=1.4.8" type="text/css" media="all" /> 
	<link rel="stylesheet" id="fancybox-css"  href="http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/fancybox/jquery.fancybox-1.3.4.css?ver=1.3.4" type="text/css" media="all" /> 
	';
	$output .= '
	
	<style type="text/css" media="screen">

		body { padding: 30px 0 30px 0 !important; }
		#container { margin-bottom: 30px; }
	</style>

	<!--[if IE]>
	<link rel="stylesheet" href="http://themetrust.com/demos/craft/wp-content/themes/craft/css/ie.css" type="text/css" media="screen" />
	<![endif]-->
	<!--[if IE 7]>
	<link rel="stylesheet" href="http://themetrust.com/demos/craft/wp-content/themes/craft/css/ie7.css" type="text/css" media="screen" />
	<![endif]-->
	';
	
			$output .= $this->ui_options['header_extra'];

			$output .= '</head>'."\n";

			$output .= (isset($this->ui_options['body_extra'])) ? "\t".'<body ' . $this->ui_options['body_extra']  . "\n" : "\t".'<body ' . "\n";
			$output .= 'class="bkgConcrete';
			
			if($this->ui_options['menu']['name'] == 'start')
			{
				$output .= ' home';
			}
			
			$output .= '">'."\n";
			
			$output .= '<div id="container'.$this->ui_options['login'].'">'."\n";			
			
			
			$output .= '
				<div class="clearfix">	
		<div id="header">
			<div class="inside clearfix">			
				<div id="logo"> 
							
					<h1 class="logo"><a href="/"><img src="/images/logo.png" alt="Veckans meny" /></a></h1> 
				
				</div>		
				<div id="mainNav">
					<div class="menu-main-menu-container"><ul id="menu-main-menu" class="sf-menu"><li id="menu-item-126" class="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-126"><a href="/">Hem</a></li> 
	<li id="menu-item-102" class="menu-item menu-item-type-taxonomy menu-item-object-portfolio menu-item-102"><a href="/recept/">Recept</a></li> 
	<li id="menu-item-127" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-127"><a href="/veckans-meny/">Veckans meny</a></li> 
	<li id="menu-item-89" class="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-89"><a href="/teman7">Teman</a></li> 
	<li id="menu-item-88" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-88"><a href="/om-oss/">Om oss</a></li> 
	<li id="menu-item-87" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-87"><a href="#">Meny</a></li> 
	</ul>
					</div>			
				</div>	
			</div>		
		</div> 
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
		
		public function sidebar()
		{
			return '
			
			<div id="sidebar"> 
			<div id="ttrust_recent_posts-3" class="oneHalf oneFourth ttrust_recent_posts sidebarBox widgetBox">
				<h3>Recent Posts</h3>		
							
				<div class="firstPost">					
					<h2><a href="http://themetrust.com/demos/craft/?p=71" title="Massa Viverra Sollicitudin Donec">Massa Viverra Sollicitudin Donec </a></h2> 
					<span class="meta">February 3, 2011 </span> 
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...</p> 
					
				</div> 
														
				<div class="secondaryPost">					
					<h2><a href="http://themetrust.com/demos/craft/?p=69" title="Sed Euscelerisque Dui Massa Quisque">Sed Euscelerisque Dui Massa Quisque </a></h2> 
					<span class="meta">February 3, 2011 </span> 
				</div> 
				
													
				<div class="secondaryPost">					
					<h2><a href="http://themetrust.com/demos/craft/?p=67" title="Vivamus Lacus Ibero Ultrices">Vivamus Lacus Ibero Ultrices </a></h2> 
					<span class="meta">February 3, 2011 </span> 
				</div> 
				
													
				<div class="secondaryPost">					
					<h2><a href="http://themetrust.com/demos/craft/?p=64" title="Quisque Porta Varius Dui">Quisque Porta Varius Dui </a></h2> 
					<span class="meta">February 3, 2011 </span> 
				</div> 
				
													
			</div>						
		    
		</div><!-- end sidebar -->
		
		';
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
				
			<div id="ttrust_flickr-3" class="oneFourth widget_ttrust_flickr footerBox widgetBox">				
				
				<h3>Flickr Feed</h3>				
    			<div id="flickrBox" class="clearfix">
    			
    			</div> 
  
			</div>
				
			<div id="ttrust_twitter-3" class="oneFourth widget_ttrust_twitter footerBox widgetBox">
				<h3>Latest Tweets</h3>								
			<div id="twitterBox" class="clearfix"></div> 
 
   				<p class="twitterLink"><a class="action" href="http://twitter.com/"><span>Twitter</span></a></p> 
                 
			</div>
			<div id="text-3" class="oneFourth widget_text footerBox widgetBox">

				<h3>About Craft</h3>
				<div class="textwidget"><p>Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin ultrices non ullamcorper tempus.</p> 
<p><a href="http://themetrust.com/demos/craft/?page_id=41" target="_parent" class="button ">Learn More</a></p> 
				</div> 

			</div>
			
			<div id="text-4" class="oneFourth widget_text footerBox widgetBox">			<div class="textwidget"><img src="/images/footer_logo.png" alt="Veckans meny" /> 
 
</div> 
		</div>	
						
		</div><!-- end footer main -->
		
		<div class="secondary clearfix">
									<div class="left">&copy; 2011 <a href="http://www.veckansmeny.dev"><strong>Veckans meny</strong></a></div>
			<div class="right">&lt;3</div>
		</div><!-- end footer secondary-->		
				
	</div><!-- end footer -->	
</div><!-- end container -->
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