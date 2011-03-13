<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'account.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Skapa konto - Amsterdam 2011';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$class_Account = new Account();

	$creationSuccess = false;
	
	if(count($_POST) > 0)
	{
		$creationSuccess = $class_Account->processAccountCreation($_POST);
	}

	if($creationSuccess)
	{
		echo $class_Account->displayWelcomeMessage();
	}
	else
	{
		echo '<h2>Skapa ett konto</h2>'."\n";
		echo $class_Account->drawCreateAccountForm($_POST);
	}

	$class_UI->bottom();
?>