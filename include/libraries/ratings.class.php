<?php
	
	class Ratings extends PublicFunctions
	{
		public $db;
		
		public function __construct()
		{
			$this->db = new DB();
		}
		
		public function getUsersRatings($options = array())
		{

			if( !(isset($options['recipieId']) && intval($options['recipieId']) > 0) )
			{
				return false;
			}
			
			if( !isset($options['type']))
			{
				$options['type'] = 'unknown';
			}
			
			$options['recipieId'] = intval($options['recipieId']);
			
			$query = 'SELECT rating, favourite, userId FROM user_recipies_ratings WHERE type = "'.$options['type'].'" AND typeId = '.$options['recipieId'];
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
			}

			return $info;			
		}
		
		public function getUserRating($options = array())
		{
		
			if( !(isset($options['typeId']) && intval($options['typeId']) > 0) )
			{
				return false;
			}

			if( !(isset($options['userId']) && intval($options['userId']) > 0) )
			{
				return false;
			}
			
			if( !isset($options['type']))
			{
				$options['type'] = 'unknown';
			}
			
			$options['typeId'] = intval($options['typeId']);
			$options['userId'] = intval($options['userId']);
			
			$query = 'SELECT rating, favourite FROM user_recipies_ratings WHERE type = "'.$options['type'].'" AND typeId = '.$options['typeId'].' AND userId = '.$options['userId'].' LIMIT 1';
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			$info = array('rating'=>0, 'favourite'=>false, 'hasRated'=>false);
			
			if($result->num_rows > 0)
			{
				$row = $result->fetch_assoc();
				if($row['rating'] > 0)
				{
					$info['hasRated'] == true;
				}
				
				if($row['favourite'] == 1)
				{
					$info['favourite'] = true;
				}
			}

			return $info;			
		}

	}

?>