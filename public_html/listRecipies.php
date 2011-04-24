<?php
	require_once('../include/core/common.php');

	$_SESSION['userid'] = 29221;
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_Recipies = new RecipiesView();

	$page = 1;
	
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

	$recipie = $class_Recipies->viewAllRecipies(array('page'=>$page));
	
	$ui_options = array();
	
	$ui_options['title'] = 'Recept - ';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();
	
	echo $recipie['output'];

	$class_UI->bottom();
?>