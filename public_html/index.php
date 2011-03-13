<?php
	require_once('../include/core/common.php');

	$ui_options = array();
	
	$isLoggedIn = $public->checkLogin();

	if($isLoggedIn)
	{
		require_once( PATHS_LIBRARIES . 'start.class.php');
	}
	else
	{
		$ui_options['noMenu'] = true;
		$ui_options['login'] = 'Login';
		require_once( PATHS_LIBRARIES . 'login.class.php' );
	}

	$class_UI = new UI($ui_options);
	$class_UI->top();

	if($isLoggedIn)
	{
		$class_Start = new Start();
		echo $class_Start->startMenu();
	}
	else
	{
		$class_Login = new Login();
		
		$loginError = '';

		if(isset($_GET['error']) && in_array($_GET['error'], array('wrong-password', 'no-account')))
		{
			$loginError = $_GET['error'];
		}

		echo $class_Login->drawLoginForm($loginError);
	}

	$class_UI->bottom();
?>