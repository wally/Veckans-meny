<?php
	require_once('../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_Recipies = new RecipiesView();
	
	$webb = $id = false;
	
	if(isset($_GET['webb']) && !empty($_GET['webb']))
	{
		$webb = $_GET['webb'];
	}

	if(isset($_GET['id']) && !empty($_GET['id']))
	{
		$id = $_GET['id'];
	}
	
	$recipie = $class_Recipies->viewRecipie( array('webb'=>$webb, 'id'=>$id) );
	
	$recipieTitle = $recipie['info']['title'];
	
	$ui_options = array();
	
	$ui_options['title'] = $recipieTitle.' - ';
	$ui_options['menu'] = 'recipies';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $recipie['output'];

	$class_UI->bottom();
?>