Date.prototype.getWeek = function() {
    var determinedate = new Date();
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = determinedate.getDay();
    if(D == 0) D = 7;
    determinedate.setDate(determinedate.getDate() + (4 - D));
    var YN = determinedate.getFullYear();
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
}

function getWeekFromDate(date)
{
	var date = date || new Date().asString();
	var date_components = date.split('/');
	var day = date_components[0];
	var month = date_components[1]-1;
	var year = date_components[2];
	
	var custom_date = new Date();
	custom_date.setFullYear(year, month, day);
	var weeknumber = custom_date.getWeek();
	
	return weeknumber;
}

function pad_date(_date)
{
	return (_date > 9 ? _date : '0'+_date);
}

function getDateRangeOfWeek(weekNo){
//format dd/mm/yyyy
		var d1 = new Date();
		numOfdaysPastSinceLastMonday = eval(d1.getDay()- 1);
		d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
		var weekNoToday = d1.getWeek();
		var weeksInTheFuture = eval( weekNo - weekNoToday );
		d1.setDate(d1.getDate() + eval( 7 * weeksInTheFuture ));
		var rangeIsFrom =  pad_date(d1.getDate()) + '/' + pad_date(eval(d1.getMonth()+1))   + "/"  +   d1.getFullYear();
		d1.setDate(d1.getDate() + 6);		
		var rangeIsTo = pad_date(d1.getDate()) + '/' + pad_date(eval(d1.getMonth()+1))   + "/"  +   d1.getFullYear() ;
		var range = [rangeIsFrom, rangeIsTo];
		return range;
};

$(document).ready(function()
{
	$('a[href="#"]').live('click', function(e){
		e.preventDefault();
	});
	
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	$('.toggleFavoriteRecipie')
	.live('click', function(e)
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
	
	$('.sortingOptions-button').click(function(){
		$('.sortingOptions-container', $(this).parent()).slideToggle();
	});
		
	$('.edit-menu-recipie')
	.click(function(e)
	{
		e.preventDefault();
		var ids = $(this).parent().parent().attr('id').match(/\d+/g);
		var recipieId, menuId;
		recipieId = ids[0];
		menuId = ids[1];
	});
	
	$('#week')
		.datePicker(
			{
				selectWeek:true,
				startDate:'01/01/2010',
				showYearNavigation: false

			})
		.bind(
			'dateSelected', 
			function(e, selectedDate, $td)
			{
				var week = selectedDate.getWeek();
				$(this).val(week);
			}
		);
	$('.dp-choose-date').bind(
			'click',
			function()
			{
				$week = $('#week');
				if($week.val().length == 2)
				{
					var weekInDateFormat = getDateRangeOfWeek($week.val())
					$week.dpSetSelected(weekInDateFormat[0]);
				}
			}
	);
	
	$('.recipie-selection .button-edit').live('click',
		function()
		{
			var opened = false;
			var hasOpenedBefore = false;
			var weekDay = $(this).parents('li').attr('id').substr(8);
			var $loader = $(this).next();
			var $topParent = $('#weekday-'+weekDay);
			var $recipiePicker = $('.recipie-picker', $topParent);
			var $recipieInfoContainer = $('.recipieInfo-container', $topParent);
			
			if( typeof($(this).data('opened')) !== 'undefined' )
			{
				hasOpenedBefore = true;
				opened = $recipiePicker.is(':hidden');
			}

			$(this).data('opened', opened);
			
			//loop through the recipies so we don't include them in the request
			var chosenRecipies = [];
			for(var i = 0;i<=6;i++)
			{
				var recipieVal = $('input[name="recipie_' + i + '"]').val();
				if( recipieVal != '')
				{
					chosenRecipies.push( recipieVal );
				}
			}
			chosenRecipies = chosenRecipies.join();
			
			if(!hasOpenedBefore)
			{
				$.ajax({
					url: '/ajax-gateways/weeksMenu/',
					data: 'action=getRecipiesSuggestions&chosenRecipies='+chosenRecipies,
					beforeSend: function()
					{
						$loader.fadeIn();
					},
					success: function(msg)
					{
						$loader.fadeOut();
						
						$recipiePicker.html( msg );
						
						$('.recipies-slides', $recipiePicker).bxSlider({pager:true});
						$recipiePicker.slideDown();
						
						$('.add-recipie-button', $topParent).live('click', function()
						{
							var recipieId = $(this).attr('id').match(/\d+/g);
							recipieId = recipieId[0];
							
							$('input#recipie_'+weekDay).val( recipieId );
							
							$.ajax({
								url: '/ajax-gateways/weeksMenu/',
								data: 'action=getRecipieSummaryHTML&recipieId='+recipieId,
								beforeSend: function()
								{
									$loader.fadeIn();
									$recipieInfoContainer.fadeOut('fast');
									$recipiePicker.slideUp();
								},
								success: function(text)
								{
									$loader.fadeOut();
									$recipieInfoContainer.html( text ).fadeIn('fast');
								}
							});
						});
					}
				});
			}
			else
			{
				$recipiePicker.slideToggle();
			}
			
			return false;
		}
	);
	
	$('.removeRecipie').live('click', function()
	{
		var $parentLI = $(this).parents('li');
		var weekDay = $parentLI.attr('id').substr(8);
		$('#recipie_'+weekDay).val('');
		
		$recipieContainer = $('.recipieInfo-container', $parentLI);
		
		$recipieContainer.slideUp('fast', function()
		{
			$recipieContainer.text('Inget recept valt').slideDown('fast');
		});
	});
	
	$('.recipie-quicklook').live('click', function()
	{
		var recipieId = $(this).attr('id').match(/\d+/g).shift();
		
		$.ajax(
		{
			url: '/ajax-gateways/recipies/',
			data: 'action=getRecipieInfoFull&recipieId='+recipieId,
			success: function(data)
			{
				$.fancybox(data, {width:500,autoDimensions:false});
			}
		});
	});
	
	$('.shuffleRecipies').click(function()
	{
		var chosenRecipies = [],
		 nonChosenRecipiesWeekdays = [],
		 _this = this;
		
		for(var i = 0;i<=6;i++)
		{
			var recipieVal = $('input[name="recipie_' + i + '"]').val();
			if( recipieVal != '')
			{
				chosenRecipies.push( recipieVal );
			}
			else
			{
				nonChosenRecipiesWeekdays.push( i );
			}
		}
		chosenRecipies = chosenRecipies.join();
		
		if($('#overwriteExisting').is(':checked'))
		{
			chosenRecipies = [];
			nonChosenRecipiesWeekdays = [0,1,2,3,4,5,6];
		}
		
		$.ajax({
			url: '/ajax-gateways/weeksMenu/',
			data: 'action=getMenuSuggestion&chosenRecipies='+chosenRecipies,
			beforeSend: function()
			{
				//display loading-modal
				$loader = $('img.loader', $(_this).parent());
				if( $loader.length === 0)
				{
					$loader = $('<img />').hide().attr({'src': '/images/loader-small.gif', 'alt':'Laddar...'}).addClass('loader').css({'padding-right':'10px','padding-bottom':'7px'});
					$(_this).before($loader);
				}
				$loader.fadeIn();
			},
			success: function(recipies)
			{
				recipies = recipies.split(',');
				var $recipieInfoContainer = [];
				$.each(recipies, function(i, value)
				{
					$recipieInfoContainer[i] = $('.recipieInfo-container', $('#weekday-' + nonChosenRecipiesWeekdays[i]));
					
					$.ajax({
						url: '/ajax-gateways/weeksMenu/',
						data: 'action=getRecipieSummaryHTML&recipieId='+value,
						beforeSend: function()
						{
							$recipieInfoContainer[i].fadeOut('fast');
						},
						success: function(text)
						{
							$('#recipie_'+nonChosenRecipiesWeekdays[i]).val(value);
							$recipieInfoContainer[i].html( text ).fadeIn('fast');
							
							if(i==(recipies.length-1))
							{
								$loader.fadeOut();
							}
						}
					});
				});
			}
		});
	});
});