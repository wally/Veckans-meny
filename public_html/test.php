<?php
	require_once('../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'frontpage.class.php');
	
	$class_Frontpage = new Frontpage();
	
	$handle = $class_Frontpage->processFrontpage();
		
	$ui_options = array();
	
	$ui_options['title'] = $handle['title'];
	
	$ui_options['menu'] = 'home';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $handle['output'];

	$class_UI->bottom();
?>