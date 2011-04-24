<?php
	require_once('../include/core/common.php');

	$_SESSION['userid'] = 29221;
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_Recipies = new RecipiesView();
	
	if(isset($_GET['webb']) && empty($_GET['webb']))
	{
		$webb = $_GET['webb'];
	}

	$recipie = $class_Recipies->viewRecipie(array('webb'=>$webb));
	
	$recipieTitle = $recipie['info']['title'];
	
	$ui_options = array();
	
	$ui_options['title'] = $recipieTitle.' - ';
	
	$ui_options['menu']['name'] = 'recipie';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $recipie['output'];

	$class_UI->bottom();
?>