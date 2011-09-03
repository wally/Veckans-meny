<?php
	require_once('../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_Recipies = new RecipiesView();

	$page = 1;
	$sortBy = $order = false;
	
	if(isset($_GET['page']) && intval($_GET['page']) > 0)
	{
		if(intval($_GET['page']) > 0)
		{
			$page = intval($_GET['page']);
		}
		else
		{
			header('Location: /recept/');
			exit;
		}
	}
	
	if(isset($_GET['sortBy']) && !empty($_GET['sortBy']))
	{
		$sortBy = $_GET['sortBy'];
	}
	
	if(isset($_GET['order']) && !empty($_GET['order']))
	{
		$order = $_GET['order'];
	}


	$recipie = $class_Recipies->viewAllRecipies(array('page'=>$page, 'sortBy'=>$sortBy, 'order'=>$order));

	$ui_options = array();
	
	$ui_options['title'] = 'Recept - ';
	$ui_options['menu'] = 'recipies';
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $recipie['output'];

	$class_UI->bottom();
?>