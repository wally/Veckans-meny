$(function () {
  $('[rel="tooltip"]').tooltip();
})



$(document).ready(function(){
	// http://stackoverflow.com/a/12830454
	jQuery.extend( { 
		round: function(num, scale) {
			if(!("" + num).includes("e")) {
				return +(Math.round(num + "e+" + scale)  + "e-" + scale);  
			} else {
				var arr = ("" + num).split("e");
				var sig = ""
			if(+arr[1] + scale > 0) {
				sig = "+";
			}
				return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
			}
		}
	});
	
	$('.favourite-recipe').click(function(){
		$('.fa', this).toggleClass('fa-heart-o fa-heart');
	});
	
	$('#slider').slider(
	{
		value: $('#recipeServingsDefaultValue').val(),
		min: 1,
		max: 12,
		step: 1,
		slide: function( event, ui ) {
			$( '.counter' ).text( ui.value );
			var modifier = ui.value;
			
			$('.calculate').each( function()
			{
				modifier = $(this).data('math');
				$(this).text( $.round( modifier * ui.value , 2 ) );
			});
			
			if( ui.value != $('#recipeServingsDefaultValue').val() )
			{
				$('.portion-disclaimer').show();
			}
			else
			{
				$('.portion-disclaimer').hide();
			}
		}
	});
	
	// To the top!
	$('#totop').click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 500, 'easeOutCirc');
	});
});