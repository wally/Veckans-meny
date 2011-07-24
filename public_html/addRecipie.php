<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'recipies.add.class.php' );
	
	$ui_options = array();
	
	$ui_options['title'] = 'Lägg till recept - ';
	
	$class_Recipies = new RecipiesAdd();
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $class_Recipies->processRecipieAddition($_POST);
	
	$class_UI->bottom();
?>