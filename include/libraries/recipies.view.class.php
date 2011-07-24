<?php
	require_once('recipies.class.php');
	
	class RecipiesView extends Recipies
	{
	
		public function __construct()
		{
			parent::__construct();
		}
		
		public function viewAllRecipies($data = array())
		{
			$page = 1;
			
			if(isset($data['page']) && is_numeric($data['page']))
			{
				$page = intval($data['page']);
			}
			
			$offset = $this->viewLimit*($page-1);
			$output = '';
			
			$options = array();
			$options['offset'] = $offset;
			$options['limit'] = $this->viewLimit;
			$options['fields'] = 'id, title, webb';
			$options['orderBy'] = 'id';
		
			$recipies = $this->getRecipie($options);

			$numRecipies = $this->getNumRecipies();
			
			
			
			if($recipies === false)
			{
				$output .= $this->notice_box('Just nu finns det inga inlagda recept. <a href="/recept/add/">Lägg till ett du!</a>');
			}
			else
			{
			
				$pagination = $this->displayPagination($page, $offset, $numRecipies);
				$output .= $pagination.'<br /><br />';
				
				foreach($recipies as $recipieInfo)
				{
					$userRating = $this->getUserRecipieRating(array('recipieId'=>$recipieInfo['id']));
					
					$recipieLink = $this->createRecipieLink(array(), true, array('webb'=>$recipieInfo['webb'], 'id'=>$recipieInfo['id']));
					$output .= '<h2><a href="'.$recipieLink.'">'.$recipieInfo['title'].'</a></h2>'."\n";
					
					if($userRating['favourite'])
					{
						$output .= 'Favorit';
					}
					
					$output .= 'Betyg: ';
					if($userRating['rating'] == 0)
					{
						$output .= 'Det här receptet har fått för få röster.';
					}
					else
					{
						$output .= $userRating['rating'];
					}
				}
				
				$output .= '<br /><br />'.$pagination;
			}
			
			return array('output'=>$output);
	
		}
		
		public function displayPagination($page = 0, $offset = 0, $total=1)
		{
			if($page < 0 || $offset < 0 || $total < 1)
			{
				return '[1]';
			}
			
			$this->page = abs($page);
			$this->items_per_page = $this->viewLimit;
			$this->items_total = $total;
			return $this->paginate();			
		}
		
		function paginate()  
	    {
	    	$this->ipp = $this->default_ipp = $this->viewLimit;
	    	
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
	  
	        if($this->num_pages > 10)  
	        {
	        
	        	echo 'FIXA DETTA !!!!!! '. __FILE__. '#'.__LINE__;
	            $this->return = ($this->current_page != 1 And $this->items_total >= 10) ? "<a class=\"paginate\" href=\"$_SERVER[PHP_SELF]?page=$prev_page&ipp=$this->items_per_page\">« Previous</a> ":"<span class=\"inactive\" href=\"#\">« Previous</span> ";  
	  
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
	                if($this->range[0] > 2 And $i == $this->range[0]) $this->return .= " ... ";  
	                // loop through all pages. if first, last, or in range, display  
	                if($i==1 Or $i==$this->num_pages Or in_array($i,$this->range))  
	                {  
	                    $this->return .= ($i == $this->current_page And $_GET['page'] != 'all') ? "<a title=\"Go to page $i of $this->num_pages\" class=\"current\" href=\"#\">$i</a> ":"<a class=\"paginate\" title=\"Go to page $i of $this->num_pages\" href=\"$_SERVER[PHP_SELF]?page=$i&ipp=$this->items_per_page\">$i</a> ";  
	                }  
	                if($this->range[$this->mid_range-1] < $this->num_pages-1 And $i == $this->range[$this->mid_range-1]) $this->return .= " ... ";  
	            }  
	            $this->return .= (($this->current_page != $this->num_pages And $this->items_total >= 10) And ($_GET['page'] != 'all')) ? "<a class=\"paginate\" href=\"$_SERVER[PHP_SELF]?page=$next_page&ipp=$this->items_per_page\">Next »</a>\n":"<span class=\"inactive\" href=\"#\">» Next</span>\n";  
	            $this->return .= ($_GET['page'] == 'All') ? "<a class=\"current\" style=\"margin-left:10px\" href=\"#\">all</a> \n":"<a class=\"paginate\" style=\"margin-left:10px\" href=\"$_SERVER[PHP_SELF]?page=1&ipp=all\">All</a> \n";  
	        }  
	        else  
	        {  
	            for($i=1;$i<=$this->num_pages;$i++)  
	            {  
	                $this->return .= ($i == $this->current_page) ? "<a class=\"current\" href=\"#\">$i</a> ":"<a class=\"paginate\" href=\"/recept/$i/\">$i</a> ";  
	            }
	        }  
	        $this->low = ($this->current_page-1) * $this->items_per_page;  
	        $this->high = ($this->page == -1) ? $this->items_total:($this->current_page * $this->items_per_page)-1;  
	        $this->limit = ($this->page == -1) ? "":" LIMIT $this->low,$this->items_per_page";
	        return $this->return;
	    }  
    
		function display_jump_menu()  
		{  
		    for($i=1;$i<=$this->num_pages;$i++)  
		    {  
		        $option .= ($i==$this->current_page) ? "<option value=\"$i\" selected>$i</option>\n":"<option value=\"$i\">$i</option>\n";  
		    }  
		    return "<span class=\"paginate\">Page:</span><select class=\"paginate\" onchange=\"window.location='".$_SERVER['PHP_SELF']."?page='+this[this.selectedIndex].value+'&ipp=$this->items_per_page';return false\">$option</select>\n";  
		}  
		
		public function viewRecipie($data = array(), $preview = false)
		{
			if( !(isset($data['webb']) && !empty($data['webb'])) && !$preview)
			{
				header('Location: /recept/');
				exit;
			}
						
			$recipieInfo = false;
			
			if( !$preview )
			{
				$options = array();
				$options['fields'] = 'id, title, added, views';
				$options['identifier'] = 'webb';
				$options['identifierValue'] = $data['webb'];
				$recipieInfo = $this->getRecipie($options);
			}
			
			//create fake info for preview
			if($recipieInfo === false)
			{
				if($preview)
				{
					$data['webb'] = $this->make_webbable_easy($data['title']);
					$data['added'] = date('Y-m-d H:i:s');
					$data['id'] = 0;
					$data['views'] = 1;

					$recipieInfo = array($data);
				}
				else
				{
					 return $this->createNotFoundRecipieOutput();
				}
			}
			
			$recipieInfo[0]['webb'] = $data['webb'];
			$recipieInfo = $recipieInfo[0];
			$this->recipieInfo = $recipieInfo;
			
			if($preview)
			{
				$userRating = array('rating'=>0, 'favourite'=>false);	
			}
			else
			{
				$userRating = $this->getUserRecipieRating(array('recipieId'=>$recipieInfo['id']));
			}

			$output = '';

			$output .= '<div id="pageHead">'."\n";
			
			$output .= '<h1><a href="' . $this->createRecipieLink(null, true, $recipieInfo) . '">'.$recipieInfo['title'].'</a></h1>'."\n";
			
			$output .= '</div>'."\n";
			
			$output .= '
		<div id="main" class="clearfix">			 
			<div class="threeFourth clearfix"> 
							    
			    <div class="page clearfix">';

			$output .= '<div class="recipie-meta clearfix">';
			
			$output .= '<span class="recipie-left">';
				
				$dateAddedFormatted = strftime('%e %b %Y', strtotime( $recipieInfo['added'] ) );
				$dateAddedFormatted = strtolower( $dateAddedFormatted );
				
				$output .= $dateAddedFormatted;
				
			$output .= '</span>'."\n";
			
			$output .= '<span class="recipie-middle">';
				$output .= $recipieInfo['views'] . ' visning' . ($recipieInfo['views'] == 1 ? '' : 'ar');
			$output .= '</span>'."\n";
			
			$output .= '<span class="recipie-right">';

			if($userRating['rating'] == 0)
			{
				$output .= 'Inget betyg än';
			}
			else
			{
				$output .= $userRating['rating'].'/5 *';
			}

			if($userRating['favourite'])
			{
				$title = 'Favoritmåltid - klicka för att ta bort som favorit';
			}
			else
			{
				$title = 'Klicka för att göra till favoritmåltid';
			}

			$output .= '<a class="toggleFavoriteRecipie" href="/account/favourite/'.$recipieInfo['webb'].'" title="'.$title.'">'.$title.'</a>';


			$output .= '</span>'."\n";
			
			$output .= '</div>'."\n";
			$output .= '<div class="clear"></div>';
			
				$output .= $this->displayRecipieContent();
			
			$output .= '</div>
			</div>
		</div>'."\n";
			
			return array('output'=>$output, 'info'=>$recipieInfo);
		}
		
		public function displayRecipieContent()
		{	
			if( !(isset($this->recipieInfo) && count($this->recipieInfo) > 0) )
			{
				$this->recipieInfo['recipie'] = $this->getRecipieContent();
			}
			else
			{
				return '<p>Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis est eu diam fringilla nec tristique metus vestibulum. Donec magna purus, pellentesque vel lobortis ut, convallis id augue. Sed odio magna, pellentesque eget convallis ac, vehicula vel arcu. Sed eu scelerisque dui. Sed eu arcu at nibh hendrerit viverra. Vivamus lacus augue, sodales id cursus in, condimentum at risus.</p> 
					<h2>Heading 2</h2> 
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget quam orci. Quisque porta varius dui, quis posuere nibh mollis quis. Mauris commodo rhoncus porttitor. Maecenas et euismod elit. Nulla facilisi. Vivamus lacus libero, ultrices non ullamcorper ac, tempus sit amet enim. Suspendisse at semper ipsum. Suspendisse sagittis diam a massa viverra sollicitudin. Vivamus sagittis est eu diam fringilla nec tristique metus vestibulum. Donec magna purus, pellentesque vel lobortis ut, convallis id augue. Sed odio magna, pellentesque eget convallis ac, vehicula vel arcu. Sed eu scelerisque dui. Sed eu arcu at nibh hendrerit viverra. Vivamus lacus augue, sodales id cursus in, condimentum at risus.</p> 
					<ul> 
						<li>Lorem ipsum dolor sit amet</li> 
						<li>Lorem ipsum dolor sit amet</li> 
						<li>Lorem ipsum dolor sit amet</li> 
					</ul> ';
			}
		}
		
		
		public function createNotFoundRecipieOutput()
		{
			$output = '';

			$output .= '<div id="pageHead">'."\n";
			
			$output .= '<h1>Receptet hittades inte</h1>'."\n";
			
			$output .= '</div>'."\n";
			
			$output .= '
		<div id="main" class="clearfix">			 
			<div class="threeFourth clearfix">
			
			<a href="/recept/" class="button blue">Leta efter några andra!</a>
			
			</div>
		</div>';
		
			return array('output'=>$output, 'info'=>array('title'=>'Receptet hittades inte'));
		}
	}
	
?>