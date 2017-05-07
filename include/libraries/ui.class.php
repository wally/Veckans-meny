<?php
	// TODO Add meta-tags to head
	// TODO Add favicons
	// TODO Add unsupported broswer info
	// TODO Add cookie info
	
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
			//$this->ui_options['javascripts'] = array('/javascript/jquery-1.6.2.min.js', '/javascript/date.js', '/javascript/date_se.js', '/javascript/jquery.datePicker.js', '/javascript/jquery.bxSlider.min.js', '/javascript/jquery.fancybox-1.3.4.pack.js', '/javascript/jquery.placeholder.min.js', '/javascript/main.js');
			$this->ui_options['javascripts'] = array_unique($this->ui_options['javascripts']);
			
			//stylesheets
			$this->ui_options['stylesheets'] = isset($this->ui_options['stylesheets']) ? $this->ui_options['stylesheets'] : array();
			array_unshift( $this->ui_options['stylesheets'], '/css/RootBase-ec56314269.css', '/css/RootBase2-15ca3321ab.css', '/css/IcaBase-531cbe54fd.css', array('href' => '/css/rwdprint_8DF1DEF266B46D9738FE666FE39A4974.css', 'media' => 'print' ) );
			$output .= '
			
<!DOCTYPE html>
<html lang="sv" class="js not-ie has-mouse geoposition is-desktop history localstorage sessionstorage hashchange canvas canvastext multiplebgs supports textshadow cssanimations csstransforms3d csstransitions history localstorage sessionstorage hashchange canvas canvastext multiplebgs csspositionsticky supports textshadow cssanimations csstransforms3d csstransitions overthrow-enabled no-mobile-device no-touch-device has-hover document-loaded">
<head> 
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="HandheldFriendly" content="True">
	<meta name="MobileOptimized" content="320">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=yes">

	<title>'. $this->ui_options['title'] .'</title>
';
		
			if(count($this->ui_options['stylesheets']) > 0)
			{
				foreach($this->ui_options['stylesheets'] as $stylesheet)
				{
					$output .= "\t"."\t".'<link rel="stylesheet" type="text/css" '.(is_array($stylesheet) ? (isset($stylesheet['media']) ? 'media="'.$stylesheet['media'].'" ' : '') : '').'href="'.(is_array($stylesheet) ? $stylesheet['href'] : $stylesheet).'" />'."\n";
		
				}
			}
	
			$output .= $this->ui_options['header_extra'];

			$output .= '</head>'."\n";

			$output .= ( isset( $this->ui_options['body_extra'] ) ? "\t".'<body ' . $this->ui_options['body_extra']  . "\n" : "\t".'<body' ). '>'."\n";
			
			$output .= '
	<div id="dashboard" class="dashboard">
        <div class="toolbars-wrapper">
            <div class="toolbars">
                <nav class="toolbar user">
                    <ul class="menu">
                        <li class="log-in"><a href="https://www.ica.se/logga-in/?returnurl=https%253a%252f%252fwww.ica.se%252frecept%252fdhal-indisk-linsgryta-614423%252f" data-loginurl="https://www.ica.se/logga-in/" data-islocal="False" class="login-v2 dash-icon sprite1-p">Logga in</a></li>

                        <li class="myica"><span href="javascript:void(0);" class="myica-icon dash-icon sprite1-p">Mitt ICA</span></li>

                        <li class="close"><a href="javascript:;" class="close-icon sprite2-p">Stäng</a></li>
                    </ul>
                </nav>

                <nav class="toolbar tools">
                    <ul class="menu main">
                        <li class="toggler"><span class="icon menu-toggle">&nbsp;</span></li>

                        <li class="toolbtn shoppinglist "><a href="#:mittica=inkopslistor">Inköpslistor</a></li>

                        <li class="toolbtn myrecipes"><a href="#:mittica=recept">Recept</a></li>

                        <li class="toolbtn weekplanner"><a href="#:mittica=veckoplaner">Veckoplaner</a></li>

                        <li class="toolbtn grocerybag"><a href="#:mittica=matkassen">Matkassen</a></li>
                    </ul>
                </nav>
            </div>
        </div>

        <div id="inkopslistor" class="tool shoppinglist" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardShoppinglists" data-maxwidth-class="600 smallscreen" data-tool-name="shoppinglist"></div>

        <div id="recept" class="tool myrecipes" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardFavoriteRecipes" data-tool-name="myrecipes"></div>

        <div id="veckoplaner" class="tool weekplanner" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardWeekplan" data-tool-name="weekplanner"></div>

        <div id="matkassen" class="tool grocerybag" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardGroceryBag" data-tool-name="grocerybag"></div>

        <div id="kontosaldo" class="tool account-balance" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardAccountInfo" data-tool-name="account-balance"></div>

        <div id="bonus" class="tool bonus" data-url="/templates/ajaxresponse.aspx?ajaxFunction=DashboardBonus" data-tool-name="bonus"></div>
    </div>
    
		';
		
			$output .= $this->generateMenu();
		
			$output .= '
		<div id="page-wrapper" class="icase icaseMasterPage" data-masterpage-type="icase">
            <div id="page" class="page ">
                <div id="content" role="main">
                    <div class="grid middle sameheight mobile-tablet-small-hidden">
                        <div class="twothirds" data-desktopclass="">
                            <fieldset role="search" data-url="/receptsok/" class="search search-recipes search-fieldset" data-datalayer-searchtype="recipe">
                                <label class="hidden" style="display:none;" for="search2">Sök recept</label> <input class="has-placeholder" type="search" id="search2" name="search-recipes" placeholder="Sök recept"> <button type="submit" id="search-button">Sök</button>

                                <div class="search-tags"></div>
                            </fieldset>
                        </div>

                        <div class="socialrecept">

                            <div class="sharrreSocialSharing">
                                <div class="onefourth">
                                    <div class="social ">
                                        <ul class="inline separated">
                                            <li class="pl">
                                                <div class="socialsharing">
                                                    <div class="sharing-text">
                                                        <p class="handwriting sprite2-p arrow-after arrow-right">Dela med dig här</p>
                                                    </div><a class="sharrre-facebook socialsharing__box" data-url="http://www.ica.se/recept/dhal-indisk-linsgryta-614423/" data-text="" title="Facebook"></a> <a class="sharrre-twitter socialsharing__box" data-url="http://www.ica.se/recept/dhal-indisk-linsgryta-614423/" data-text="" title="Twitter"></a> <a class="sharrre-pinterest socialsharing__box" data-url="http://www.ica.se/recept/dhal-indisk-linsgryta-614423/" data-text="" title="Pinterest"></a> <a class="sharrre-googleplus socialsharing__box" data-url="http://www.ica.se/recept/dhal-indisk-linsgryta-614423/" data-text="" title="GooglePlus"></a>

                                                    <div id="sharrre-email" class="sharrre" data-url="http://www.ica.se/recept/dhal-indisk-linsgryta-614423/" data-text="">
                                                        <a href="/templates/ajaxresponse.aspx?ajaxFunction=EmailDialog&amp;type=recipe" role="button" data-ajaxsrc="/templates/ajaxresponse.aspx?ajaxFunction=EmailDialog&amp;type=recipe" class="mail-article  modal dialog"></a>

                                                        <div class="sprite1 icon-email"></div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="tablet-removed">' . "\n";				
			
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
			$output = '<nav class="globalnav clearfix" id="globalnav">
            <section class="nav-main gradient">
                <ul class="nav clearfix">
                    <li class="item myica no-collapse right"><a href="javascript:void(0);" class="myica-icon dash-icon sprite1-p">Mitt ICA</a></li>

                    <li class="item login no-collapse right"><a href="https://www.ica.se/logga-in/?returnurl=https%253a%252f%252fwww.ica.se%252frecept%252fdhal-indisk-linsgryta-614423%252f" data-loginurl="https://www.ica.se/logga-in/" data-islocal="False" class="login-v2 login-link">Logga in</a></li>

                    <li class="item search no-collapse right">
                        <a class="mobile-search-close-button">Avbryt</a>

                        <fieldset id="forAutocomplete" role="search" class="search search-fieldset sprite1-p" data-url="/sok/" data-datalayer-searchtype="global">
                            <input type="search" name="search" id="quickSearchInput" class="nav-search typeahead sprite1" placeholder="Sök"> <button type="submit">Sök</button>
                        </fieldset><a href="javascript:void(0);" class="search-icon sprite1-p"></a>
                    </li>

                    <li class="item logo "><a href="/" class="base-link"></a></li>

                    <li class="item active"><a href="/recept/">Recept</a></li>

                    <li class="item "><a href="/handla-online/">Handla</a></li>

                    <li class="item "><a href="/halsa/">Hälsa</a></li>

                    <li class="item "><a href="/buffe/">Buffé</a></li>

                    <li class="item no-collapse hidden show-collapsed"><a href="javascript:void(0);">Mer&#8230;</a></li>
                </ul><!-- Copy of main nav for collapsed view -->

                <div class="nav-collapsed">
                    <ul class="nav">
                        <li class="item "><a href="/">Start</a></li>

                        <li class="item active"><a href="/recept/">Recept</a></li>

                        <li class="item "><a href="/handla-online/">Handla</a></li>

                        <li class="item "><a href="/halsa/">Hälsa</a></li>

                        <li class="item "><a href="/buffe/">Buffé</a></li>
                    </ul>
                </div>
            </section>

            <section class="nav-sub overthrow overflowScroll">
                <ul class="nav">
                    <li class="item"><a href="/recept/ingrediens/">Ingrediens</a></li>

                    <li class="item"><a href="/recept/specialkost/">Specialkost</a></li>

                    <li class="item"><a href="/recept/maltid/">Måltid</a></li>

                    <li class="item"><a href="/recept/tillfalle/">Tillfälle</a></li>

                    <li class="item"><a href="/recept/varldens-kok/">Världens kök</a></li>

                    <li class="item"><a href="/recept/tillagningssatt/">Tillagningssätt</a></li>

                    <li class="item"><a href="/recept/typ-av-recept/">Typ av recept</a></li>
                </ul>
            </section>

            <section class="nav-third overthrow overflowScroll"></section>
        </nav>';
			
			/* OLD MENU * /
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
			/**/
			
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
				//$output .= self::sidebar();
			}
			
			$output .= '
                </div>
            </div>
        </div><!--googleoff: index--><!--googleoff: snippet-->

        <footer id="footer" role="contentinfo" class="pl footer">
            <nav class="footer-nav">
                <div class="container">
                    <div class="row">
                        <div class="col-12 bread-crumbs-wrapper">
                            <!--googleoff: snippet-->

                            <div class="bread-crumbs">
                                <ol>
                                    <li class=""><a href="/" rel="prev" class="logo-wrapper">Hem </a></li>

                                    <li class="current"><a href="">Receptsida</a></li>
                                </ol>
                            </div><!--googleon: snippet-->
                        </div>
                    </div>

                    <div class="row footer-link-list">
                        <section class="col-12 col-md-6 col-lg-3 col-xl-3">
                            <header>
                                <h3 class="title">Huvudmeny</h3>
                            </header>

                            <ul class="link-list">
                                <li><a href="/kundtjanst/" class="block-link">Kundservice</a></li>

                                <li><a href="/ica-kort/" class="block-link">ICA-kort</a></li>

                                <li><a href="/erbjudanden/" class="block-link">Erbjudanden</a></li>

                                <li><a href="/icas-egna-varor/" class="block-link">Varor</a></li>

                                <li><a href="/bank-forsakring/" class="block-link">Bank & försäkring</a></li>

                                <li><a href="/appar/" class="block-link">Appar</a></li>

                                <li><a href="/ica-tar-ansvar/" class="block-link">ICA tar ansvar</a></li>
                            </ul>
                        </section>

                        <section class="col-12 col-md-6 col-lg-3 col-xl-3">
                            <header>
                                <h3 class="title">Om ICA Gruppen</h3>
                            </header>

                            <ul class="link-list">
                                <li><a href="http://www.icagruppen.se/om-ica-gruppen/#!/" class="block-link" target="_blank">Detta är ICA</a></li>

                                <li><a href="http://www.icagruppen.se/investerare/#!/" class="block-link" target="_blank">Finansiell information</a></li>

                                <li><a href="http://www.icagruppen.se/media/#!/" class="block-link" target="_blank">Pressinformation</a></li>

                                <li><a href="http://www.icagruppen.se/karriar/#!/" class="block-link" target="_blank">Jobba på ICA</a></li>

                                <li><a href="http://www.icagruppen.se/en/about-ica-gruppen/#!/" class="block-link" target="_blank">About ICA Gruppen</a></li>

                                <li><a href="http://www.icagruppen.se/kontakt/#!/" class="block-link" target="_blank">Kontakt</a></li>
                            </ul>
                        </section>

                        <section class="col-12 col-md-6 col-lg-3 col-xl-3">
                            <header>
                                <h3 class="title">Genvägar</h3>
                            </header>

                            <ul class="link-list">
                                <li><a href="/ica-kort/ica-student/" class="block-link">ICA Student</a></li>

                                <li><a href="/butiker/service-i-butiker/" class="block-link">Service i butiker</a></li>

                                <li><a href="/handla-online/ica-hemma/" class="block-link">ICA Hemma</a></li>

                                <li><a href="/other-languages/" class="block-link">Other languages</a></li>
                            </ul>
                        </section>

                        <section class="col-12 col-md-6 col-lg-3 col-xl-3">
                            <header>
                                <h3 class="title">Kundservice</h3>
                            </header>

                            <ul class="link-list">
                                <li><a href="/kundtjanst/" class="block-link">Kundservice</a></li>

                                <li><a href="/kundtjanst/vanliga-fragor-eller-reklamera/" class="block-link">Vanliga frågor eller reklamera</a></li>

                                <li><a href="/ica-kort/sparra-och-bestall-nytt-kort/" class="block-link">Beställ eller spärra kort</a></li>
                            </ul>
                        </section>

                        <section class="col-12 col-md-6 col-lg-3 col-xl-3">
                            <header>
                                <h3 class="title">Om webbplatsen</h3>
                            </header>

                            <ul class="link-list">
                                <li><a href="/policies/cookies/" class="block-link">Cookies</a></li>

                                <li><a href="/policies/personuppgiftslagen/" class="block-link">Så skyddar vi dina personuppgifter</a></li>
                            </ul>
                        </section>
                    </div>
                </div>
            </nav>

            <div class="footer-sub-nav">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-8 col-lg-6 contact-column ">
                            <div class="contact-info">
                                <!-- <span class="icon-ica-logo"></span> -->

                                <div class="address">
                                    <p><span class="fn org">ICA Sverige AB,</span> <span class="adr"><span class="postal-code">171 93&nbsp;</span> <span class="locality">Solna</span></span></p>

                                    <p><a href="tel:08-561 500 00"><strong class="tel">08-561 500 00</strong></a></p>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-3 social-column">
                            <ul class="social-icons">
                                <li><a href="http://www.facebook.com/ICA" alt="Facebook"></a></li>

                                <li><a href="http://www.youtube.com/ica" alt="youtube icon"></a></li><!-- 
                      -->

                                <li><a href="http://www.ica.se/smarta-mattjanster/icas-appar/" alt="apps icon"></a></li>
                            </ul>
                        </div>

                        <div class="col-12 col-sm-3 col-lg-3 col-xl-3 totop-column">
                            <a href="#globalnav" class="totop scrollto">Till toppen</a>
                        </div>

                        <div class="col-12 bottom-row-footer"></div>
                    </div><!-- <div class="col-12 totop-bottom-row md_gte_hidden">
            <a href="#globalnav" class="totop scrollto">Gå till toppen av sidan<span class="sprite2 icon icon-totop"></span></a>
        </div> -->
                </div>
            </div>

            <div style="display: none">
                ver: 2017.4.528
            </div>
        </footer><!--googleon: index--><!--googleon: snippet-->

        <div id="bottom-bar" class="bottom-alerts"></div>
</body>
</html>
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