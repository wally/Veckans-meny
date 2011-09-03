<?php
	define('PATHS_SCRIPTROOT', realpath(dirname(__FILE__).'/../../').'/');	// Constant, used
	define('PATHS_WEBROOT', PATHS_SCRIPTROOT.'public_html/');				// In use
	define('PATHS_INCLUDE', PATHS_SCRIPTROOT . 'include/');					// In use
	define('PATHS_LIBRARIES', PATHS_INCLUDE . 'libraries/');				// In use
	define('PATHS_CONFIGS', PATHS_INCLUDE . 'configs/');					// In used
	define('PATHS_CACHE', PATHS_SCRIPTROOT . 'cache/');						// Might come in use
	define('PATHS_LOGS', PATHS_SCRIPTROOT.'logs/generated/');				// In use
	define('PATHS_IMAGES', '');												// Not used

	define('PASSWORD_SALT', '');											// Not used	

	/*
	This system supports logging for different subsystems in different directories
	and also different levels of logging.
	
	levels:
	LOGLEVEL_DEBUG	- used only for debugging purposes
	LOGLEVEL_INFO 	- information about an event that is normal, not an error
	LOGLEVEL_WARN 	- warning about something that should not happen but is not an error in code
	LOGLEVEL_ERROR	- an error has occured, something the code couldn't handle

	categories, this is now the same as a subsystem or a group of subsystems	
	*/

	define('LOGLEVEL_DEBUG', 3);
	define('LOGLEVEL_INFO', 2);
	define('LOGLEVEL_WARN', 1);
	define('LOGLEVEL_ERROR', 0);

	$loglevels['404_not_found']					= LOGLEVEL_INFO;
	$loglevels['mysql_error']					= LOGLEVEL_ERROR;
	$loglevels['privilege_attempt']				= LOGLEVEL_WARN;
	$loglevels['session_cookie_hack_attempt'] 	= LOGLEVEL_WARN;
	$loglevels['default'] 						= LOGLEVEL_INFO;

	$loglevel_names = array( 0 => 'error', 1 => 'warning', 2 => 'info', 3 => 'debug');

	define('TABLE_RECIPIES', 'recipies_main');
	define('TABLE_MENUS', 'recipies_menus');
	define('TABLE_MENUS_REL', 'recipies_menus_rel');
	
?>
