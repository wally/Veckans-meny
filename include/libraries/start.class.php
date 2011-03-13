<?php

	class Start extends PublicFunctions
	{
		public function startMenu()
		{
			$output = '

			<ul id="startmenu">
				<li><a href="registration.php">Min anmälan</a></li>
				<li><a href="participants.php">Titta på vilka som har anmält sig</a></li>
				<li><a href="contactInfo.php">Mina uppgifter</a></li>
			</ul>

			<div class="clear"></div>
			';

			return $output;
		}
	}
?>