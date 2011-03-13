<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'contactInfo.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Kontaktuppgifter - Amsterdam 2011';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$class_ContactInfo = new ContactInfo();

	$updateSuccess = false;
	
	if(count($_POST) > 0)
	{
		$updateSuccess = $class_ContactInfo->processUpdate($_POST);
	}

	if($updateSuccess)
	{
		echo $class_ContactInfo->success_box('Dina uppgifter har blivit sparade.');
	}

	echo $class_ContactInfo->drawAddressForm();

	$class_UI->bottom();
?>