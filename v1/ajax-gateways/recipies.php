<?php
	require_once('../../include/core/common.php');
	
	require_once( PATHS_LIBRARIES . 'recipies.view.class.php');
	
	$class_RecipiesView = new RecipiesView();
	
	$handle = $class_RecipiesView->processAJAXrequest( $_GET );
	
	if(!is_array($handle) || !isset($handle['output']))
	{
		$handle_tmp = $handle;
		unset($handle);
		$handle = array();
		$handle['output'] = $handle_tmp;
	}
		
	echo $handle['output'];
?>
