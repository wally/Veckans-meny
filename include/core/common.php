<?php

	ini_set( 'session.hash_function', 'sha512' );
	ini_set( 'session.hash_bits_per_character', 4 );
	
	session_start();
	header('Content-Type: text/html; charset=UTF-8');
	
	/*
		################################################
		################################################
		
		#############		REMOVE 		################
		#############	SESSION USERID 	################
		#############		BELOW		################
		
		################################################
		################################################
	
	*/
	
		$_SESSION['userid'] = 29221;
	
	
	

		
	//error_reporting(E_ERROR);
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
	ob_start();
	
	setlocale(LC_ALL, 'sv_se');
	
	// Sanitize POST and GET data
	$new_post = array();
	$new_get = array();
	
	foreach($_POST AS $key => $value)
	{
		if(!is_array($value))
		{
			$new_post[htmlspecialchars($key, ENT_QUOTES, 'UTF-8')] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
		}
	}
	
	foreach($_GET AS $key => $value)
	{
		if(!is_array($value))
		{
			$new_get[htmlspecialchars($key, ENT_QUOTES, 'UTF-8')] = htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
		}
	}
	
	$_POST = $new_post;
	$_GET = $new_get;
	unset($new_post, $new_get);

	define('CORE_PATH', substr(__FILE__, 0, strrpos(__FILE__, '/')+1));

	require_once(CORE_PATH . 'constants.php');
	
	// These classes are loaded by default, from /include/libraries/xxx.lib.php.
	foreach(array(
		'public-functions',
		'CombineFiles',
		'ui'
	) as $library)
	{
		require_once(PATHS_LIBRARIES . $library . '.class.php');
	}	

	require_once('db-config.php');
	
	/* Include all config files */
	$dir = opendir(PATHS_CONFIGS);
	while($file = readdir($dir))
	{
		if($file != '.' && $file != '..' && substr($file, 0, 2) != '._' && $file != 'menu.conf.php')
		{
			require_once(PATHS_CONFIGS . $file);
		}
	}
	require_once(PATHS_CONFIGS . 'menu.conf.php');

	$public = new PublicFunctions();

?>
