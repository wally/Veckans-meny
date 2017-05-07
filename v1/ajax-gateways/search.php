<?php
	require_once('../../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'search.class.php');
	
	$class_Search = new Search();
	
	$handle = $class_Search->processAJAXrequest( $_GET, $_POST );
	
	if(!is_array($handle) || !isset($handle['output']))
	{
		$handle_tmp = $handle;
		unset($handle);
		$handle = array();
		$handle['output'] = $handle_tmp;
	}
		
	echo $handle['output'];
?>
