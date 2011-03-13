<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Lägg till recept - Veckans meny</title>
	</head>
	<body>
		<h1>Veckans meny</h1>
		<h2>Lägg till recept</h2>

		<form action="?addRecipie" method="post">
			<label for="title">Titel:</label>
			<br />
			<input type="text" id="title" name="title" />

			<br />
			<br />
			<label for="link">Länk:</label>
			<br />
			<input type="text" id="link" name="link" />
			
			<br />
			<br />
			<input type="submit" value="Lägg till" />
			
		</form>

	</body>
</html>
