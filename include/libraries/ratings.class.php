<?php
	
	class Ratings extends PublicFunctions
	{
		public $db;
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function getUserRecipieRating($options)
		{

			if( !(isset($options['recipieId']) && intval($options['recipieId']) > 0) )
			{
				return false;
			}
			
			$options['recipieId'] = intval($options['recipieId']);
			
			$query = 'SELECT rating, favourite, userId FROM user_recipies_ratings WHERE recipieId = '.$options['recipieId'];
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			$info = array('rating'=>0, 'favourite'=>false);
			
			if($result->num_rows > 0)
			{
				$rates = 0;
				$loggedInUserId = $_SESSION['userid'];
				while($row = $result->fetch_assoc())
				{
					if($loggedInUserId == $row['userId'])
					{
						if($row['rating'] > 0)
						{
							$info['hasRated'] == true;
						}
						
						if($row['favourite'] == 1)
						{
							$info['favourite'] = true;
						}
					}
					
					
					$rates += $row['rating'];
				}
				
				$info['rating'] = $rates/$result->num_rows;
				
				return $info;
			}
			else
			{
				return false;
			}
			
		}
	}

?>