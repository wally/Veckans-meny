<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'login.class.php' );
	
	$public->preint_r($_POST);

	if(isset($_POST) && count($_POST) > 0)
	{
		if(isset($_POST['username']) && isset($_POST['password']))
		{
			$classLogin = new Login();
			$classLogin->login($_POST['username'], $_POST['password']);
		}
	}
	else
	{
		header('Location: /');
		exit;
	}

?>