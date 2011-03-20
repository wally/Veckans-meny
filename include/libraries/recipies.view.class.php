<?php
	require_once('recipies.class.php');
	
	class RecipiesView extends Recipies
	{
	
		public function __construct()
		{
			parent::__construct();
		}
		
		public function viewRecipie($data)
		{
			if( !(isset($data['webb']) && !empty($data['webb'])) )
			{
				header('Location: /recept');
				exit;
			}
			
			$options = array();
			$options['fields'] = 'id, title, link';
			$options['identifier'] = 'webb';
			$options['identifierValue'] = $data['webb']; 
			
			$recipieInfo = $this->getRecipie($options);
			
			if($recipieInfo === false)
			{
				$recipieInfo = $this->createNotFoundRecipieInfo();
			}
			
			$recipieInfo[0]['webb'] = $data['webb'];
			$recipieInfo = $recipieInfo[0];
			
			$userRating = $this->getUserRecipieRating(array('recipieId'=>$recipieInfo['id']));

			$output = '';
			
			$output .= '<h2><a href="'.$recipieInfo['link'].'">'.$recipieInfo['title'].'</a></h2>'."\n";
			
			if($userRating['favourite'])
			{
				$output .= 'Favorit';
			}
			
			$output .= 'Betyg: ';
			if($userRating['rating'] == 0)
			{
				$output .= 'Det här receptet har fått för få röster.';
			}
			else
			{
				$output .= $userRating['rating'];
			}
			
			return array('output'=>$output, 'info'=>$recipieInfo);
			
		}
		
		public function createNotFoundRecipieInfo()
		{
			$data = array();
			$data['title'] = 'Receptet hittades inte';
			$data['link'] = '';
			$data['webb'] = '';
			$data['notFound'] = true;
			return array($data);
		}
	}
	
?>