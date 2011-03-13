<?php

	class Participants extends PublicFunctions
	{
		var $db;
		var $validFields = array(
								'id'=>'Användarid'
								, 'firstname'=>'Förnamn'
								, 'sirname'=>'Efternamn'
								, 'willGo'=>'Följer med'
								, 'flight'=>'Flyger'
								, 'hotel'=>'Hotell'
								, 'available'=>'Ledig'
							);
		var $sortBy = 'id';
		var $order = 'asc';
		
		function __construct()
		{
			$this->db = new DB();
		}
		
		public function displayParticipants($sortBy='id', $order='asc')
		{
			$this->sortBy = $this->validateSortBy($sortBy);
			$this->order = $this->validateOrder($order);
			
			$data = $this->getPublicParticipants();
			
			$output = $this->generateTable($data);
			
			return $output;
		}
		
		public function validateSortBy($sortBy='id')
		{
			return isset($this->validFields[$sortBy]) ? $sortBy : 'id';
		}
		
		public function validateOrder($order='asc')
		{
			return strtolower($order) == 'asc' ? 'ASC' : 'DESC';
		}
		
		public function getPublicParticipants()
		{
			$query = 'SELECT firstname, sirname, willGo, flight, hotel, available, public FROM amsterdam2011_accounts '.($_SESSION['email'] == 'waldemar.axdorph@gmail.com' ? '' : 'WHERE public = 1') . ' ORDER BY ' . $this->sortBy . ' ' . $this->order;
			
			$result = $this->db->query($query, __FILE__, __LINE__);
			
			$data = array();
			
			if($result->num_rows > 0)
			{
				while($row = $result->fetch_assoc())
				{
					$data[] = $row;
				}
			}
			
			return $data;
		}
		
		public function generateTable($data = array())
		{
			$output = '';
			
			if(count($data) > 0)
			{
				$output .= '<table>'."\n";
				
				$output .= '<thead>'."\n";
				
					$output .= '<tr>'."\n";
					
						$output .= '<td>Förnamn <a href="?sortBy=firstname&amp;order=asc">&uarr;</a> <a href="?sortBy=firstname&amp;order=desc">&darr;</a></td><td>Efternamn <a href="?sortBy=sirname&amp;order=asc">&uarr;</a><a href="?sortBy=sirname&amp;order=desc">&darr;</a></td><td>Slutar/Ledig <a href="?sortBy=available&amp;order=asc">&uarr;</a><a href="?sortBy=available&amp;order=desc">&darr;</a></td><td>Flyger <a href="?sortBy=flight&amp;order=asc">&uarr;</a><a href="?sortBy=flight&amp;order=desc">&darr;</a></td><td>Bor på hotell <a href="?sortBy=hotel&amp;order=asc">&uarr;</a><a href="?sortBy=hotel&amp;order=desc">&darr;</a></td>'."\n";
					
					$output .= '</tr>'."\n";
				$output .= '</thead>'."\n";
				
				$output .= '<tbody>'."\n";
				
				foreach($data as $row)
				{
					$output .= '<tr>'."\n";
						
						$output .= '<td>'.$row['firstname'].'</td><td>'.$row['sirname'].'</td><td>'.$row['available'].'</td><td>'.$this->checkBox($row['flight']).'</td><td>'.$this->checkBox($row['hotel']) . ($_SESSION['email'] == 'waldemar.axdorph@gmail.com' && $row['public'] == 0 ? '*' : '') . '</td>'."\n";
					

					$output .= '</tr>'."\n";
				}
				
				$output .= '</tbody>'."\n";
				$output .= '</table>'."\n";
			}
			else
			{
				$output .= '<div class="notice">Det finns inga som vill visa vad de ska göra i Amsterdam :(</div>'."\n";
			}
			
			return $output;
		}
		
		public function checkBox($value = 0)
		{
			return '<input type="checkbox" '.($value == 1 ? 'checked="checked"' : '').' />'."\n";
		}
	}
?>