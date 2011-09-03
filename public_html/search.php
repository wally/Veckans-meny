<?php
	require_once('../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'search.class.php');
	
	$class_Search = new Search();
		
	$return = $class_Search->search( $_GET );
	
	$title = isset($return['info']['title']) ? $return['info']['title'] : 'Sök efter recept och menyer';
	
	$ui_options = array();
	
	$ui_options['title'] = $title.' - ';
	$ui_options['menu'] = 'search';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $return['output'];

	$class_UI->bottom();
?>