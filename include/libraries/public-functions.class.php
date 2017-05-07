<?php

	class PublicFunctions
	{
		//set how many items per page in the pagination
		public $viewLimit = 15;
		public $db;
		
		public function __construct()
		{
			$this->db = new DB();
		}
	
		public function cleanChosenRecipies($recipies = '')
		{
			if($recipies == '')
			{
				return 0;
			}
			
			$recipies = explode(',', $recipies);
			
			$recipiesArray = array();
			
			if(count($recipies) > 0)
			{
				foreach($recipies as $recipie)
				{
					if(intval($recipie) > 0)
					{
						$recipiesArray[] = intval($recipie);
					}
				}
			}
			
			return implode(',', $recipiesArray);
		}
		
		/**
		 * http://www.php.net/manual/en/function.wordwrap.php#74146
		 * function wordCut($sText, $iMaxLength, $sMessage)
		 * 
		 * + cuts an wordt after $iMaxLength characters
		 * 
		 * @param  string   $sText       the text to cut
		 * @param  integer  $iMaxLength  the text's maximum length
		 * @param  string   $sMessage    piece of text which is added to the cut text, e.g. '...read more' 
		 * 
		 * @returns string
		**/  
		public function wordCut($sText, $iMaxLength, $sMessage='...')
		{
		   if (strlen($sText) > $iMaxLength)
		   {
		       $sString = wordwrap($sText, ($iMaxLength-strlen($sMessage)), '[cut]', 1);
		       $asExplodedString = explode('[cut]', $sString);
		       
		       $sCutText = $asExplodedString[0];
		       
		       $sReturn = $sCutText.$sMessage;
		   }
		   else
		   {
		       $sReturn = $sText;
		   }
		   
		   return $sReturn;
		}
		
		public function displayPagination($page = 0, $offset = 0, $total=1, $options = array())
		{
			if($page < 0 || $offset < 0 || $total < 1)
			{
				$top = 
'<div class="clearfix pagenavi light paginationTop">
	<div class="left"><span class="inactive" href="#">«</span> <span class="current">1</span> <span class="inactive" href="#">»</span></div>
</div>';
				$bottom = 
'<div class="clearfix pagenavi light paginationBottom">
	<div class="left"><span class="inactive" href="#">«</span> <span class="current">1</span> <span class="inactive" href="#">»</span></div>
</div>';		

				return array('top'=>$top, 'bottom'=>$bottom);
			}
			
			$this->page = abs($page);
			$this->items_per_page = $this->viewLimit;
			$this->items_total = $total;
			$options['baseHref'] = isset($options['baseHref']) ? $options['baseHref'] : '';
			return $this->paginate($options);
		}
		
		function paginate($options = array())
	    {
	    	$this->ipp = $this->default_ipp = $this->viewLimit;
	    	$this->sortBy = isset($_GET['sortBy']) && array_key_exists(strtolower($_GET['sortBy']), $this->allowedsortBy) ? strtolower($_GET['sortBy']) : 'added';
	    	$this->order = isset($_GET['order']) && in_array(strtoupper($_GET['order']), array('ASC', 'DESC')) ? strtoupper($_GET['order']) : 'DESC';

	        
	        $this->query_string_parts = array();
	        $this->query_string = '';
	        
	        if(count($_GET) > 0)
	        {
	        	foreach($_GET as $key=>$value)
	        	{
	        		if($key != 'page')
	        		{
	        			$this->query_string_parts[] = $key.'='.$value;
	        		}
	        	}
	        }
			
			if(count($this->query_string_parts) > 0)
			{
				$this->query_string = '?'.implode('&', $this->query_string_parts);
			}    	
	        if(!is_numeric($this->items_per_page) || $this->items_per_page <= 0)
	        {
	        	$this->items_per_page = $this->default_ipp;  
			}
	        
	        $this->return = 'Sidor: ';
	        
	        $this->num_pages = ceil($this->items_total/$this->items_per_page);  
	        $this->mid_range = 2;
	        $this->current_page = $this->page; // must be numeric > 0
	        if($this->current_page < 1 Or !is_numeric($this->current_page)) $this->current_page = 1;  
	        if($this->current_page > $this->num_pages) $this->current_page = $this->num_pages;  
	        $prev_page = $this->current_page-1;  
	        $next_page = $this->current_page+1;

        	$this->return = ($this->current_page != 1 And $this->items_total >= 10) ? "<a class=\"paginate\" href=\"".$options['baseHref']."$prev_page/$this->query_string\">«</a> ":"<span class=\"inactive\" href=\"#\">«</span> ";
        	
	        if($this->num_pages > 10)  
	        {
	            $this->start_range = $this->current_page - floor($this->mid_range/2);  
	            $this->end_range = $this->current_page + floor($this->mid_range/2);  
	  
	            if($this->start_range <= 0)  
	            {  
	                $this->end_range += abs($this->start_range)+1;  
	                $this->start_range = 1;  
	            }  
	            if($this->end_range > $this->num_pages)  
	            {  
	                $this->start_range -= $this->end_range-$this->num_pages;  
	                $this->end_range = $this->num_pages;  
	            }  
	            $this->range = range($this->start_range,$this->end_range);  
	  
	            for($i=1;$i<=$this->num_pages;$i++)  
	            {  
	                if($this->range[0] > 2 And $i == $this->range[0]) $this->return .= "<span style='background:none;'> ... </span>";  
	                // loop through all pages. if first, last, or in range, display  
	                if($i==1 Or $i==$this->num_pages Or in_array($i,$this->range))  
	                {  
	                    $this->return .= ($i == $this->current_page) ? "<a title=\"Gå till sida $i av $this->num_pages\" class=\"current\" href=\"#\">$i</a> ":"<a class=\"paginate\" title=\"Gå till sida $i av $this->num_pages\" href=\"".$options['baseHref']."$i/$this->query_string\">$i</a> ";  
	                }  
	                if($this->range[$this->mid_range-1] < $this->num_pages-1 And $i == $this->range[$this->mid_range-1]) $this->return .= "<span style='background:none;'> ... </span>";  
	            }
	        }  
	        else  
	        {
	            for($i=1;$i<=$this->num_pages;$i++)  
	            {  
	                $this->return .= ($i == $this->current_page) ? "<span class=\"current\">$i</span> ":"<a class=\"paginate\" href=\"".$options['baseHref']."$i/".$this->query_string."\">$i</a> ";  
	            }
	        }
			
			$this->return .= (($this->current_page != $this->num_pages And $this->items_total >= 10)) ? "<a class=\"paginate\" href=\"".$options['baseHref']."$next_page/$this->query_string\">»</a>\n":"<span class=\"inactive\" href=\"#\">»</span>\n";
	        $this->low = ($this->current_page-1) * $this->items_per_page;  
	        $this->high = ($this->page == -1) ? $this->items_total:($this->current_page * $this->items_per_page)-1;  
	        $this->limit = ($this->page == -1) ? "":" LIMIT $this->low,$this->items_per_page";
	        
	        $classTop = 'paginationTop';
	        $classBottom = 'paginationBottom';

	        $output = '<div class="clearfix pagenavi light ';
	        
	        $return['top'] = $output . $classTop;
	        $return['bottom'] = $output . $classBottom;
	        
	        
	        $output = '"><div class="left">'.$this->return.'</div>';
	        $output .= $this->display_sortBy_menu($options);
	        $output .= '</div>';
	        
	        $return['top'] .= $output;
	        $return['bottom'] .= $output;
	        
	        return $return;
	    }  
    
		public function display_sortBy_menu( $options = array() )
		{
			$output = '';
			$output .= '<div class="right">'."\n";
				
				if(isset($options['button']))
				{
					$output .= '<a href="'.$options['button']['href'].'" class="button">'.$options['button']['title'].'</a>'."\n";
				}
				
				if(isset($this->allowedsortBy))
				{			
					$output .= '<button class="sortingOptions-button button gray">+</button>'."\n";
					$output .= '<div class="sortingOptions-container hide">'."\n";

						$output .= '<form method="get" action="'.$options['baseHref'].($this->current_page > 1 ? $this->current_page.'/' : '' ).'" id="recipie-sortBy">'."\n";
							$output .= '<select name="sortBy">'."\n";
								
								foreach($this->allowedsortBy as $value=>$text)
								{
									$output .= '<option value="'.$value.'"';
									
									if($this->sortBy == $value)
									{
										$output .= ' selected="selected"';
									}
									$output .= '>';
									
									$output .= $text.'</option>'."\n";
								}
							$output .= '</select>'."\n";
							$output .= '<select name="order">'."\n";
								
								foreach(array('asc'=>'Stigande (A-Ö)', 'desc'=>'Fallande (Ö-A)') as $value=>$text)
								{
									$output .= '<option value="'.$value.'"';
									
									if(strtolower($this->order) == $value)
									{
										$output .= ' selected="selected"';
									}
									$output .= '>';
									
									$output .= $text.'</option>'."\n";
								}
							$output .= '</select>'."\n";
	
							$output .= '<input type="submit" value="Ok" class="gray" />'."\n";
						$output .= '</form>'."\n";
					$output .= '</div>'."\n";
				}
			$output .= '</div>'."\n";
			
			return $output;
		}
		
		public function checkLogin($redirect = true)
		{

			$isLoggedIn = false;

			if( !isset($_SESSION['isLoggedIn']) )
			{
				$isLoggedIn = false;
				$_SESSION['isLoggedIn'] = 0;
			}
			else if( $_SESSION['isLoggedIn'] == 0 )
			{
				$isLoggedIn = 0;
			}
			else
			{
				$isLoggedIn = 1;
			}

			if( $isLoggedIn == 0 && $redirect && !in_array($_SERVER['SCRIPT_NAME'], array('/index.php', '/login.php', '/createAccount.php') ) )
			{
				header('Location: /');
				exit;
			}
			else
			{
				return $isLoggedIn;
			}
		}

		public function createFormToken($form)
		{
			return PublicFunctions::checksum_field($form.session_id());
		}
		
		public function is_date( $str, $delimiter = '-' ) 
		{
			$str = trim($str);
			
			if(strlen($str) != 10)
			{
				return false;
			}
			
			$stamp = strtotime( $str ); //ok for first defense
			
			if ( !is_numeric( $stamp ) ) 
			{
				return false; 
			}
			
			$dateParts = explode( $delimiter, $str );
			$year = $dateParts[0];
			$month = $dateParts[1];
			$day = $dateParts[2];
					  
			if (checkdate( $month, $day, $year )) 
			{
				return true; 
			}
			
			return false; 
		}
		
		public function cleanFields($fields, $allowedFields = array())
		{			
			$fields = preg_replace('/([^a-zA-Z0-9\_\-\,*])/', '', $fields);
			$fields = explode(',', $fields);
			
			$validFields = array();
			foreach($fields as $field)
			{
				if(!empty($field))
				{
					if( in_array($field, $allowedFields))
					{
						$validFields[] = $field;
					}
				}
			}
			return $validFields;
		}
		
		public function bbcode($text = '')
		{
			$text = trim($text);
			$text = nl2br($text);
			
			return $text;
		}
		
		public function displaySuccessMessage($text = '')
		{
			return '<div class="success">'.$text.'</div>';
		}


		public function preint_r($data, $return = false)
		{
			$return = (bool) $return;

			$output = '<pre>'."\n";
			$output .= print_r($data, true);
			$output .= '</pre>'."\n";

			if(!$return)
			{
				echo $output;
			}
			else
			{
				return $output;
			}
		}
		
		function encrypt_pass($user, $pass, $privateSalt = '', $method = 'sha1'){
			
			$pass = utf8_decode($pass);
			$user = utf8_decode($user);
			
			//static salt
			$salt_stat = '';
			$salt_stat .= 'amsterDam2011';
			foreach (range('a', 'i') as $letter)
			$salt_stat .= $letter;
		
			$salt_stat .= strtoupper($salt_stat);
		
			foreach(range(0, 292) as $number)
			$salt_stat .= $number;

			$salt_stat .= $privateSalt;
			
			$salt_stat .= '!")#()!="LJLSJKljadsdj!)n2Bv3C!"/(3901pPPasn())=^^+?9`12hhusuad877/!^ssa8~sda822LL!2n"-#(32.L!2389-.Sa8812';

			
			//dynamic salt
			$salt_dyn = strtolower($pass).strtolower($user);
			$salt_dyn .= strtoupper($user.$salt_dyn).strtoupper($pass);
			$salt_dyn .= substr($pass.$salt_dyn, round(ord($pass)/2));
			$salt_dyn .= $privateSalt;
			$salt_dyn .= sha1($salt_dyn);
			
			$new_pass = '';
			
			if($method == 'sha1')
			$new_pass = sha1($salt_stat.$pass.$salt_dyn.$user);
			else
			$new_pass = md5($salt_stat.$pass.$salt_dyn.$user);
		
			return $new_pass;
		}
		
		
		function protect($array)
		{
			global $mysqli;
			
			foreach($array AS $key => $value)
		    {
		            if(is_array($value))
					{
						$array[$key] = protect($value);
					}else{
						$array[$key] = $mysqli->real_escape_string(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
		    		}
			}
			return $array;
		}
		
		function is_privilegied($privilegie, $item_id = 'ANY')
		{
			if(isset($_SESSION['privilegies']['igotgodmode'][0]))
			{
				return true;
			}
		    
			return ($item_id == 'ANY') ? isset($_SESSION['privilegies'][$privilegie]) : (isset($_SESSION['privilegies'][$privilegie][$item_id]) || isset($_SESSION['privilegies'][$privilegie][0]));
		  }
	  
	  	function fix_time($timestamp, $day_relative = true, $short_day = false)
		{
			if($short_day == 'true')
			{
				$days = array('Sön', 'Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör');
			}
			else
			{
				$days = array('Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag');
			}
			
			if(date('Y-m-d') == date("Y-m-d",$timestamp) && $day_relative == true)
			{
				return 'Idag ' . date('H:i', $timestamp);
			}
			elseif(date('Y-m-d', time()-86400) == date('Y-m-d',$timestamp) && $day_relative == true)
			{
				return 'Igår ' . date('H:i',$timestamp);
			}
			elseif($timestamp > time() - 86400*5)
			{
				return 'I ' . strtolower($days[date('w', $timestamp)]) . 's ' . date('H:i', $timestamp);
			}
			elseif(date('Y', $timestamp) == date('Y'))
			{
				return $days[date('w', $timestamp)] . ' ' . date('j/n H:i',$timestamp);
			}
			else
			{
				return date('Y-m-d H:i', $timestamp);
			}
		}
	
		
		function url_secure_string($label)
		{
			$label = trim($label);
			$label = htmlspecialchars_decode($label);
			$replace =     array(' ', 'Å',  'å',  'Ä',  'ä',  'Ö',  'ö',  'È', 'è', 'É', 'é');
			$replacement = array('-', 'aa', 'aa', 'ae', 'ae', 'oe', 'oe', 'e', 'e', 'e', 'e');
			$label = str_replace($replace, $replacement, $label);
			
			$label = mb_strtolower($label);
	
			$label = preg_replace('/([^a-z0-9\-]+)/', '', $label);
	
			$label = preg_replace('/-{2,}/', '-', $label);
			$label = rtrim($label, '-');
		
			return $label;
		}
	
		function make_webbable($title, $id=null)
		{
			$handle_original = url_secure_string($title);
			
			if(is_numeric($id))
			{
				$handle = $id.'/'.$handle_original;
			}
			else
			{
				$handle = $handle_original;
			}
			
			return $handle;
		}
		
		function make_webbable_easy($label)
		{
			$label = trim($label);
	
			$replace =     array(' ', 'Å',  'å',  'Ä',  'ä',  'Ö',  'ö', 'È', 'è', 'É', 'é', 'À', 'à', 'Á', 'á', 'Â', 'â');
			$replacement = array('-', 'a',  'a',  'a',  'a',  'o',  'o', 'e', 'e', 'e', 'e', 'a', 'a', 'a', 'a', 'a', 'a');
			$label = str_replace($replace, $replacement, $label);
			
			$label = mb_strtolower($label);
	
			$label = preg_replace('/([^a-z0-9\-]+)/', '', $label);
	
			$label = preg_replace('/-{2,}/', '-', $label);
			$label = rtrim($label, '-');
		
			return $label;
		}
		
		function error_box($msg)
		{
			return $this->ui_box(array('class'=>'error', 'content'=>$msg));
		}
			
		function notice_box($msg)
		{
			return $this->ui_box(array('class'=>'notice', 'content'=>$msg));
		}
		
		function success_box($msg)
		{
			return $this->ui_box(array('class'=>'success', 'content'=>$msg));
		}
		
		function ui_box($options=null)
		{
			if(isset($options['class'], $options['content']))
			return '<div class="'.$options['class'].'">'.$options['content'].'</div>'."\n";
		}
			
		function is_loggedin()
		{
			if(isset($_SESSION['logged']))
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	
		/*
		This is the function to use if you want to make a log entry. You supply 
		a	category, the name of the subsystem that wants to make the log entry,
		a level, the level of importance for this log entry, if this is equally or
			more important than current log level for this subsystem an entry will be made,
		a file name, __FILE__ I guess,
		a line number, __LINE__ is it?,
		a description, some information usable for error tracking and
		a serialized object or something that can be printed in the log entry.
		*/
		function log_to_file($category, $level, $file, $line, $description, $serialized=null)
		{
			global $loglevels;
			global $loglevel_names;
			
			if(isset($loglevels[$category]))
			{
				if($level > $loglevels[$category])
				{
					return;
				}
			}
			else
			{
				if($level > $loglevels['default'])
				{
					return;
				}
			}
	
			$output = date('Y-m-d H:i:s') . "\t" .  $loglevel_names[$level];
			if(isset($_SERVER['REMOTE_ADDR']))
			{
				$output .= "\t" . $_SERVER['REMOTE_ADDR'];
			}
			
			if(isset($_SESSION['login']['id']))
			{
				$output .= "\t" . $_SESSION['login']['id'];
			}
			else
			{
				$output .= "\t(no session id)\t";
			}
			
			$output .= "\t". $file . "\t" . $line . "\t" . $description;
			
			if(isset($_SERVER['HTTP_REFERER']))
			{
				$output .= "\t" . $_SERVER['HTTP_REFERER'];
			}
			
			if(isset($_SERVER['REQUEST_URI']))
			{
				$output .= "\t" . $_SERVER['REQUEST_URI'];
			}
			
			if(isset($serialized))
			{
				$output .= "\t" . $serialized;
			}
			
			$output .= "\n";
	
			if(!is_dir(PATHS_LOGS . $category))
			{
				mkdir(PATHS_LOGS . $category);
				chmod(PATHS_LOGS . $category, 0777);
			}
			$handle = fopen(PATHS_LOGS . $category . '/' . date('Y-m-d') . '.log', 'a');
			fwrite($handle, $output);
			fclose($handle);
		}
		
		function password_generate($length = 10)
		{
			$Source[0] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
			$Source[1] = "0123456789";
			$Source[2] = "!@#$%*_-=?|";
	
			$Use = $Source;
			$Passwordlen = $length;
			
			if($Passwordlen >= count($Use))
			{
				$Min = 0;
				$i=0;
				$Password = '';
				while($i < $Passwordlen)
				{
					$Max = strlen($Use[$i % count($Use)])-1;
					$Rand = rand($Min,$Max);
					$Password .= substr($Use[$i % count($Use)],$Rand,1);
					$i++;
				}
			}
			return $Password;
		}
		
		function lcfirst( $str ) 
		{
			return (string)(strtolower(substr($str,0,1)).substr($str,1));
		}  
		
		#
		# RFC(2)822 Email Parser
		#
		# By Cal Henderson <cal@iamcal.com>
		# This code is licensed under a Creative Commons Attribution-ShareAlike 2.5 License
		# http://creativecommons.org/licenses/by-sa/2.5/
		#
		# $Revision: 1.2 $
		#
	
		##################################################################################
	
		function is_valid_email_address($email){
	
	
			####################################################################################
			#
			# NO-WS-CTL       =       %d1-8 /         ; US-ASCII control characters
			#                         %d11 /          ;  that do not include the
			#                         %d12 /          ;  carriage return, line feed,
			#                         %d14-31 /       ;  and white space characters
			#                         %d127
			# ALPHA          =  %x41-5A / %x61-7A   ; A-Z / a-z
			# DIGIT          =  %x30-39
	
			$no_ws_ctl	= "[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]";
			$alpha		= "[\\x41-\\x5a\\x61-\\x7a]";
			$digit		= "[\\x30-\\x39]";
			$cr		= "\\x0d";
			$lf		= "\\x0a";
			$crlf		= "($cr$lf)";
	
	
			####################################################################################
			#
			# obs-char        =       %d0-9 / %d11 /          ; %d0-127 except CR and
			#                         %d12 / %d14-127         ;  LF
			# obs-text        =       *LF *CR *(obs-char *LF *CR)
			# text            =       %d1-9 /         ; Characters excluding CR and LF
			#                         %d11 /
			#                         %d12 /
			#                         %d14-127 /
			#                         obs-text
			# obs-qp          =       "\" (%d0-127)
			# quoted-pair     =       ("\" text) / obs-qp
	
			$obs_char	= "[\\x00-\\x09\\x0b\\x0c\\x0e-\\x7f]";
			$obs_text	= "($lf*$cr*($obs_char$lf*$cr*)*)";
			$text		= "([\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f]|$obs_text)";
			$obs_qp		= "(\\x5c[\\x00-\\x7f])";
			$quoted_pair	= "(\\x5c$text|$obs_qp)";
	
	
			####################################################################################
			#
			# obs-FWS         =       1*WSP *(CRLF 1*WSP)
			# FWS             =       ([*WSP CRLF] 1*WSP) /   ; Folding white space
			#                         obs-FWS
			# ctext           =       NO-WS-CTL /     ; Non white space controls
			#                         %d33-39 /       ; The rest of the US-ASCII
			#                         %d42-91 /       ;  characters not including "(",
			#                         %d93-126        ;  ")", or "\"
			# ccontent        =       ctext / quoted-pair / comment
			# comment         =       "(" *([FWS] ccontent) [FWS] ")"
			# CFWS            =       *([FWS] comment) (([FWS] comment) / FWS)
	
			#
			# note: we translate ccontent only partially to avoid an infinite loop
			# instead, we'll recursively strip comments before processing the input
			#
	
			$wsp		= "[\\x20\\x09]";
			$obs_fws	= "($wsp+($crlf$wsp+)*)";
			$fws		= "((($wsp*$crlf)?$wsp+)|$obs_fws)";
			$ctext		= "($no_ws_ctl|[\\x21-\\x27\\x2A-\\x5b\\x5d-\\x7e])";
			$ccontent	= "($ctext|$quoted_pair)";
			$comment	= "(\\x28($fws?$ccontent)*$fws?\\x29)";
			$cfws		= "(($fws?$comment)*($fws?$comment|$fws))";
			$cfws		= "$fws*";
	
	
			####################################################################################
			#
			# atext           =       ALPHA / DIGIT / ; Any character except controls,
			#                         "!" / "#" /     ;  SP, and specials.
			#                         "$" / "%" /     ;  Used for atoms
			#                         "&" / "'" /
			#                         "*" / "+" /
			#                         "-" / "/" /
			#                         "=" / "?" /
			#                         "^" / "_" /
			#                         "`" / "{" /
			#                         "|" / "}" /
			#                         "~"
			# atom            =       [CFWS] 1*atext [CFWS]
	
			$atext		= "($alpha|$digit|[\\x21\\x23-\\x27\\x2a\\x2b\\x2d\\x2f\\x3d\\x3f\\x5e\\x5f\\x60\\x7b-\\x7e])";
			$atom		= "($cfws?$atext+$cfws?)";
	
	
			####################################################################################
			#
			# qtext           =       NO-WS-CTL /     ; Non white space controls
			#                         %d33 /          ; The rest of the US-ASCII
			#                         %d35-91 /       ;  characters not including "\"
			#                         %d93-126        ;  or the quote character
			# qcontent        =       qtext / quoted-pair
			# quoted-string   =       [CFWS]
			#                         DQUOTE *([FWS] qcontent) [FWS] DQUOTE
			#                         [CFWS]
			# word            =       atom / quoted-string
	
			$qtext		= "($no_ws_ctl|[\\x21\\x23-\\x5b\\x5d-\\x7e])";
			$qcontent	= "($qtext|$quoted_pair)";
			$quoted_string	= "($cfws?\\x22($fws?$qcontent)*$fws?\\x22$cfws?)";
			$word		= "($atom|$quoted_string)";
	
	
			####################################################################################
			#
			# obs-local-part  =       word *("." word)
			# obs-domain      =       atom *("." atom)
	
			$obs_local_part	= "($word(\\x2e$word)*)";
			$obs_domain	= "($atom(\\x2e$atom)*)";
	
	
			####################################################################################
			#
			# dot-atom-text   =       1*atext *("." 1*atext)
			# dot-atom        =       [CFWS] dot-atom-text [CFWS]
	
			$dot_atom_text	= "($atext+(\\x2e$atext+)*)";
			$dot_atom	= "($cfws?$dot_atom_text$cfws?)";
	
	
			####################################################################################
			#
			# domain-literal  =       [CFWS] "[" *([FWS] dcontent) [FWS] "]" [CFWS]
			# dcontent        =       dtext / quoted-pair
			# dtext           =       NO-WS-CTL /     ; Non white space controls
			# 
			#                         %d33-90 /       ; The rest of the US-ASCII
			#                         %d94-126        ;  characters not including "[",
			#                                         ;  "]", or "\"
	
			$dtext		= "($no_ws_ctl|[\\x21-\\x5a\\x5e-\\x7e])";
			$dcontent	= "($dtext|$quoted_pair)";
			$domain_literal	= "($cfws?\\x5b($fws?$dcontent)*$fws?\\x5d$cfws?)";
	
	
			####################################################################################
			#
			# local-part      =       dot-atom / quoted-string / obs-local-part
			# domain          =       dot-atom / domain-literal / obs-domain
			# addr-spec       =       local-part "@" domain
	
			$local_part	= "($dot_atom|$quoted_string|$obs_local_part)";
			$domain		= "($dot_atom|$domain_literal|$obs_domain)";
			$addr_spec	= "($local_part\\x40$domain)";
	
	
			#
			# we need to strip comments first (repeat until we can't find any more)
			#
	
			$done = 0;
	
			while(!$done){
				$new = preg_replace("!$comment!", '', $email);
				if (strlen($new) == strlen($email)){
					$done = 1;
				}
				$email = $new;
			}
	
	
			#
			# now match what's left
			#
	
			return preg_match("!^$addr_spec$!", $email) ? 1 : 0;
		}
	
		function checkLink($link)
		{
			
			$link = trim($link);
			$validhost = true;
		 
			if (strpos($link, 'http://') === false && strpos($link, 'https://') === false) {
				$link = 'http://'.$link;
			}
		 
			//first check with php's FILTER_VALIDATE_URL
			if (filter_var($link, FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED) === false) {
				$validhost = false;
			} else {
				//not all invalid URLs are caught by FILTER_VALIDATE_URL
				//use our own mechanism
		 
				$host = parse_url($link, PHP_URL_HOST);
				$dotcount = substr_count($host, '.');
		 
				//the host should contain at least one dot
				if ($dotcount > 0) {
					//if the host contains one dot
					if ($dotcount == 1) {
						//and it start with www.
						if (strpos($host, 'www.') === 0) {
							//there is no top level domain, so it is invalid
							$validhost = false;
						}
					} else {
						//the host contains multiple dots
						if (strpos($host, '..') !== false) {
							//dots can't be next to each other, so it is invalid
							$validhost = false;
						}
					}
				} else {
					//no dots, so it is invalid
					$validhost = false;
				}
			}
		 
			//return false if host is invalid
			//otherwise return true
			return $validhost;
		}
		
		function create_table($form, $options=null)
		{
			$options['general']['inputs']['style'] = isset($options['general']['inputs']['style']) ? $options['general']['inputs']['style'] : false;
			$options['general']['labels']['style'] = isset($options['general']['labels']['style']) ? $options['general']['labels']['style'] : false;
			$output = '<table>'."\n";
			foreach($form as $input)
			{
				$output .= "\t".'<tr>'."\n";
					$output .= "\t\t".'<td>'."\n";
						$output .= "\t\t\t".'<label for="'.$input['id'].'"';
	
						if(isset($input['label_style']) || isset($options['general']['labels']['style']))
						{
							$style = '';
							if(!empty($input['label_style']))
							{
								$style .= $input['label_style'];
							}
							if(!empty($options['general']['labels']['style']))
							{
								$style .= $options['general']['labels']['style'];
							}
							
							if(!empty($style))
							{
								$output .= ' style="'.$style.'"';
							}
						}
	
						$output .= '>'.$input['label'];
						if(isset($input['required']) && $input['required'] == true)
						{
							$output .= ' <span class="red">*</span>';
						}
						$output .= '</label>'."\n";
						
					$output .= "\t\t".'</td>'."\n";
					$output .= "\t\t".'<td>'."\n";
					
						if($input['type'] == 'textarea')
						{
							$output .= '<textarea id="'.$input['name'].'" name="'.$input['name'].'" cols="'.(isset($input['cols']) ? $input['cols'] : 60).'" rows="'.(isset($input['rows']) ? $input['rows'] : 10).'">'.(isset($input['value']) ? $input['value'] : '').'</textarea>'."\n";
						}
						elseif($input['type'] == 'select')
						{
							if(isset($input['select_options']) && is_array($input['select_options']))
							{
								$output .= "\t\t\t".'<select name="'.$input['name'].'">'."\n";
								foreach($input['select_options'] as $option)
								{
									$output .= "\t\t\t\t".'<option value="'.$option['value'].'"'.(isset($input['value']) && $input['value'] == $option['value'] ? ' selected="selected"' : '').'>'.$option['label'].'</option>'."\n";
								}
								$output .= "\t\t\t".'</select>'."\n";
							}
						}
						else
						{
							/*
							if($input['type'] == 'text')
							{
								$output .= "\t\t\t".'<div class="textinput">'."\n";
							}
							*/
							if($input['type'] !== false)
							{
								$output .= "\t\t\t\t".'<input type="'.$input['type'].'" name="'.$input['name'].'" id="'.$input['id'].'"';
			
								if(in_array($input['type'], array('text', 'password')) && $options['general']['inputs']['style'] !== false)
								{
									$output .= ' style="'.$options['general']['inputs']['style'].'"';
								}
								
								if($input['type'] == 'checkbox' && isset($input['checked']) && $input['checked'] == 1)
								{
									$output .= ' checked="checked"';
								}
								
								if(isset($input['disabled']) && $input['disabled'] == 1)
								{
									$output .= ' disabled="disabled"';
								}
								
								if(isset($input['value']))
								{
									$output .= ' value="'.$input['value'].'"';
								}
								
								if(isset($input['required']) && $input['required'] == true)
								{
									$output .= ' class="is_required_true"';
								}
		
								$output .= ' />'."\n";
							}
							
							if(isset($input['value_extra']))
							{
								$output .= $input['value_extra'];
							}
							
							/*						
							if($input['type'] == 'text')
							{
								$output .= "\t\t\t".'</div>'."\n";
							}
							*/
						}
						
					$output .= "\t\t".'</td>'."\n";
				$output .= "\t".'</tr>'."\n";
			}
			$output .= '</table>'."\n";	
			return $output;
		}
		
		function checksum_field($text)
		{
			$salt = 'dasajkdasadssjk12983üjskda9291‘‘12-123dsad21(8221[]©20121382LsamA_**^!?"#2931lkömdsdwoj==(äm"#7]129138kLÖAKSÖdsad21j13iud8©8238¨¨¨`211-2.-218283210412Nnalsˆœ]29u213nassdASIPOIADJK)="3982139Nn2}n2i1@ü@©üœœ@';
			return sha1(base64_encode($text).crypt($text, $salt));
		}
		
		public function getOption( $option = '' )
		{
			if( empty( $option ) )
			{
				return null;
			}
			
			return 'a:2:{s:10:"javascript";s:3:"0.1";s:3:"css";s:3:"0.1";}';
			
			$query = 'SELECT * FROM '. TABLE_OPTIONS . ' WHERE Field = %s LIMIT 1';
			
			$result = $this->db->query( $query, $option, __FILE__, __LINE__ );

			if($result->num_rows > 0)
			{
				$rows = array();
				while($row = $result->fetch_assoc())
				{
					$rows[] = $row;
				}
				return $rows[0];
			}
			else
			{
				return null;
			}
		}
		

		/**
		 * Prepares arrays of value/format pairs as passed to wpdb CRUD methods.
		 *
		 * @since 4.2.0
		 * @access protected
		 *
		 * @param array $data   Array of fields to values.
		 * @param mixed $format Formats to be mapped to the values in $data.
		 * @return array Array, keyed by field names with values being an array
		 *               of 'value' and 'format' keys.
		 */
		protected function process_field_formats( $data, $format ) {
			$formats = $original_formats = (array) $format;
	
			foreach ( $data as $field => $value ) {
				$value = array(
					'value'  => $value,
					'format' => '%s',
				);
	
				if ( ! empty( $format ) ) {
					$value['format'] = array_shift( $formats );
					if ( ! $value['format'] ) {
						$value['format'] = reset( $original_formats );
					}
				} elseif ( isset( $this->field_types[ $field ] ) ) {
					$value['format'] = $this->field_types[ $field ];
				}
	
				$data[ $field ] = $value;
			}
	
			return $data;
		}
		
		public function getthedate( $date = "now", $dateFormat = 'Y-m-d H:i:s' )
		{
			$tz = new DateTimeZone( 'Europe/Stockholm' );
			$date = new DateTime( $date, $tz);
			return $date->format( $dateFormat );
		}
	}
?>