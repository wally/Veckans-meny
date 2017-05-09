$(function () {
  $('[rel="tooltip"]').tooltip()
})

$(document).ready(function(){
	$('.favourite-recipe').click(function(){
		$('.fa', this).toggleClass('fa-heart-o fa-heart');
	});
});