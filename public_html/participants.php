<?php
	require_once('../include/core/common.php');

	require_once( PATHS_LIBRARIES . 'participants.class.php');
	
	$ui_options = array();
	
	$ui_options['title'] = 'Vilka följer med? - Amsterdam 2011';
	
	$class_UI = new UI($ui_options);
	$class_UI->top();

	$class_Participants = new Participants();

	echo '<h2>Vilka följer med?</h2>'."\n";

	$sort = isset($_GET['sortBy']) ? $_GET['sortBy'] : 'id';
	$order = isset($_GET['order']) ? $_GET['order'] : 'asc';
	echo $class_Participants->displayParticipants($sort, $order);

	$class_UI->bottom();
?>