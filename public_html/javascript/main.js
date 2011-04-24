$(document).ready(function()
{

	
	$('.toggleFavoriteRecipie')
		.hover(function()
		{
			
		})
		.click(function(e)
		{
			e.preventDefault();

			// GÖR AJAXSKIT
			
			$(this).toggleClass('favouritedRecipie');
			
			if($(this).hasClass('favouritedRecipie'))
			{
				$(this).attr('title', 'Favoritmåltid - klicka för att ta bort som favorit');
			}
			else
			{
				$(this).attr('title', 'Klicka för att göra till favoritmåltid');
			}
			
						
			return false;
		});
});