<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'account.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Ändra lösenord - Amsterdam 2011';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$class_Account = new Account();

	$updateSuccess = false;
	
	if(count($_POST) > 0)
	{
		$updateSuccess = $class_Account->processPasswordChange($_POST, $_SESSION['email']);
	}

	echo '<h2>Ändra ditt lösenord</h2>'."\n";
	
	if($updateSuccess)
	{
		echo $class_Account->success_box('Ditt lösenord har uppdaterats.');
	}	
	
	echo $class_Account->drawChangePasswordForm();

	$class_UI->bottom();
?>