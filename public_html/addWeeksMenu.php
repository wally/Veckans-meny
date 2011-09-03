<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'weeksMenu.add.class.php' );
	
	$ui_options = array();
	
	$ui_options['title'] = 'Skapa din veckomeny - ';
	$ui_options['menu'] = 'weeksMenu';
	
	$class_Recipies = new WeeksMenuAdd();
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $class_Recipies->processRecipieAddition($_POST);
	
	$class_UI->bottom();
?>