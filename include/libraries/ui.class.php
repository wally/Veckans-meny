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
			array_unshift($this->ui_options['javascripts'], 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js', '/javascript/main.js', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/jquery.jcarousel.min.js?ver=0.2.7', 'http://users.tpg.com.au/j_birch/plugins/superfish/js/superfish.js', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/superfish/supersubs.js?ver=1.4.8', 'http://themetrust.com/demos/craft/wp-content/themes/craft/scripts/slideshow/jquery.nivo.slider.pack.js?ver=2.4');
			$this->ui_options['javascripts'] = array_unique($this->ui_options['javascripts']);
			
			//stylesheets
			$this->ui_options['stylesheets'] = isset($this->ui_options['stylesheets']) ? $this->ui_options['stylesheets'] : array();
			array_unshift($this->ui_options['stylesheets'], '/css/style.css', '/css/superfish.css', '/css/nivo-slider.css', '/css/custom-nivo-slider.css');
	

			$output .= '
			
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="se-sv">  
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
	<title>'. $this->ui_options['title'] .'</title>
	
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Serif:regular,italic,bold,bolditalic" />
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold" /> 
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
			
			if($this->ui_options['menu']['name'] == 'start')
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
						<ul id="menu-main-menu" class="sf-menu">
							<li class="menu-item current-menu-item"><a href="/">Hem</a></li> 
							<li class="menu-item"><a href="/veckans-meny/">Veckans meny</a></li> 
							<li class="menu-item"><a href="/recept/">Recept</a></li> 
							<li class="menu-item"><a href="/teman7">Teman</a></li> 
							<li class="menu-item"><a href="/om-oss/">Om oss</a></li>  
						</ul>
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
		
		public function sidebar()
		{
			$this->sidebar['title'] = 'Andra recept';
			$this->sidebar['numSummary'] = 1;
			$this->sidebar['maxItems'] = 6;
			
			$this->sidebar['items'][] = array('url'=>'/recept/2/', 'text'=>'Hejsan', 'meta'=>'3 apr, 2011', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');
			
			$this->sidebar['items'][] = array('url'=>'/recept/3/', 'text'=>'En till item', 'summary'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis ...');

			$output = '';
			$output .= '
			
			</div><!-- /content -->
			
			<div id="sidebar" class="oneFourth"> 
			<div id="ttrust_recent_posts-3" class="oneHalf oneFourth ttrust_recent_posts sidebarBox widgetBox">';
			
			$output .= '<h3>'.$this->sidebar['title'].'</h3>'."\n";

			if(count($this->sidebar['items']) > 0)
			{
				foreach($this->sidebar['items'] as $i=>$item)
				{
					if($i >= $this->sidebar['maxItems'])
					{
						break;
					}
					
					$class = ($i == 0 ? 'firstPost' : 'secondaryPost');
					
					if(!isset($item['summary']))
					{
						$item['summary'] = '';
					}
					
					if(!isset($item['meta']))
					{
						$item['meta'] = strftime('%e %b, %Y');
					}
					
					$output .= '
				<div class="'.$class.'">
					<h2><a href="'.$item['url'].'" title="'.$item['text'].'">'.$item['text'].'</a></h2> 
					<span class="meta">'.$item['meta'].'</span>';

					if(!empty($item['summary']) && ($i-$this->sidebar['numSummary'] < 0))
					{
						$output .= '<p>'.$item['summary'].'</p>'."\n";
					}
					
					$output .= '</div>'."\n";
														
				}
			}
			
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
				
				<h3>Flickr Feed</h3>				
    			<div id="flickrBox" class="clearfix">
    			
    			</div> 
  
			</div>
				
			<div id="ttrust_twitter-3" class="oneFourth widget_ttrust_twitter footerBox widgetBox">
				<h3>Latest Tweets</h3>								
			<div id="twitterBox" class="clearfix"></div> 
 
   				<p class="twitterLink"><a class="action" href="http://twitter.com/"><span>Twitter</span></a></p> 
                 
			</div>
			<div id="text-3" class="oneFourth footerBox widgetBox">

				<h3>About Craft</h3>
				<div class="textwidget"><p>Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin ultrices non ullamcorper tempus.</p> 
<p><a href="http://themetrust.com/demos/craft/?page_id=41" target="_parent" class="button ">Learn More</a></p> 
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