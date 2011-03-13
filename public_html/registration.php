<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'registration.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Anmälan - Amsterdam 2011';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$class_Registration = new Registration();

	$updateSuccess = false;
	
	if(count($_POST) > 0)
	{
		$updateSuccess = $class_Registration->processRegistrationForm($_POST);
	}

	echo '<h2>Anmälan till Amsterdam</h2>'."\n";
	
	if($updateSuccess)
	{
		echo $class_Registration->success_box('Din anmälan uppdaterades.');
	}	
	
	echo $class_Registration->drawRegistrationForm();

	$class_UI->bottom();
?>