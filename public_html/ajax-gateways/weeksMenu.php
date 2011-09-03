<?php
sleep(2);
	require_once('../../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'weeksMenu.add.class.php');
	
	$class_weeksMenu = new weeksMenuAdd();
	
	$handle = $class_weeksMenu->processAJAXrequest( $_GET );
	
	if(!is_array($handle) || !isset($handle['output']))
	{
		$handle_tmp = $handle;
		unset($handle);
		$handle = array();
		$handle['output'] = $handle_tmp;
	}
		
	echo $handle['output'];
?>
