<?php

	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'recipies.add.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Lägg till recept - Veckans meny';
	
	$class_Recipies = new RecipiesAdd();
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$addSuccess = false;
	
	if(count($_POST) > 0)
	{
		$addSuccess = $class_Recipies->processRecipieAddition($_POST);
	}

	echo '<h2>Lägg till recept</h2>'."\n";
	
	echo $class_Recipies->drawAddRecipieForm($_POST);

	$class_UI->bottom();
?>