<?php
	require_once('../include/core/common.php');

	$_SESSION['userid'] = 29221;
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_Recipies = new RecipiesView();
	
	$recipie = $class_Recipies->viewRecipie(array('webb'=>$_GET['webb']));
	
	$recipieTitle = $recipie['info']['title'];
	
	$ui_options = array();
	
	$ui_options['title'] = $recipieTitle.' - Veckans meny';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $recipie['output'];

	$class_UI->bottom();
?>