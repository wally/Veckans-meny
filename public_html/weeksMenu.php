<?php
	require_once('../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'weeksMenu.view.class.php');
	
	$class_Recipies = new weeksMenuView();
	
	$handle = $class_Recipies->processMenuView( $_GET );
	
	if(isset($handle['info']['title']))
	{
		$recipieTitle = $handle['info']['title'];
	}
	else
	{
		$recipieTitle = 'Veckans meny';
	}
	
	if(!is_array($handle) || !isset($handle['output']))
	{
		$handle_tmp = $handle;
		unset($handle);
		$handle = array();
		$handle['output'] = $handle_tmp;
	}
	
	$ui_options = array();
	
	$ui_options['title'] = $recipieTitle.' - ';
	
	$ui_options['menu'] = 'weeksMenu';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $handle['output'];

	$class_UI->bottom();
?>