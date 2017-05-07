/* FILE combined_javascript.js, VERSION 0.1 @ 2017-05-05 22:43:13 */


/* FILE /javascript/date.js, Checksum e37ac919ec067bbdbab06a7cb74abfc495be8c4c70300be4ef00793ac233361e */
/*
 * Date prototype extensions. Doesn't depend on any
 * other code. Doens't overwrite existing methods.
 *
 * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
 * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
 * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
 *
 * Copyright (c) 2006 Jörn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
 *
 * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
 * I've added my name to these methods so you know who to blame if they are broken!
 * 
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * An Array of day names starting with Sunday.
 * 
 * @example dayNames[0]
 * @result 'Sunday'
 *
 * @name dayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * An Array of abbreviated day names starting with Sun.
 * 
 * @example abbrDayNames[0]
 * @result 'Sun'
 *
 * @name abbrDayNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/**
 * An Array of month names starting with Janurary.
 * 
 * @example monthNames[0]
 * @result 'January'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * An Array of abbreviated month names starting with Jan.
 * 
 * @example abbrMonthNames[0]
 * @result 'Jan'
 *
 * @name monthNames
 * @type Array
 * @cat Plugins/Methods/Date
 */
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * The first day of the week for this locale.
 *
 * @name firstDayOfWeek
 * @type Number
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.firstDayOfWeek = 1;

/**
 * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.format = 'dd/mm/yyyy';
//Date.format = 'mm/dd/yyyy';
//Date.format = 'yyyy-mm-dd';
//Date.format = 'dd mmm yy';

/**
 * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
 * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
 *
 * @name format
 * @type String
 * @cat Plugins/Methods/Date
 * @author Kelvin Luck
 */
Date.fullYearStart = '20';

(function() {

	/**
	 * Adds a given method under the given name 
	 * to the Date prototype if it doesn't
	 * currently exist.
	 *
	 * @private
	 */
	function add(name, method) {
		if( !Date.prototype[name] ) {
			Date.prototype[name] = method;
		}
	};
	
	/**
	 * Checks if the year is a leap year.
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isLeapYear();
	 * @result true
	 *
	 * @name isLeapYear
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isLeapYear", function() {
		var y = this.getFullYear();
		return (y%4==0 && y%100!=0) || y%400==0;
	});
	
	/**
	 * Checks if the day is a weekend day (Sat or Sun).
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekend();
	 * @result false
	 *
	 * @name isWeekend
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekend", function() {
		return this.getDay()==0 || this.getDay()==6;
	});
	
	/**
	 * Check if the day is a day of the week (Mon-Fri)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.isWeekDay();
	 * @result false
	 * 
	 * @name isWeekDay
	 * @type Boolean
	 * @cat Plugins/Methods/Date
	 */
	add("isWeekDay", function() {
		return !this.isWeekend();
	});
	
	/**
	 * Gets the number of days in the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDaysInMonth();
	 * @result 31
	 * 
	 * @name getDaysInMonth
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDaysInMonth", function() {
		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
	});
	
	/**
	 * Gets the name of the day.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName();
	 * @result 'Saturday'
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayName(true);
	 * @result 'Sat'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getDayName", function(abbreviated) {
		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
	});

	/**
	 * Gets the name of the month.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName();
	 * @result 'Janurary'
	 *
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getMonthName(true);
	 * @result 'Jan'
	 * 
	 * @param abbreviated Boolean When set to true the name will be abbreviated.
	 * @name getDayName
	 * @type String
	 * @cat Plugins/Methods/Date
	 */
	add("getMonthName", function(abbreviated) {
		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
	});

	/**
	 * Get the number of the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getDayOfYear();
	 * @result 11
	 * 
	 * @name getDayOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getDayOfYear", function() {
		var tmpdtm = new Date("1/1/" + this.getFullYear());
		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
	});
	
	/**
	 * Get the number of the week of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.getWeekOfYear();
	 * @result 2
	 * 
	 * @name getWeekOfYear
	 * @type Number
	 * @cat Plugins/Methods/Date
	 */
	add("getWeekOfYear", function() {
		return Math.ceil(this.getDayOfYear() / 7);
	});

	/**
	 * Set the day of the year.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.setDayOfYear(1);
	 * dtm.toString();
	 * @result 'Tue Jan 01 2008 00:00:00'
	 * 
	 * @name setDayOfYear
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("setDayOfYear", function(day) {
		this.setMonth(0);
		this.setDate(day);
		return this;
	});
	
	/**
	 * Add a number of years to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addYears(1);
	 * dtm.toString();
	 * @result 'Mon Jan 12 2009 00:00:00'
	 * 
	 * @name addYears
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addYears", function(num) {
		this.setFullYear(this.getFullYear() + num);
		return this;
	});
	
	/**
	 * Add a number of months to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMonths(1);
	 * dtm.toString();
	 * @result 'Tue Feb 12 2008 00:00:00'
	 * 
	 * @name addMonths
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMonths", function(num) {
		var tmpdtm = this.getDate();
		
		this.setMonth(this.getMonth() + num);
		
		if (tmpdtm > this.getDate())
			this.addDays(-this.getDate());
		
		return this;
	});
	
	/**
	 * Add a number of days to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addDays(1);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addDays
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addDays", function(num) {
		//this.setDate(this.getDate() + num);
		this.setTime(this.getTime() + (num*86400000) );
		return this;
	});
	
	/**
	 * Add a number of hours to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addHours(24);
	 * dtm.toString();
	 * @result 'Sun Jan 13 2008 00:00:00'
	 * 
	 * @name addHours
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addHours", function(num) {
		this.setHours(this.getHours() + num);
		return this;
	});

	/**
	 * Add a number of minutes to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addMinutes(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 01:00:00'
	 * 
	 * @name addMinutes
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addMinutes", function(num) {
		this.setMinutes(this.getMinutes() + num);
		return this;
	});
	
	/**
	 * Add a number of seconds to the date object.
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.addSeconds(60);
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name addSeconds
	 * @type Date
	 * @cat Plugins/Methods/Date
	 */
	add("addSeconds", function(num) {
		this.setSeconds(this.getSeconds() + num);
		return this;
	});
	
	/**
	 * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.
	 * 
	 * @example var dtm = new Date();
	 * dtm.zeroTime();
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:01:00'
	 * 
	 * @name zeroTime
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("zeroTime", function() {
		this.setMilliseconds(0);
		this.setSeconds(0);
		this.setMinutes(0);
		this.setHours(0);
		return this;
	});
	
	/**
	 * Returns a string representation of the date object according to Date.format.
	 * (Date.toString may be used in other places so I purposefully didn't overwrite it)
	 * 
	 * @example var dtm = new Date("01/12/2008");
	 * dtm.asString();
	 * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name asString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	add("asString", function(format) {
		var r = format || Date.format;
		return r
			.split('yyyy').join(this.getFullYear())
			.split('yy').join((this.getFullYear() + '').substring(2))
			.split('mmmm').join(this.getMonthName(false))
			.split('mmm').join(this.getMonthName(true))
			.split('mm').join(_zeroPad(this.getMonth()+1))
			.split('dd').join(_zeroPad(this.getDate()))
			.split('hh').join(_zeroPad(this.getHours()))
			.split('min').join(_zeroPad(this.getMinutes()))
			.split('ss').join(_zeroPad(this.getSeconds()));
	});
	
	/**
	 * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
	 * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
	 *
	 * @example var dtm = Date.fromString("12/01/2008");
	 * dtm.toString();
	 * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
	 * 
	 * @name fromString
	 * @type Date
	 * @cat Plugins/Methods/Date
	 * @author Kelvin Luck
	 */
	Date.fromString = function(s, format)
	{
		var f = format || Date.format;
		var d = new Date('01/01/1977');
		
		var mLength = 0;

		var iM = f.indexOf('mmmm');
		if (iM > -1) {
			for (var i=0; i<Date.monthNames.length; i++) {
				var mStr = s.substr(iM, Date.monthNames[i].length);
				if (Date.monthNames[i] == mStr) {
					mLength = Date.monthNames[i].length - 4;
					break;
				}
			}
			d.setMonth(i);
		} else {
			iM = f.indexOf('mmm');
			if (iM > -1) {
				var mStr = s.substr(iM, 3);
				for (var i=0; i<Date.abbrMonthNames.length; i++) {
					if (Date.abbrMonthNames[i] == mStr) break;
				}
				d.setMonth(i);
			} else {
				d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
			}
		}
		
		var iY = f.indexOf('yyyy');

		if (iY > -1) {
			if (iM < iY)
			{
				iY += mLength;
			}
			d.setFullYear(Number(s.substr(iY, 4)));
		} else {
			if (iM < iY)
			{
				iY += mLength;
			}
			// TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
			d.setFullYear(Number(Date.fullYearStart + s.substr(f.indexOf('yy'), 2)));
		}
		var iD = f.indexOf('dd');
		if (iM < iD)
		{
			iD += mLength;
		}
		d.setDate(Number(s.substr(iD, 2)));
		if (isNaN(d.getTime())) {
			return false;
		}
		return d;
	};
	
	// utility method
	var _zeroPad = function(num) {
		var s = '0'+num;
		return s.substring(s.length-2)
		//return ('0'+num).substring(-2); // doesn't work on IE :(
	};
	
})();

/* FILE /javascript/date_se.js, Checksum 0d48332fc465a39b868b20c10f0012f946f434ea2b89a27c0e1a62a7d2fdc722 */
// date localization for locale 'se'
// generated by Gabriel Svennerberg | www.svennerberg.com
Date.dayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
Date.abbrDayNames = ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'];
Date.monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

/* FILE /javascript/jquery.bxSlider.min.js, Checksum 3dc48d534a81110d5350cabef41b85312ef73cd5bb2f2da2def4b061799c0735 */
/**
 * jQuery bxSlider v3.0
 * http://bxslider.com
 *
 * Copyright 2010, Steven Wanderski
 * http://stevenwanderski.com
 *
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */
(function($){$.fn.bxSlider=function(options){var defaults={mode:'horizontal',infiniteLoop:true,hideControlOnEnd:false,controls:true,speed:500,easing:'swing',pager:false,pagerSelector:null,pagerType:'full',pagerLocation:'bottom',pagerShortSeparator:'/',pagerActiveClass:'pager-active',nextText:'next',nextImage:'',nextSelector:null,prevText:'prev',prevImage:'',prevSelector:null,captions:false,captionsSelector:null,auto:false,autoDirection:'next',autoControls:false,autoControlsSelector:null,autoStart:true,autoHover:false,autoDelay:0,pause:3000,startText:'start',startImage:'',stopText:'stop',stopImage:'',ticker:false,tickerSpeed:5000,tickerDirection:'next',tickerHover:false,wrapperClass:'bx-wrapper',startingSlide:0,displaySlideQty:1,moveSlideQty:1,randomStart:false,onBeforeSlide:function(){},onAfterSlide:function(){},onLastSlide:function(){},onFirstSlide:function(){},onNextSlide:function(){},onPrevSlide:function(){},buildPager:null}
var options=$.extend(defaults,options);var base=this;var $parent='';var $origElement='';var $children='';var $outerWrapper='';var $firstChild='';var childrenWidth='';var childrenOuterWidth='';var wrapperWidth='';var wrapperHeight='';var $pager='';var interval='';var $autoControls='';var $stopHtml='';var $startContent='';var $stopContent='';var autoPlaying=true;var loaded=false;var childrenMaxWidth=0;var childrenMaxHeight=0;var currentSlide=0;var origLeft=0;var origTop=0;var origShowWidth=0;var origShowHeight=0;var tickerLeft=0;var tickerTop=0;var isWorking=false;var firstSlide=0;var lastSlide=$children.length-1;this.goToSlide=function(number,stopAuto){if(!isWorking){isWorking=true;currentSlide=number;options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
slide=number;if(slide==firstSlide){options.onFirstSlide(currentSlide,$children.length,$children.eq(currentSlide));}
if(slide==lastSlide){options.onLastSlide(currentSlide,$children.length,$children.eq(currentSlide));}
if(options.mode=='horizontal'){$parent.animate({'left':'-'+getSlidePosition(slide,'left')+'px'},options.speed,options.easing,function(){isWorking=false;options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){$parent.animate({'top':'-'+getSlidePosition(slide,'top')+'px'},options.speed,options.easing,function(){isWorking=false;options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
checkEndControls();if(options.moveSlideQty>1){number=Math.floor(number/options.moveSlideQty);}
makeSlideActive(number);showCaptions();}}
this.goToNextSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
if(!options.infiniteLoop){if(!isWorking){var slideLoop=false;currentSlide=(currentSlide+(options.moveSlideQty));if(currentSlide<=lastSlide){checkEndControls();options.onNextSlide(currentSlide,$children.length,$children.eq(currentSlide));base.goToSlide(currentSlide);}else{currentSlide-=options.moveSlideQty;}}}else{if(!isWorking){isWorking=true;var slideLoop=false;currentSlide=(currentSlide+options.moveSlideQty);if(currentSlide>lastSlide){currentSlide=currentSlide%$children.length;slideLoop=true;}
options.onNextSlide(currentSlide,$children.length,$children.eq(currentSlide));options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(options.mode=='horizontal'){var parentLeft=(options.moveSlideQty*childrenOuterWidth);$parent.animate({'left':'-='+parentLeft+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('left','-'+getSlidePosition(currentSlide,'left')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){var parentTop=(options.moveSlideQty*childrenMaxHeight);$parent.animate({'top':'-='+parentTop+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('top','-'+getSlidePosition(currentSlide,'top')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
showCaptions();}}}
this.goToPreviousSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
if(stopAuto){if(options.auto){base.stopShow(true);}}
if(!options.infiniteLoop){if(!isWorking){var slideLoop=false;currentSlide=currentSlide-options.moveSlideQty;if(currentSlide<0){currentSlide=0;if(options.hideControlOnEnd){$('.bx-prev',$outerWrapper).hide();}}
checkEndControls();options.onPrevSlide(currentSlide,$children.length,$children.eq(currentSlide));base.goToSlide(currentSlide);}}else{if(!isWorking){isWorking=true;var slideLoop=false;currentSlide=(currentSlide-(options.moveSlideQty));if(currentSlide<0){negativeOffset=(currentSlide%$children.length);if(negativeOffset==0){currentSlide=0;}else{currentSlide=($children.length)+negativeOffset;}
slideLoop=true;}
options.onPrevSlide(currentSlide,$children.length,$children.eq(currentSlide));options.onBeforeSlide(currentSlide,$children.length,$children.eq(currentSlide));if(options.mode=='horizontal'){var parentLeft=(options.moveSlideQty*childrenOuterWidth);$parent.animate({'left':'+='+parentLeft+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('left','-'+getSlidePosition(currentSlide,'left')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='vertical'){var parentTop=(options.moveSlideQty*childrenMaxHeight);$parent.animate({'top':'+='+parentTop+'px'},options.speed,options.easing,function(){isWorking=false;if(slideLoop){$parent.css('top','-'+getSlidePosition(currentSlide,'top')+'px');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});}else if(options.mode=='fade'){setChildrenFade();}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
showCaptions();}}}
this.goToFirstSlide=function(stopAuto){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
base.goToSlide(firstSlide,stopAuto);}
this.goToLastSlide=function(){if(typeof(stopAuto)=='undefined'){var stopAuto=true;}
base.goToSlide(lastSlide,stopAuto);}
this.getCurrentSlide=function(){return currentSlide;}
this.getSlideCount=function(){return $children.length;}
this.stopShow=function(changeText){clearInterval(interval);if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.autoControls){$autoControls.html($startContent).removeClass('stop').addClass('start');autoPlaying=false;}}
this.startShow=function(changeText){if(typeof(changeText)=='undefined'){var changeText=true;}
setAutoInterval();if(changeText&&options.autoControls){$autoControls.html($stopContent).removeClass('start').addClass('stop');autoPlaying=true;}}
this.stopTicker=function(changeText){$parent.stop();if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.ticker){$autoControls.html($startContent).removeClass('stop').addClass('start');autoPlaying=false;}}
this.startTicker=function(changeText){if(options.mode=='horizontal'){if(options.tickerDirection=='next'){var stoppedLeft=parseInt($parent.css('left'));var remainingDistance=(origShowWidth+stoppedLeft)+$children.eq(0).width();}else if(options.tickerDirection=='prev'){var stoppedLeft=-parseInt($parent.css('left'));var remainingDistance=(stoppedLeft)-$children.eq(0).width();}
var finishingSpeed=(remainingDistance*options.tickerSpeed)/origShowWidth;moveTheShow(tickerLeft,remainingDistance,finishingSpeed);}else if(options.mode=='vertical'){if(options.tickerDirection=='next'){var stoppedTop=parseInt($parent.css('top'));var remainingDistance=(origShowHeight+stoppedTop)+$children.eq(0).height();}else if(options.tickerDirection=='prev'){var stoppedTop=-parseInt($parent.css('top'));var remainingDistance=(stoppedTop)-$children.eq(0).height();}
var finishingSpeed=(remainingDistance*options.tickerSpeed)/origShowHeight;moveTheShow(tickerTop,remainingDistance,finishingSpeed);if(typeof(changeText)=='undefined'){var changeText=true;}
if(changeText&&options.ticker){$autoControls.html($stopContent).removeClass('start').addClass('stop');autoPlaying=true;}}}
this.initShow=function(){$parent=$(this);$origElement=$parent.clone();$children=$parent.children();$outerWrapper='';$firstChild=$parent.children(':first');childrenWidth=$firstChild.width();childrenMaxWidth=0;childrenOuterWidth=$firstChild.outerWidth();childrenMaxHeight=0;wrapperWidth=getWrapperWidth();wrapperHeight=getWrapperHeight();isWorking=false;$pager='';currentSlide=0;origLeft=0;origTop=0;interval='';$autoControls='';$stopHtml='';$startContent='';$stopContent='';autoPlaying=true;loaded=false;origShowWidth=0;origShowHeight=0;tickerLeft=0;tickerTop=0;firstSlide=0;lastSlide=$children.length-1;$children.each(function(index){if($(this).outerHeight()>childrenMaxHeight){childrenMaxHeight=$(this).outerHeight();}
if($(this).outerWidth()>childrenMaxWidth){childrenMaxWidth=$(this).outerWidth();}});if(options.randomStart){var randomNumber=Math.floor(Math.random()*$children.length);currentSlide=randomNumber;origLeft=childrenOuterWidth*(options.moveSlideQty+randomNumber);origTop=childrenMaxHeight*(options.moveSlideQty+randomNumber);}else{currentSlide=options.startingSlide;origLeft=childrenOuterWidth*(options.moveSlideQty+options.startingSlide);origTop=childrenMaxHeight*(options.moveSlideQty+options.startingSlide);}
initCss();if(options.pager&&!options.ticker){if(options.pagerType=='full'){showPager('full');}else if(options.pagerType=='short'){showPager('short');}}
if(options.controls&&!options.ticker){setControlsVars();}
if(options.auto||options.ticker){if(options.autoControls){setAutoControlsVars();}
if(options.autoStart){setTimeout(function(){base.startShow(true);},options.autoDelay);}else{base.stopShow(true);}
if(options.autoHover&&!options.ticker){setAutoHover();}}
if(options.moveSlideQty>1){makeSlideActive(Math.ceil(currentSlide/options.moveSlideQty));}else{makeSlideActive(currentSlide);}
checkEndControls();if(options.captions){showCaptions();}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));}
this.destroyShow=function(){clearInterval(interval);$('.bx-next, .bx-prev, .bx-pager, .bx-auto',$outerWrapper).remove();$parent.unwrap().unwrap().removeAttr('style');$parent.children().removeAttr('style').not('.pager').remove();$children.removeClass('pager');}
this.reloadShow=function(){base.destroyShow();base.initShow();}
function initCss(){setChildrenLayout(options.startingSlide);if(options.mode=='horizontal'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+wrapperWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="position:relative; overflow:hidden; width:'+wrapperWidth+'px;"></div>').css({width:'999999px',position:'relative',left:'-'+(origLeft)+'px'});$parent.children().css({width:childrenWidth,'float':'left',listStyle:'none'});$outerWrapper=$parent.parent().parent();$children.addClass('pager');}else if(options.mode=='vertical'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+childrenMaxWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="width:'+childrenMaxWidth+'px; height:'+wrapperHeight+'px; position:relative; overflow:hidden;"></div>').css({height:'999999px',position:'relative',top:'-'+(origTop)+'px'});$parent.children().css({listStyle:'none',height:childrenMaxHeight});$outerWrapper=$parent.parent().parent();$children.addClass('pager');}else if(options.mode=='fade'){$parent.wrap('<div class="'+options.wrapperClass+'" style="width:'+childrenMaxWidth+'px; position:relative;"></div>').wrap('<div class="bx-window" style="height:'+childrenMaxHeight+'px; width:'+childrenMaxWidth+'px; position:relative; overflow:hidden;"></div>');$parent.children().css({listStyle:'none',position:'absolute',top:0,left:0,zIndex:98});$outerWrapper=$parent.parent().parent();$children.not(':eq('+currentSlide+')').fadeTo(0,0);$children.eq(currentSlide).css('zIndex',99);}
if(options.captions&&options.captionsSelector==null){$outerWrapper.append('<div class="bx-captions"></div>');}}
function setChildrenLayout(){if(options.mode=='horizontal'||options.mode=='vertical'){var $prependedChildren=getArraySample($children,0,options.moveSlideQty,'backward');$.each($prependedChildren,function(index){$parent.prepend($(this));});var totalNumberAfterWindow=($children.length+options.moveSlideQty)-1;var pagerExcess=$children.length-options.displaySlideQty;var numberToAppend=totalNumberAfterWindow-pagerExcess;var $appendedChildren=getArraySample($children,0,numberToAppend,'forward');if(options.infiniteLoop){$.each($appendedChildren,function(index){$parent.append($(this));});}}}
function setControlsVars(){if(options.nextImage!=''){nextContent=options.nextImage;nextType='image';}else{nextContent=options.nextText;nextType='text';}
if(options.prevImage!=''){prevContent=options.prevImage;prevType='image';}else{prevContent=options.prevText;prevType='text';}
showControls(nextType,nextContent,prevType,prevContent);}
function setAutoInterval(){if(options.auto){if(!options.infiniteLoop){if(options.autoDirection=='next'){interval=setInterval(function(){currentSlide+=options.moveSlideQty;if(currentSlide>lastSlide){currentSlide=currentSlide%$children.length;}
base.goToSlide(currentSlide,false);},options.pause);}else if(options.autoDirection=='prev'){interval=setInterval(function(){currentSlide-=options.moveSlideQty;if(currentSlide<0){negativeOffset=(currentSlide%$children.length);if(negativeOffset==0){currentSlide=0;}else{currentSlide=($children.length)+negativeOffset;}}
base.goToSlide(currentSlide,false);},options.pause);}}else{if(options.autoDirection=='next'){interval=setInterval(function(){base.goToNextSlide(false);},options.pause);}else if(options.autoDirection=='prev'){interval=setInterval(function(){base.goToPreviousSlide(false);},options.pause);}}}else if(options.ticker){options.tickerSpeed*=10;$('.pager',$outerWrapper).each(function(index){origShowWidth+=$(this).width();origShowHeight+=$(this).height();});if(options.tickerDirection=='prev'&&options.mode=='horizontal'){$parent.css('left','-'+(origShowWidth+origLeft)+'px');}else if(options.tickerDirection=='prev'&&options.mode=='vertical'){$parent.css('top','-'+(origShowHeight+origTop)+'px');}
if(options.mode=='horizontal'){tickerLeft=parseInt($parent.css('left'));moveTheShow(tickerLeft,origShowWidth,options.tickerSpeed);}else if(options.mode=='vertical'){tickerTop=parseInt($parent.css('top'));moveTheShow(tickerTop,origShowHeight,options.tickerSpeed);}
if(options.tickerHover){setTickerHover();}}}
function moveTheShow(leftCss,distance,speed){if(options.mode=='horizontal'){if(options.tickerDirection=='next'){$parent.animate({'left':'-='+distance+'px'},speed,'linear',function(){$parent.css('left',leftCss);moveTheShow(leftCss,origShowWidth,options.tickerSpeed);});}else if(options.tickerDirection=='prev'){$parent.animate({'left':'+='+distance+'px'},speed,'linear',function(){$parent.css('left',leftCss);moveTheShow(leftCss,origShowWidth,options.tickerSpeed);});}}else if(options.mode=='vertical'){if(options.tickerDirection=='next'){$parent.animate({'top':'-='+distance+'px'},speed,'linear',function(){$parent.css('top',leftCss);moveTheShow(leftCss,origShowHeight,options.tickerSpeed);});}else if(options.tickerDirection=='prev'){$parent.animate({'top':'+='+distance+'px'},speed,'linear',function(){$parent.css('top',leftCss);moveTheShow(leftCss,origShowHeight,options.tickerSpeed);});}}}
function setAutoControlsVars(){if(options.startImage!=''){startContent=options.startImage;startType='image';}else{startContent=options.startText;startType='text';}
if(options.stopImage!=''){stopContent=options.stopImage;stopType='image';}else{stopContent=options.stopText;stopType='text';}
showAutoControls(startType,startContent,stopType,stopContent);}
function setAutoHover(){$outerWrapper.find('.bx-window').hover(function(){if(autoPlaying){base.stopShow(false);}},function(){if(autoPlaying){base.startShow(false);}});}
function setTickerHover(){$parent.hover(function(){if(autoPlaying){base.stopTicker(false);}},function(){if(autoPlaying){base.startTicker(false);}});}
function setChildrenFade(){$children.not(':eq('+currentSlide+')').fadeTo(options.speed,0).css('zIndex',98);$children.eq(currentSlide).css('zIndex',99).fadeTo(options.speed,1,function(){isWorking=false;if(jQuery.browser.msie){$children.eq(currentSlide).get(0).style.removeAttribute('filter');}
options.onAfterSlide(currentSlide,$children.length,$children.eq(currentSlide));});};function makeSlideActive(number){if(options.pagerType=='full'&&options.pager){$('a',$pager).removeClass(options.pagerActiveClass);$('a',$pager).eq(number).addClass(options.pagerActiveClass);}else if(options.pagerType=='short'&&options.pager){$('.bx-pager-current',$pager).html(currentSlide+1);}}
function showControls(nextType,nextContent,prevType,prevContent){var $nextHtml=$('<a href="" class="bx-next"></a>');var $prevHtml=$('<a href="" class="bx-prev"></a>');if(nextType=='text'){$nextHtml.html(nextContent);}else{$nextHtml.html('<img src="'+nextContent+'" />');}
if(prevType=='text'){$prevHtml.html(prevContent);}else{$prevHtml.html('<img src="'+prevContent+'" />');}
if(options.prevSelector){$(options.prevSelector).append($prevHtml);}else{$outerWrapper.append($prevHtml);}
if(options.nextSelector){$(options.nextSelector).append($nextHtml);}else{$outerWrapper.append($nextHtml);}
$nextHtml.click(function(){base.goToNextSlide();return false;});$prevHtml.click(function(){base.goToPreviousSlide();return false;});}
function showPager(type){var pagerQty=$children.length;if(options.moveSlideQty>1){if($children.length%options.moveSlideQty!=0){pagerQty=Math.ceil($children.length/options.moveSlideQty);}else{pagerQty=$children.length/options.moveSlideQty;}}
var pagerString='';if(options.buildPager){for(var i=0;i<pagerQty;i++){pagerString+=options.buildPager(i,$children.eq(i*options.moveSlideQty));}}else if(type=='full'){for(var i=1;i<=pagerQty;i++){pagerString+='<a href="" class="pager-link pager-'+i+'">'+i+'</a>';}}else if(type=='short'){pagerString='<span class="bx-pager-current">'+(options.startingSlide+1)+'</span> '+options.pagerShortSeparator+' <span class="bx-pager-total">'+$children.length+'<span>';}
if(options.pagerSelector){$(options.pagerSelector).append(pagerString);$pager=$(options.pagerSelector);}else{var $pagerContainer=$('<div class="bx-pager"></div>');$pagerContainer.append(pagerString);if(options.pagerLocation=='top'){$outerWrapper.prepend($pagerContainer);}else if(options.pagerLocation=='bottom'){$outerWrapper.append($pagerContainer);}
$pager=$('.bx-pager',$outerWrapper);}
$pager.children().click(function(){if(options.pagerType=='full'){var slideIndex=$pager.children().index(this);if(options.moveSlideQty>1){slideIndex*=options.moveSlideQty;}
base.goToSlide(slideIndex);}
return false;});}
function showCaptions(){var caption=$('img',$children.eq(currentSlide)).attr('title');if(caption!=''){if(options.captionsSelector){$(options.captionsSelector).html(caption);}else{$('.bx-captions',$outerWrapper).html(caption);}}else{if(options.captionsSelector){$(options.captionsSelector).html(' ');}else{$('.bx-captions',$outerWrapper).html(' ');}}}
function showAutoControls(startType,startContent,stopType,stopContent){$autoControls=$('<a href="" class="bx-start"></a>');if(startType=='text'){$startContent=startContent;}else{$startContent='<img src="'+startContent+'" />';}
if(stopType=='text'){$stopContent=stopContent;}else{$stopContent='<img src="'+stopContent+'" />';}
if(options.autoControlsSelector){$(options.autoControlsSelector).append($autoControls);}else{$outerWrapper.append('<div class="bx-auto"></div>');$('.bx-auto',$outerWrapper).html($autoControls);}
$autoControls.click(function(){if(options.ticker){if($(this).hasClass('stop')){base.stopTicker();}else if($(this).hasClass('start')){base.startTicker();}}else{if($(this).hasClass('stop')){base.stopShow(true);}else if($(this).hasClass('start')){base.startShow(true);}}
return false;});}
function checkEndControls(){if(!options.infiniteLoop&&options.hideControlOnEnd){if(currentSlide==firstSlide){$('.bx-prev',$outerWrapper).hide();}else{$('.bx-prev',$outerWrapper).show();}
if(currentSlide==lastSlide){$('.bx-next',$outerWrapper).hide();}else{$('.bx-next',$outerWrapper).show();}}}
function getSlidePosition(number,side){if(side=='left'){var position=$('.pager',$outerWrapper).eq(number).position().left;}else if(side=='top'){var position=$('.pager',$outerWrapper).eq(number).position().top;}
return position;}
function getWrapperWidth(){var wrapperWidth=$firstChild.outerWidth()*options.displaySlideQty;return wrapperWidth;}
function getWrapperHeight(){var wrapperHeight=$firstChild.outerHeight()*options.displaySlideQty;return wrapperHeight;}
function getArraySample(array,start,length,direction){var sample=[];var loopLength=length;var startPopulatingArray=false;if(direction=='backward'){array=$.makeArray(array);array.reverse();}
while(loopLength>0){$.each(array,function(index,val){if(loopLength>0){if(!startPopulatingArray){if(index==start){startPopulatingArray=true;sample.push($(this).clone());loopLength--;}}else{sample.push($(this).clone());loopLength--;}}else{return false;}});}
return sample;}
this.each(function(){base.initShow();});return this;}
jQuery.fx.prototype.cur=function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}
var r=parseFloat(jQuery.css(this.elem,this.prop));return r;}})(jQuery);

/* FILE /javascript/jquery.datePicker.js, Checksum 8383896030b5b265c6fce40ec96db5ce4b860954ce4572b011e7448522540030 */
/**
 * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * .
 * $Id: jquery.datePicker.js 103 2010-09-22 08:54:28Z kelvin.luck $
 **/

(function($){
    
	$.fn.extend({
/**
 * Render a calendar table into any matched elements.
 * 
 * @param Object s (optional) Customize your calendars.
 * @option Number month The month to render (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render. Default is today's year.
 * @option Function renderCallback A reference to a function that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Default is no callback.
 * @option Number showHeader Whether or not to show the header row, possible values are: $.dpConst.SHOW_HEADER_NONE (no header), $.dpConst.SHOW_HEADER_SHORT (first letter of each day) and $.dpConst.SHOW_HEADER_LONG (full name of each day). Default is $.dpConst.SHOW_HEADER_SHORT.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @type jQuery
 * @name renderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#calendar-me').renderCalendar({month:0, year:2007});
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me.
 *
 * @example
 * var testCallback = function($td, thisDate, month, year)
 * {
 * if ($td.is('.current-month') && thisDate.getDay() == 4) {
 *		var d = thisDate.getDate();
 *		$td.bind(
 *			'click',
 *			function()
 *			{
 *				alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
 *			}
 *		).addClass('thursday');
 *	} else if (thisDate.getDay() == 5) {
 *		$td.html('Friday the ' + $td.html() + 'th');
 *	}
 * }
 * $('#calendar-me').renderCalendar({month:0, year:2007, renderCallback:testCallback});
 * 
 * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me. Every Thursday in the current month has a class of "thursday" applied to it, is clickable and shows an alert when clicked. Every Friday on the calendar has the number inside replaced with text.
 **/
		renderCalendar  :   function(s)
		{
			var dc = function(a)
			{
				return document.createElement(a);
			};

			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			if (s.showHeader != $.dpConst.SHOW_HEADER_NONE) {
				var headRow = $(dc('tr'));
				for (var i=Date.firstDayOfWeek; i<Date.firstDayOfWeek+7; i++) {
					var weekday = i%7;
					var day = Date.dayNames[weekday];
					headRow.append(
						jQuery(dc('th')).attr({'scope':'col', 'abbr':day, 'title':day, 'class':(weekday == 0 || weekday == 6 ? 'weekend' : 'weekday')}).html(s.showHeader == $.dpConst.SHOW_HEADER_SHORT ? day.substr(0, 1) : day)
					);
				}
			};
			
			var calendarTable = $(dc('table'))
									.attr(
										{
											'cellspacing':2
										}
									)
									.addClass('jCalendar')
									.append(
										(s.showHeader != $.dpConst.SHOW_HEADER_NONE ? 
											$(dc('thead'))
												.append(headRow)
											:
											dc('thead')
										)
									);
			var tbody = $(dc('tbody'));
			
			var today = (new Date()).zeroTime();
			today.setHours(12);
			
			var month = s.month == undefined ? today.getMonth() : s.month;
			var year = s.year || today.getFullYear();
			
			var currentDate = (new Date(year, month, 1, 12, 0, 0));
			
			
			var firstDayOffset = Date.firstDayOfWeek - currentDate.getDay() + 1;
			if (firstDayOffset > 1) firstDayOffset -= 7;
			var weeksToDraw = Math.ceil(( (-1*firstDayOffset+1) + currentDate.getDaysInMonth() ) /7);
			currentDate.addDays(firstDayOffset-1);
			
			var doHover = function(firstDayInBounds)
			{
				return function()
				{
					if (s.hoverClass) {
						var $this = $(this);
						if (!s.selectWeek) {
							$this.addClass(s.hoverClass);
						} else if (firstDayInBounds && !$this.is('.disabled')) {
							$this.parent().addClass('activeWeekHover');
						}
					}
				}
			};
			var unHover = function()
			{
				if (s.hoverClass) {
					var $this = $(this);
					$this.removeClass(s.hoverClass);
					$this.parent().removeClass('activeWeekHover');
				}
			};

			var w = 0;
			while (w++<weeksToDraw) {
				var r = jQuery(dc('tr'));
				var firstDayInBounds = s.dpController ? currentDate > s.dpController.startDate : false;
				for (var i=0; i<7; i++) {
					var thisMonth = currentDate.getMonth() == month;
					var d = $(dc('td'))
								.text(currentDate.getDate() + '')
								.addClass((thisMonth ? 'current-month ' : 'other-month ') +
													(currentDate.isWeekend() ? 'weekend ' : 'weekday ') +
													(thisMonth && currentDate.getTime() == today.getTime() ? 'today ' : '')
								)
								.data('datePickerDate', currentDate.asString())
								.hover(doHover(firstDayInBounds), unHover)
							;
					r.append(d);
					if (s.renderCallback) {
						s.renderCallback(d, currentDate, month, year);
					}
					// addDays(1) fails in some locales due to daylight savings. See issue 39.
					//currentDate.addDays(1);
					// set the time to midday to avoid any weird timezone issues??
					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 12, 0, 0);
				}
				tbody.append(r);
			}
			calendarTable.append(tbody);
			
			return this.each(
				function()
				{
					$(this).empty().append(calendarTable);
				}
			);
		},
/**
 * Create a datePicker associated with each of the matched elements.
 *
 * The matched element will receive a few custom events with the following signatures:
 *
 * dateSelected(event, date, $td, status)
 * Triggered when a date is selected. event is a reference to the event, date is the Date selected, $td is a jquery object wrapped around the TD that was clicked on and status is whether the date was selected (true) or deselected (false)
 * 
 * dpClosed(event, selected)
 * Triggered when the date picker is closed. event is a reference to the event and selected is an Array containing Date objects.
 *
 * dpMonthChanged(event, displayedMonth, displayedYear)
 * Triggered when the month of the popped up calendar is changed. event is a reference to the event, displayedMonth is the number of the month now displayed (zero based) and displayedYear is the year of the month.
 *
 * dpDisplayed(event, $datePickerDiv)
 * Triggered when the date picker is created. $datePickerDiv is the div containing the date picker. Use this event to add custom content/ listeners to the popped up date picker.
 *
 * @param Object s (optional) Customize your date pickers.
 * @option Number month The month to render when the date picker is opened (NOTE that months are zero based). Default is today's month.
 * @option Number year The year to render when the date picker is opened. Default is today's year.
 * @option String|Date startDate The first date date can be selected.
 * @option String|Date endDate The last date that can be selected.
 * @option Boolean inline Whether to create the datePicker as inline (e.g. always on the page) or as a model popup. Default is false (== modal popup)
 * @option Boolean createButton Whether to create a .dp-choose-date anchor directly after the matched element which when clicked will trigger the showing of the date picker. Default is true.
 * @option Boolean showYearNavigation Whether to display buttons which allow the user to navigate through the months a year at a time. Default is true.
 * @option Boolean closeOnSelect Whether to close the date picker when a date is selected. Default is true.
 * @option Boolean displayClose Whether to create a "Close" button within the date picker popup. Default is false.
 * @option Boolean selectMultiple Whether a user should be able to select multiple dates with this date picker. Default is false.
 * @option Number numSelectable The maximum number of dates that can be selected where selectMultiple is true. Default is a very high number.
 * @option Boolean clickInput If the matched element is an input type="text" and this option is true then clicking on the input will cause the date picker to appear.
 * @option Boolean rememberViewedMonth Whether the datePicker should remember the last viewed month and open on it. If false then the date picker will always open with the month for the first selected date visible.
 * @option Boolean selectWeek Whether to select a complete week at a time...
 * @option Number verticalPosition The vertical alignment of the popped up date picker to the matched element. One of $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM. Default is $.dpConst.POS_TOP.
 * @option Number horizontalPosition The horizontal alignment of the popped up date picker to the matched element. One of $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT.
 * @option Number verticalOffset The number of pixels offset from the defined verticalPosition of this date picker that it should pop up in. Default in 0.
 * @option Number horizontalOffset The number of pixels offset from the defined horizontalPosition of this date picker that it should pop up in. Default in 0.
 * @option (Function|Array) renderCallback A reference to a function (or an array of separate functions) that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Each callback function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year. Default is no callback.
 * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
 * @option String autoFocusNextInput Whether focus should be passed onto the next input in the form (true) or remain on this input (false) when a date is selected and the calendar closes
 * @type jQuery
 * @name datePicker
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('input.date-picker').datePicker();
 * @desc Creates a date picker button next to all matched input elements. When the button is clicked on the value of the selected date will be placed in the corresponding input (formatted according to Date.format).
 *
 * @example demo/index.html
 * @desc See the projects homepage for many more complex examples...
 **/
		datePicker : function(s)
		{			
			if (!$.event._dpCache) $.event._dpCache = [];
			
			// initialise the date picker controller with the relevant settings...
			s = $.extend({}, $.fn.datePicker.defaults, s);
			
			return this.each(
				function()
				{
					var $this = $(this);
					var alreadyExists = true;
					
					if (!this._dpId) {
						this._dpId = $.event.guid++;
						$.event._dpCache[this._dpId] = new DatePicker(this);
						alreadyExists = false;
					}
					
					if (s.inline) {
						s.createButton = false;
						s.displayClose = false;
						s.closeOnSelect = false;
						$this.empty();
					}
					
					var controller = $.event._dpCache[this._dpId];
					
					controller.init(s);
					
					if (!alreadyExists && s.createButton) {
						// create it!
						controller.button = $('<a href="#" class="dp-choose-date" title="' + $.dpText.TEXT_CHOOSE_DATE + '">' + $.dpText.TEXT_CHOOSE_DATE + '</a>')
								.bind(
									'click',
									function()
									{
										$this.dpDisplay(this);
										this.blur();
										return false;
									}
								);
						$this.after(controller.button);
					}
					
					if (!alreadyExists && $this.is(':text')) {
						$this
							.bind(
								'dateSelected',
								function(e, selectedDate, $td)
								{
									this.value = selectedDate.asString();
								}
							).bind(
								'change',
								function()
								{
									if (this.value == '') {
										controller.clearSelected();
									} else {
										var d = Date.fromString(this.value);
										if (d) {
											controller.setSelected(d, true, true);
										}
									}
								}
							);
						if (s.clickInput) {
							$this.bind(
								'click',
								function()
								{
									// The change event doesn't happen until the input loses focus so we need to manually trigger it...
									$this.trigger('change');
									$this.dpDisplay();
								}
							);
						}
						var d = Date.fromString(this.value);
						if (this.value != '' && d) {
							controller.setSelected(d, true, true);
						}
					}
					
					$this.addClass('dp-applied');
					
				}
			)
		},
/**
 * Disables or enables this date picker
 *
 * @param Boolean s Whether to disable (true) or enable (false) this datePicker
 * @type jQuery
 * @name dpSetDisabled
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisabled(true);
 * @desc Prevents this date picker from displaying and adds a class of dp-disabled to it (and it's associated button if it has one) for styling purposes. If the matched element is an input field then it will also set the disabled attribute to stop people directly editing the field.
 **/
		dpSetDisabled : function(s)
		{
			return _w.call(this, 'setDisabled', s);
		},
/**
 * Updates the first selectable date for any date pickers on any matched elements.
 *
 * @param String|Date d A Date object or string representing the first selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetStartDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetStartDate('01/01/2000');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the first selectable date for each of these to the first day of the millenium.
 **/
		dpSetStartDate : function(d)
		{
			return _w.call(this, 'setStartDate', d);
		},
/**
 * Updates the last selectable date for any date pickers on any matched elements.
 *
 * @param String|Date d A Date object or string representing the last selectable date (formatted according to Date.format).
 * @type jQuery
 * @name dpSetEndDate
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetEndDate('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the last selectable date for each of these to the first Janurary 2010.
 **/
		dpSetEndDate : function(d)
		{
			return _w.call(this, 'setEndDate', d);
		},
/**
 * Gets a list of Dates currently selected by this datePicker. This will be an empty array if no dates are currently selected or NULL if there is no datePicker associated with the matched element.
 *
 * @type Array
 * @name dpGetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * alert($('.date-picker').dpGetSelected());
 * @desc Will alert an empty array (as nothing is selected yet)
 **/
		dpGetSelected : function()
		{
			var c = _getController(this[0]);
			if (c) {
				return c.getSelected();
			}
			return null;
		},
/**
 * Selects or deselects a date on any matched element's date pickers. Deselcting is only useful on date pickers where selectMultiple==true. Selecting will only work if the passed date is within the startDate and endDate boundries for a given date picker.
 *
 * @param String|Date d A Date object or string representing the date you want to select (formatted according to Date.format).
 * @param Boolean v Whether you want to select (true) or deselect (false) this date. Optional - default = true.
 * @param Boolean m Whether you want the date picker to open up on the month of this date when it is next opened. Optional - default = true.
 * @param Boolean e Whether you want the date picker to dispatch events related to this change of selection. Optional - default = true.
 * @type jQuery
 * @name dpSetSelected
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetSelected('01/01/2010');
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetSelected : function(d, v, m, e)
		{
			if (v == undefined) v=true;
			if (m == undefined) m=true;
			if (e == undefined) e=true;
			return _w.call(this, 'setSelected', Date.fromString(d), v, m, e);
		},
/**
 * Sets the month that will be displayed when the date picker is next opened. If the passed month is before startDate then the month containing startDate will be displayed instead. If the passed month is after endDate then the month containing the endDate will be displayed instead.
 *
 * @param Number m The month you want the date picker to display. Optional - defaults to the currently displayed month.
 * @param Number y The year you want the date picker to display. Optional - defaults to the currently displayed year.
 * @type jQuery
 * @name dpSetDisplayedMonth
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-picker').datePicker();
 * $('.date-picker').dpSetDisplayedMonth(10, 2008);
 * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
 **/
		dpSetDisplayedMonth : function(m, y)
		{
			return _w.call(this, 'setDisplayedMonth', Number(m), Number(y), true);
		},
/**
 * Displays the date picker associated with the matched elements. Since only one date picker can be displayed at once then the date picker associated with the last matched element will be the one that is displayed.
 *
 * @param HTMLElement e An element that you want the date picker to pop up relative in position to. Optional - default behaviour is to pop up next to the element associated with this date picker.
 * @type jQuery
 * @name dpDisplay
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpDisplay();
 * @desc Creates a date picker associated with the element with an id of date-picker and then causes it to pop up.
 **/
		dpDisplay : function(e)
		{
			return _w.call(this, 'display', e);
		},
/**
 * Sets a function or array of functions that is called when each TD of the date picker popup is rendered to the page
 *
 * @param (Function|Array) a A function or an array of functions that are called when each td is rendered. Each function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year.
 * @type jQuery
 * @name dpSetRenderCallback
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetRenderCallback(function($td, thisDate, month, year)
 * {
 * 	// do stuff as each td is rendered dependant on the date in the td and the displayed month and year
 * });
 * @desc Creates a date picker associated with the element with an id of date-picker and then creates a function which is called as each td is rendered when this date picker is displayed.
 **/
		dpSetRenderCallback : function(a)
		{
			return _w.call(this, 'setRenderCallback', a);
		},
/**
 * Sets the position that the datePicker will pop up (relative to it's associated element)
 *
 * @param Number v The vertical alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM
 * @param Number h The horizontal alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT
 * @type jQuery
 * @name dpSetPosition
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetPosition($.dpConst.POS_BOTTOM, $.dpConst.POS_RIGHT);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be bottom and right aligned to the #date-picker element.
 **/
		dpSetPosition : function(v, h)
		{
			return _w.call(this, 'setPosition', v, h);
		},
/**
 * Sets the offset that the popped up date picker will have from it's default position relative to it's associated element (as set by dpSetPosition)
 *
 * @param Number v The vertical offset of the created date picker.
 * @param Number h The horizontal offset of the created date picker.
 * @type jQuery
 * @name dpSetOffset
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('#date-picker').datePicker();
 * $('#date-picker').dpSetOffset(-20, 200);
 * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be 20 pixels above and 200 pixels to the right of it's default position.
 **/
		dpSetOffset : function(v, h)
		{
			return _w.call(this, 'setOffset', v, h);
		},
/**
 * Closes the open date picker associated with this element.
 *
 * @type jQuery
 * @name dpClose
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 * @example $('.date-pick')
 *		.datePicker()
 *		.bind(
 *			'focus',
 *			function()
 *			{
 *				$(this).dpDisplay();
 *			}
 *		).bind(
 *			'blur',
 *			function()
 *			{
 *				$(this).dpClose();
 *			}
 *		);
 **/
		dpClose : function()
		{
			return _w.call(this, '_closeCalendar', false, this[0]);
		},
/**
 * Rerenders the date picker's current month (for use with inline calendars and renderCallbacks).
 *
 * @type jQuery
 * @name dpRerenderCalendar
 * @cat plugins/datePicker
 * @author Kelvin Luck (http://www.kelvinluck.com/)
 *
 **/
		dpRerenderCalendar : function()
		{
			return _w.call(this, '_rerenderCalendar');
		},
		// private function called on unload to clean up any expandos etc and prevent memory links...
		_dpDestroy : function()
		{
			// TODO - implement this?
		}
	});
	
	// private internal function to cut down on the amount of code needed where we forward
	// dp* methods on the jQuery object on to the relevant DatePicker controllers...
	var _w = function(f, a1, a2, a3, a4)
	{
		return this.each(
			function()
			{
				var c = _getController(this);
				if (c) {
					c[f](a1, a2, a3, a4);
				}
			}
		);
	};
	
	function DatePicker(ele)
	{
		this.ele = ele;
		
		// initial values...
		this.displayedMonth		=	null;
		this.displayedYear		=	null;
		this.startDate			=	null;
		this.endDate			=	null;
		this.showYearNavigation	=	null;
		this.closeOnSelect		=	null;
		this.displayClose		=	null;
		this.rememberViewedMonth=	null;
		this.selectMultiple		=	null;
		this.numSelectable		=	null;
		this.numSelected		=	null;
		this.verticalPosition	=	null;
		this.horizontalPosition	=	null;
		this.verticalOffset		=	null;
		this.horizontalOffset	=	null;
		this.button				=	null;
		this.renderCallback		=	[];
		this.selectedDates		=	{};
		this.inline				=	null;
		this.context			=	'#dp-popup';
		this.settings			=	{};
	};
	$.extend(
		DatePicker.prototype,
		{	
			init : function(s)
			{
				this.setStartDate(s.startDate);
				this.setEndDate(s.endDate);
				this.setDisplayedMonth(Number(s.month), Number(s.year));
				this.setRenderCallback(s.renderCallback);
				this.showYearNavigation = s.showYearNavigation;
				this.closeOnSelect = s.closeOnSelect;
				this.displayClose = s.displayClose;
				this.rememberViewedMonth =	s.rememberViewedMonth;
				this.selectMultiple = s.selectMultiple;
				this.numSelectable = s.selectMultiple ? s.numSelectable : 1;
				this.numSelected = 0;
				this.verticalPosition = s.verticalPosition;
				this.horizontalPosition = s.horizontalPosition;
				this.hoverClass = s.hoverClass;
				this.setOffset(s.verticalOffset, s.horizontalOffset);
				this.inline = s.inline;
				this.settings = s;
				if (this.inline) {
					this.context = this.ele;
					this.display();
				}
			},
			setStartDate : function(d)
			{
				if (d) {
					if (d instanceof Date) {
						this.startDate = d;
					} else {
						this.startDate = Date.fromString(d);
					}
				}
				if (!this.startDate) {
					this.startDate = (new Date()).zeroTime();
				}
				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
			},
			setEndDate : function(d)
			{
				if (d) {
					if (d instanceof Date) {
						this.endDate = d;
					} else {
						this.endDate = Date.fromString(d);
					}
				}
				if (!this.endDate) {
					this.endDate = (new Date('12/31/2999')); // using the JS Date.parse function which expects mm/dd/yyyy
				}
				if (this.endDate.getTime() < this.startDate.getTime()) {
					this.endDate = this.startDate;
				}
				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
			},
			setPosition : function(v, h)
			{
				this.verticalPosition = v;
				this.horizontalPosition = h;
			},
			setOffset : function(v, h)
			{
				this.verticalOffset = parseInt(v) || 0;
				this.horizontalOffset = parseInt(h) || 0;
			},
			setDisabled : function(s)
			{
				$e = $(this.ele);
				$e[s ? 'addClass' : 'removeClass']('dp-disabled');
				if (this.button) {
					$but = $(this.button);
					$but[s ? 'addClass' : 'removeClass']('dp-disabled');
					$but.attr('title', s ? '' : $.dpText.TEXT_CHOOSE_DATE);
				}
				if ($e.is(':text')) {
					$e.attr('disabled', s ? 'disabled' : '');
				}
			},
			setDisplayedMonth : function(m, y, rerender)
			{
				if (this.startDate == undefined || this.endDate == undefined) {
					return;
				}
				var s = new Date(this.startDate.getTime());
				s.setDate(1);
				var e = new Date(this.endDate.getTime());
				e.setDate(1);
				
				var t;
				if ((!m && !y) || (isNaN(m) && isNaN(y))) {
					// no month or year passed - default to current month
					t = new Date().zeroTime();
					t.setDate(1);
				} else if (isNaN(m)) {
					// just year passed in - presume we want the displayedMonth
					t = new Date(y, this.displayedMonth, 1);
				} else if (isNaN(y)) {
					// just month passed in - presume we want the displayedYear
					t = new Date(this.displayedYear, m, 1);
				} else {
					// year and month passed in - that's the date we want!
					t = new Date(y, m, 1)
				}
				// check if the desired date is within the range of our defined startDate and endDate
				if (t.getTime() < s.getTime()) {
					t = s;
				} else if (t.getTime() > e.getTime()) {
					t = e;
				}
				var oldMonth = this.displayedMonth;
				var oldYear = this.displayedYear;
				this.displayedMonth = t.getMonth();
				this.displayedYear = t.getFullYear();

				if (rerender && (this.displayedMonth != oldMonth || this.displayedYear != oldYear))
				{
					this._rerenderCalendar();
					$(this.ele).trigger('dpMonthChanged', [this.displayedMonth, this.displayedYear]);
				}
			},
			setSelected : function(d, v, moveToMonth, dispatchEvents)
			{
				if (d < this.startDate || d.zeroTime() > this.endDate.zeroTime()) {
					// Don't allow people to select dates outside range...
					return;
				}
				var s = this.settings;
				if (s.selectWeek)
				{
					d = d.addDays(- (d.getDay() - Date.firstDayOfWeek + 7) % 7);
					if (d < this.startDate) // The first day of this week is before the start date so is unselectable...
					{
						return;
					}
				}
				if (v == this.isSelected(d)) // this date is already un/selected
				{
					return;
				}
				if (this.selectMultiple == false) {
					this.clearSelected();
				} else if (v && this.numSelected == this.numSelectable) {
					// can't select any more dates...
					return;
				}
				if (moveToMonth && (this.displayedMonth != d.getMonth() || this.displayedYear != d.getFullYear())) {
					this.setDisplayedMonth(d.getMonth(), d.getFullYear(), true);
				}
				this.selectedDates[d.asString()] = v;
				this.numSelected += v ? 1 : -1;
				var selectorString = 'td.' + (d.getMonth() == this.displayedMonth ? 'current-month' : 'other-month');
				var $td;
				$(selectorString, this.context).each(
					function()
					{
						if ($(this).data('datePickerDate') == d.asString()) {
							$td = $(this);
							if (s.selectWeek)
							{
								$td.parent()[v ? 'addClass' : 'removeClass']('selectedWeek');
							}
							$td[v ? 'addClass' : 'removeClass']('selected'); 
						}
					}
				);
				$('td', this.context).not('.selected')[this.selectMultiple &&  this.numSelected == this.numSelectable ? 'addClass' : 'removeClass']('unselectable');
				
				if (dispatchEvents)
				{
					var s = this.isSelected(d);
					$e = $(this.ele);
					var dClone = Date.fromString(d.asString());
					$e.trigger('dateSelected', [dClone, $td, s]);
					$e.trigger('change');
				}
			},
			isSelected : function(d)
			{
				return this.selectedDates[d.asString()];
			},
			getSelected : function()
			{
				var r = [];
				for(var s in this.selectedDates) {
					if (this.selectedDates[s] == true) {
						r.push(Date.fromString(s));
					}
				}
				return r;
			},
			clearSelected : function()
			{
				this.selectedDates = {};
				this.numSelected = 0;
				$('td.selected', this.context).removeClass('selected').parent().removeClass('selectedWeek');
			},
			display : function(eleAlignTo)
			{
				if ($(this.ele).is('.dp-disabled')) return;
				
				eleAlignTo = eleAlignTo || this.ele;
				var c = this;
				var $ele = $(eleAlignTo);
				var eleOffset = $ele.offset();
				
				var $createIn;
				var attrs;
				var attrsCalendarHolder;
				var cssRules;
				
				if (c.inline) {
					$createIn = $(this.ele);
					attrs = {
						'id'		:	'calendar-' + this.ele._dpId,
						'class'	:	'dp-popup dp-popup-inline'
					};

					$('.dp-popup', $createIn).remove();
					cssRules = {
					};
				} else {
					$createIn = $('body');
					attrs = {
						'id'		:	'dp-popup',
						'class'	:	'dp-popup'
					};
					cssRules = {
						'top'	:	eleOffset.top + c.verticalOffset,
						'left'	:	eleOffset.left + c.horizontalOffset
					};
					
					var _checkMouse = function(e)
					{
						var el = e.target;
						var cal = $('#dp-popup')[0];
						
						while (true){
							if (el == cal) {
								return true;
							} else if (el == document) {
								c._closeCalendar();
								return false;
							} else {
								el = $(el).parent()[0];
							}
						}
					};
					this._checkMouse = _checkMouse;
					
					c._closeCalendar(true);
					$(document).bind(
						'keydown.datepicker', 
						function(event)
						{
							if (event.keyCode == 27) {
								c._closeCalendar();
							}
						}
					);
				}
				
				if (!c.rememberViewedMonth)
				{
					var selectedDate = this.getSelected()[0];
					if (selectedDate) {
						selectedDate = new Date(selectedDate);
						this.setDisplayedMonth(selectedDate.getMonth(), selectedDate.getFullYear(), false);
					}
				}
				
				$createIn
					.append(
						$('<div></div>')
							.attr(attrs)
							.css(cssRules)
							.append(
//								$('<a href="#" class="selecteee">aaa</a>'),
								$('<h2></h2>'),
								$('<div class="dp-nav-prev"></div>')
									.append(
										$('<a class="dp-nav-prev-year" href="#" title="' + $.dpText.TEXT_PREV_YEAR + '">&lt;&lt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 0, -1);
												}
											),
										$('<a class="dp-nav-prev-month" href="#" title="' + $.dpText.TEXT_PREV_MONTH + '">&lt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, -1, 0);
												}
											)
									),
								$('<div class="dp-nav-next"></div>')
									.append(
										$('<a class="dp-nav-next-year" href="#" title="' + $.dpText.TEXT_NEXT_YEAR + '">&gt;&gt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 0, 1);
												}
											),
										$('<a class="dp-nav-next-month" href="#" title="' + $.dpText.TEXT_NEXT_MONTH + '">&gt;</a>')
											.bind(
												'click',
												function()
												{
													return c._displayNewMonth.call(c, this, 1, 0);
												}
											)
									),
								$('<div class="dp-calendar"></div>')
							)
							.bgIframe()
						);
					
				var $pop = this.inline ? $('.dp-popup', this.context) : $('#dp-popup');
				
				if (this.showYearNavigation == false) {
					$('.dp-nav-prev-year, .dp-nav-next-year', c.context).css('display', 'none');
				}
				if (this.displayClose) {
					$pop.append(
						$('<a href="#" id="dp-close">' + $.dpText.TEXT_CLOSE + '</a>')
							.bind(
								'click',
								function()
								{
									c._closeCalendar();
									return false;
								}
							)
					);
				}
				c._renderCalendar();

				$(this.ele).trigger('dpDisplayed', $pop);
				
				if (!c.inline) {
					if (this.verticalPosition == $.dpConst.POS_BOTTOM) {
						$pop.css('top', eleOffset.top + $ele.height() - $pop.height() + c.verticalOffset);
					}
					if (this.horizontalPosition == $.dpConst.POS_RIGHT) {
						$pop.css('left', eleOffset.left + $ele.width() - $pop.width() + c.horizontalOffset);
					}
//					$('.selectee', this.context).focus();
					$(document).bind('mousedown.datepicker', this._checkMouse);
				}
				
			},
			setRenderCallback : function(a)
			{
				if (a == null) return;
				if (a && typeof(a) == 'function') {
					a = [a];
				}
				this.renderCallback = this.renderCallback.concat(a);
			},
			cellRender : function ($td, thisDate, month, year) {
				var c = this.dpController;
				var d = new Date(thisDate.getTime());
				
				// add our click handlers to deal with it when the days are clicked...
				
				$td.bind(
					'click',
					function()
					{
						var $this = $(this);
						if (!$this.is('.disabled')) {
							c.setSelected(d, !$this.is('.selected') || !c.selectMultiple, false, true);
							if (c.closeOnSelect) {
								// Focus the next input in the form…
								if (c.settings.autoFocusNextInput) {
									var ele = c.ele;
									var found = false;
									$(':input', ele.form).each(
										function()
										{
											if (found) {
												$(this).focus();
												return false;
											}
											if (this == ele) {
												found = true;
											}
										}
									);
								} else {
									c.ele.focus();
								}
								c._closeCalendar();
							}
						}
					}
				);
				if (c.isSelected(d)) {
					$td.addClass('selected');
					if (c.settings.selectWeek)
					{
						$td.parent().addClass('selectedWeek');
					}
				} else  if (c.selectMultiple && c.numSelected == c.numSelectable) {
					$td.addClass('unselectable');
				}
				
			},
			_applyRenderCallbacks : function()
			{
				var c = this;
				$('td', this.context).each(
					function()
					{
						for (var i=0; i<c.renderCallback.length; i++) {
							$td = $(this);
							c.renderCallback[i].apply(this, [$td, Date.fromString($td.data('datePickerDate')), c.displayedMonth, c.displayedYear]);
						}
					}
				);
				return;
			},
			// ele is the clicked button - only proceed if it doesn't have the class disabled...
			// m and y are -1, 0 or 1 depending which direction we want to go in...
			_displayNewMonth : function(ele, m, y) 
			{
				if (!$(ele).is('.disabled')) {
					this.setDisplayedMonth(this.displayedMonth + m, this.displayedYear + y, true);
				}
				ele.blur();
				return false;
			},
			_rerenderCalendar : function()
			{
				this._clearCalendar();
				this._renderCalendar();
			},
			_renderCalendar : function()
			{
				// set the title...
				$('h2', this.context).html((new Date(this.displayedYear, this.displayedMonth, 1)).asString($.dpText.HEADER_FORMAT));
				
				// render the calendar...
				$('.dp-calendar', this.context).renderCalendar(
					$.extend(
						{},
						this.settings, 
						{
							month			: this.displayedMonth,
							year			: this.displayedYear,
							renderCallback	: this.cellRender,
							dpController	: this,
							hoverClass		: this.hoverClass
						})
				);
				
				// update the status of the control buttons and disable dates before startDate or after endDate...
				// TODO: When should the year buttons be disabled? When you can't go forward a whole year from where you are or is that annoying?
				if (this.displayedYear == this.startDate.getFullYear() && this.displayedMonth == this.startDate.getMonth()) {
					$('.dp-nav-prev-year', this.context).addClass('disabled');
					$('.dp-nav-prev-month', this.context).addClass('disabled');
					$('.dp-calendar td.other-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) > 20) {
								$this.addClass('disabled');
							}
						}
					);
					var d = this.startDate.getDate();
					$('.dp-calendar td.current-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) < d) {
								$this.addClass('disabled');
							}
						}
					);
				} else {
					$('.dp-nav-prev-year', this.context).removeClass('disabled');
					$('.dp-nav-prev-month', this.context).removeClass('disabled');
					var d = this.startDate.getDate();
					if (d > 20) {
						// check if the startDate is last month as we might need to add some disabled classes...
						var st = this.startDate.getTime();
						var sd = new Date(st);
						sd.addMonths(1);
						if (this.displayedYear == sd.getFullYear() && this.displayedMonth == sd.getMonth()) {
							$('.dp-calendar td.other-month', this.context).each(
								function()
								{
									var $this = $(this);
									if (Date.fromString($this.data('datePickerDate')).getTime() < st) {
										$this.addClass('disabled');
									}
								}
							);
						}
					}
				}
				if (this.displayedYear == this.endDate.getFullYear() && this.displayedMonth == this.endDate.getMonth()) {
					$('.dp-nav-next-year', this.context).addClass('disabled');
					$('.dp-nav-next-month', this.context).addClass('disabled');
					$('.dp-calendar td.other-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) < 14) {
								$this.addClass('disabled');
							}
						}
					);
					var d = this.endDate.getDate();
					$('.dp-calendar td.current-month', this.context).each(
						function()
						{
							var $this = $(this);
							if (Number($this.text()) > d) {
								$this.addClass('disabled');
							}
						}
					);
				} else {
					$('.dp-nav-next-year', this.context).removeClass('disabled');
					$('.dp-nav-next-month', this.context).removeClass('disabled');
					var d = this.endDate.getDate();
					if (d < 13) {
						// check if the endDate is next month as we might need to add some disabled classes...
						var ed = new Date(this.endDate.getTime());
						ed.addMonths(-1);
						if (this.displayedYear == ed.getFullYear() && this.displayedMonth == ed.getMonth()) {
							$('.dp-calendar td.other-month', this.context).each(
								function()
								{
									var $this = $(this);
									var cellDay = Number($this.text());
									if (cellDay < 13 && cellDay > d) {
										$this.addClass('disabled');
									}
								}
							);
						}
					}
				}
				this._applyRenderCallbacks();
			},
			_closeCalendar : function(programatic, ele)
			{
				if (!ele || ele == this.ele)
				{
					$(document).unbind('mousedown.datepicker');
					$(document).unbind('keydown.datepicker');
					this._clearCalendar();
					$('#dp-popup a').unbind();
					$('#dp-popup').empty().remove();
					if (!programatic) {
						$(this.ele).trigger('dpClosed', [this.getSelected()]);
					}
				}
			},
			// empties the current dp-calendar div and makes sure that all events are unbound
			// and expandos removed to avoid memory leaks...
			_clearCalendar : function()
			{
				// TODO.
				$('.dp-calendar td', this.context).unbind();
				$('.dp-calendar', this.context).empty();
			}
		}
	);
	
	// static constants
	$.dpConst = {
		SHOW_HEADER_NONE	:	0,
		SHOW_HEADER_SHORT	:	1,
		SHOW_HEADER_LONG	:	2,
		POS_TOP				:	0,
		POS_BOTTOM			:	1,
		POS_LEFT			:	0,
		POS_RIGHT			:	1,
		DP_INTERNAL_FOCUS	:	'dpInternalFocusTrigger'
	};
	// localisable text
	$.dpText = {
		TEXT_PREV_YEAR		:	'Previous year',
		TEXT_PREV_MONTH		:	'Previous month',
		TEXT_NEXT_YEAR		:	'Next year',
		TEXT_NEXT_MONTH		:	'Next month',
		TEXT_CLOSE			:	'Close',
		TEXT_CHOOSE_DATE	:	'Choose date',
		HEADER_FORMAT		:	'mmmm yyyy'
	};
	// version
	$.dpVersion = '$Id: jquery.datePicker.js 103 2010-09-22 08:54:28Z kelvin.luck $';

	$.fn.datePicker.defaults = {
		month				: undefined,
		year				: undefined,
		showHeader			: $.dpConst.SHOW_HEADER_SHORT,
		startDate			: undefined,
		endDate				: undefined,
		inline				: false,
		renderCallback		: null,
		createButton		: true,
		showYearNavigation	: true,
		closeOnSelect		: true,
		displayClose		: false,
		selectMultiple		: false,
		numSelectable		: Number.MAX_VALUE,
		clickInput			: false,
		rememberViewedMonth	: true,
		selectWeek			: false,
		verticalPosition	: $.dpConst.POS_TOP,
		horizontalPosition	: $.dpConst.POS_LEFT,
		verticalOffset		: 0,
		horizontalOffset	: 0,
		hoverClass			: 'dp-hover',
		autoFocusNextInput  : false
	};

	function _getController(ele)
	{
		if (ele._dpId) return $.event._dpCache[ele._dpId];
		return false;
	};
	
	// make it so that no error is thrown if bgIframe plugin isn't included (allows you to use conditional
	// comments to only include bgIframe where it is needed in IE without breaking this plugin).
	if ($.fn.bgIframe == undefined) {
		$.fn.bgIframe = function() {return this; };
	};


	// clean-up
	$(window)
		.bind('unload', function() {
			var els = $.event._dpCache || [];
			for (var i in els) {
				$(els[i].ele)._dpDestroy();
			}
		});
		
	
})(jQuery);


/* FILE /javascript/jquery.datePicker.min.js, Checksum 2fa81991abfc82647e68a16472c59f82faf1ccabd1def7543a83278d08ece6ac */
/**
 * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * .
 * $Id: jquery.datePicker.js 103 2010-09-22 08:54:28Z kelvin.luck $
 **/

(function(a){function d(b){if(b._dpId)return a.event._dpCache[b._dpId];return false}function c(a){this.ele=a;this.displayedMonth=null;this.displayedYear=null;this.startDate=null;this.endDate=null;this.showYearNavigation=null;this.closeOnSelect=null;this.displayClose=null;this.rememberViewedMonth=null;this.selectMultiple=null;this.numSelectable=null;this.numSelected=null;this.verticalPosition=null;this.horizontalPosition=null;this.verticalOffset=null;this.horizontalOffset=null;this.button=null;this.renderCallback=[];this.selectedDates={};this.inline=null;this.context="#dp-popup";this.settings={}}a.fn.extend({renderCalendar:function(b){var c=function(a){return document.createElement(a)};b=a.extend({},a.fn.datePicker.defaults,b);if(b.showHeader!=a.dpConst.SHOW_HEADER_NONE){var d=a(c("tr"));for(var e=Date.firstDayOfWeek;e<Date.firstDayOfWeek+7;e++){var f=e%7;var g=Date.dayNames[f];d.append(jQuery(c("th")).attr({scope:"col",abbr:g,title:g,"class":f==0||f==6?"weekend":"weekday"}).html(b.showHeader==a.dpConst.SHOW_HEADER_SHORT?g.substr(0,1):g))}}var h=a(c("table")).attr({cellspacing:2}).addClass("jCalendar").append(b.showHeader!=a.dpConst.SHOW_HEADER_NONE?a(c("thead")).append(d):c("thead"));var i=a(c("tbody"));var j=(new Date).zeroTime();j.setHours(12);var k=b.month==undefined?j.getMonth():b.month;var l=b.year||j.getFullYear();var m=new Date(l,k,1,12,0,0);var n=Date.firstDayOfWeek-m.getDay()+1;if(n>1)n-=7;var o=Math.ceil((-1*n+1+m.getDaysInMonth())/7);m.addDays(n-1);var p=function(c){return function(){if(b.hoverClass){var d=a(this);if(!b.selectWeek){d.addClass(b.hoverClass)}else if(c&&!d.is(".disabled")){d.parent().addClass("activeWeekHover")}}}};var q=function(){if(b.hoverClass){var c=a(this);c.removeClass(b.hoverClass);c.parent().removeClass("activeWeekHover")}};var r=0;while(r++<o){var s=jQuery(c("tr"));var t=b.dpController?m>b.dpController.startDate:false;for(var e=0;e<7;e++){var u=m.getMonth()==k;var v=a(c("td")).text(m.getDate()+"").addClass((u?"current-month ":"other-month ")+(m.isWeekend()?"weekend ":"weekday ")+(u&&m.getTime()==j.getTime()?"today ":"")).data("datePickerDate",m.asString()).hover(p(t),q);s.append(v);if(b.renderCallback){b.renderCallback(v,m,k,l)}m=new Date(m.getFullYear(),m.getMonth(),m.getDate()+1,12,0,0)}i.append(s)}h.append(i);return this.each(function(){a(this).empty().append(h)})},datePicker:function(b){if(!a.event._dpCache)a.event._dpCache=[];b=a.extend({},a.fn.datePicker.defaults,b);return this.each(function(){var d=a(this);var e=true;if(!this._dpId){this._dpId=a.event.guid++;a.event._dpCache[this._dpId]=new c(this);e=false}if(b.inline){b.createButton=false;b.displayClose=false;b.closeOnSelect=false;d.empty()}var f=a.event._dpCache[this._dpId];f.init(b);if(!e&&b.createButton){f.button=a('<a href="#" class="dp-choose-date" title="'+a.dpText.TEXT_CHOOSE_DATE+'">'+a.dpText.TEXT_CHOOSE_DATE+"</a>").bind("click",function(){d.dpDisplay(this);this.blur();return false});d.after(f.button)}if(!e&&d.is(":text")){d.bind("dateSelected",function(a,b,c){this.value=b.asString()}).bind("change",function(){if(this.value==""){f.clearSelected()}else{var a=Date.fromString(this.value);if(a){f.setSelected(a,true,true)}}});if(b.clickInput){d.bind("click",function(){d.trigger("change");d.dpDisplay()})}var g=Date.fromString(this.value);if(this.value!=""&&g){f.setSelected(g,true,true)}}d.addClass("dp-applied")})},dpSetDisabled:function(a){return b.call(this,"setDisabled",a)},dpSetStartDate:function(a){return b.call(this,"setStartDate",a)},dpSetEndDate:function(a){return b.call(this,"setEndDate",a)},dpGetSelected:function(){var a=d(this[0]);if(a){return a.getSelected()}return null},dpSetSelected:function(a,c,d,e){if(c==undefined)c=true;if(d==undefined)d=true;if(e==undefined)e=true;return b.call(this,"setSelected",Date.fromString(a),c,d,e)},dpSetDisplayedMonth:function(a,c){return b.call(this,"setDisplayedMonth",Number(a),Number(c),true)},dpDisplay:function(a){return b.call(this,"display",a)},dpSetRenderCallback:function(a){return b.call(this,"setRenderCallback",a)},dpSetPosition:function(a,c){return b.call(this,"setPosition",a,c)},dpSetOffset:function(a,c){return b.call(this,"setOffset",a,c)},dpClose:function(){return b.call(this,"_closeCalendar",false,this[0])},dpRerenderCalendar:function(){return b.call(this,"_rerenderCalendar")},_dpDestroy:function(){}});var b=function(a,b,c,e,f){return this.each(function(){var g=d(this);if(g){g[a](b,c,e,f)}})};a.extend(c.prototype,{init:function(a){this.setStartDate(a.startDate);this.setEndDate(a.endDate);this.setDisplayedMonth(Number(a.month),Number(a.year));this.setRenderCallback(a.renderCallback);this.showYearNavigation=a.showYearNavigation;this.closeOnSelect=a.closeOnSelect;this.displayClose=a.displayClose;this.rememberViewedMonth=a.rememberViewedMonth;this.selectMultiple=a.selectMultiple;this.numSelectable=a.selectMultiple?a.numSelectable:1;this.numSelected=0;this.verticalPosition=a.verticalPosition;this.horizontalPosition=a.horizontalPosition;this.hoverClass=a.hoverClass;this.setOffset(a.verticalOffset,a.horizontalOffset);this.inline=a.inline;this.settings=a;if(this.inline){this.context=this.ele;this.display()}},setStartDate:function(a){if(a){if(a instanceof Date){this.startDate=a}else{this.startDate=Date.fromString(a)}}if(!this.startDate){this.startDate=(new Date).zeroTime()}this.setDisplayedMonth(this.displayedMonth,this.displayedYear)},setEndDate:function(a){if(a){if(a instanceof Date){this.endDate=a}else{this.endDate=Date.fromString(a)}}if(!this.endDate){this.endDate=new Date("12/31/2999")}if(this.endDate.getTime()<this.startDate.getTime()){this.endDate=this.startDate}this.setDisplayedMonth(this.displayedMonth,this.displayedYear)},setPosition:function(a,b){this.verticalPosition=a;this.horizontalPosition=b},setOffset:function(a,b){this.verticalOffset=parseInt(a)||0;this.horizontalOffset=parseInt(b)||0},setDisabled:function(b){$e=a(this.ele);$e[b?"addClass":"removeClass"]("dp-disabled");if(this.button){$but=a(this.button);$but[b?"addClass":"removeClass"]("dp-disabled");$but.attr("title",b?"":a.dpText.TEXT_CHOOSE_DATE)}if($e.is(":text")){$e.attr("disabled",b?"disabled":"")}},setDisplayedMonth:function(b,c,d){if(this.startDate==undefined||this.endDate==undefined){return}var e=new Date(this.startDate.getTime());e.setDate(1);var f=new Date(this.endDate.getTime());f.setDate(1);var g;if(!b&&!c||isNaN(b)&&isNaN(c)){g=(new Date).zeroTime();g.setDate(1)}else if(isNaN(b)){g=new Date(c,this.displayedMonth,1)}else if(isNaN(c)){g=new Date(this.displayedYear,b,1)}else{g=new Date(c,b,1)}if(g.getTime()<e.getTime()){g=e}else if(g.getTime()>f.getTime()){g=f}var h=this.displayedMonth;var i=this.displayedYear;this.displayedMonth=g.getMonth();this.displayedYear=g.getFullYear();if(d&&(this.displayedMonth!=h||this.displayedYear!=i)){this._rerenderCalendar();a(this.ele).trigger("dpMonthChanged",[this.displayedMonth,this.displayedYear])}},setSelected:function(b,c,d,e){if(b<this.startDate||b.zeroTime()>this.endDate.zeroTime()){return}var f=this.settings;if(f.selectWeek){b=b.addDays(-(b.getDay()-Date.firstDayOfWeek+7)%7);if(b<this.startDate){return}}if(c==this.isSelected(b)){return}if(this.selectMultiple==false){this.clearSelected()}else if(c&&this.numSelected==this.numSelectable){return}if(d&&(this.displayedMonth!=b.getMonth()||this.displayedYear!=b.getFullYear())){this.setDisplayedMonth(b.getMonth(),b.getFullYear(),true)}this.selectedDates[b.asString()]=c;this.numSelected+=c?1:-1;var g="td."+(b.getMonth()==this.displayedMonth?"current-month":"other-month");var h;a(g,this.context).each(function(){if(a(this).data("datePickerDate")==b.asString()){h=a(this);if(f.selectWeek){h.parent()[c?"addClass":"removeClass"]("selectedWeek")}h[c?"addClass":"removeClass"]("selected")}});a("td",this.context).not(".selected")[this.selectMultiple&&this.numSelected==this.numSelectable?"addClass":"removeClass"]("unselectable");if(e){var f=this.isSelected(b);$e=a(this.ele);var i=Date.fromString(b.asString());$e.trigger("dateSelected",[i,h,f]);$e.trigger("change")}},isSelected:function(a){return this.selectedDates[a.asString()]},getSelected:function(){var a=[];for(var b in this.selectedDates){if(this.selectedDates[b]==true){a.push(Date.fromString(b))}}return a},clearSelected:function(){this.selectedDates={};this.numSelected=0;a("td.selected",this.context).removeClass("selected").parent().removeClass("selectedWeek")},display:function(b){if(a(this.ele).is(".dp-disabled"))return;b=b||this.ele;var c=this;var d=a(b);var e=d.offset();var f;var g;var h;var i;if(c.inline){f=a(this.ele);g={id:"calendar-"+this.ele._dpId,"class":"dp-popup dp-popup-inline"};a(".dp-popup",f).remove();i={}}else{f=a("body");g={id:"dp-popup","class":"dp-popup"};i={top:e.top+c.verticalOffset,left:e.left+c.horizontalOffset};var j=function(b){var d=b.target;var e=a("#dp-popup")[0];while(true){if(d==e){return true}else if(d==document){c._closeCalendar();return false}else{d=a(d).parent()[0]}}};this._checkMouse=j;c._closeCalendar(true);a(document).bind("keydown.datepicker",function(a){if(a.keyCode==27){c._closeCalendar()}})}if(!c.rememberViewedMonth){var k=this.getSelected()[0];if(k){k=new Date(k);this.setDisplayedMonth(k.getMonth(),k.getFullYear(),false)}}f.append(a("<div></div>").attr(g).css(i).append(a("<h2></h2>"),a('<div class="dp-nav-prev"></div>').append(a('<a class="dp-nav-prev-year" href="#" title="'+a.dpText.TEXT_PREV_YEAR+'"><<</a>').bind("click",function(){return c._displayNewMonth.call(c,this,0,-1)}),a('<a class="dp-nav-prev-month" href="#" title="'+a.dpText.TEXT_PREV_MONTH+'"><</a>').bind("click",function(){return c._displayNewMonth.call(c,this,-1,0)})),a('<div class="dp-nav-next"></div>').append(a('<a class="dp-nav-next-year" href="#" title="'+a.dpText.TEXT_NEXT_YEAR+'">>></a>').bind("click",function(){return c._displayNewMonth.call(c,this,0,1)}),a('<a class="dp-nav-next-month" href="#" title="'+a.dpText.TEXT_NEXT_MONTH+'">></a>').bind("click",function(){return c._displayNewMonth.call(c,this,1,0)})),a('<div class="dp-calendar"></div>')).bgIframe());var l=this.inline?a(".dp-popup",this.context):a("#dp-popup");if(this.showYearNavigation==false){a(".dp-nav-prev-year, .dp-nav-next-year",c.context).css("display","none")}if(this.displayClose){l.append(a('<a href="#" id="dp-close">'+a.dpText.TEXT_CLOSE+"</a>").bind("click",function(){c._closeCalendar();return false}))}c._renderCalendar();a(this.ele).trigger("dpDisplayed",l);if(!c.inline){if(this.verticalPosition==a.dpConst.POS_BOTTOM){l.css("top",e.top+d.height()-l.height()+c.verticalOffset)}if(this.horizontalPosition==a.dpConst.POS_RIGHT){l.css("left",e.left+d.width()-l.width()+c.horizontalOffset)}a(document).bind("mousedown.datepicker",this._checkMouse)}},setRenderCallback:function(a){if(a==null)return;if(a&&typeof a=="function"){a=[a]}this.renderCallback=this.renderCallback.concat(a)},cellRender:function(b,c,d,e){var f=this.dpController;var g=new Date(c.getTime());b.bind("click",function(){var b=a(this);if(!b.is(".disabled")){f.setSelected(g,!b.is(".selected")||!f.selectMultiple,false,true);if(f.closeOnSelect){if(f.settings.autoFocusNextInput){var c=f.ele;var d=false;a(":input",c.form).each(function(){if(d){a(this).focus();return false}if(this==c){d=true}})}else{f.ele.focus()}f._closeCalendar()}}});if(f.isSelected(g)){b.addClass("selected");if(f.settings.selectWeek){b.parent().addClass("selectedWeek")}}else if(f.selectMultiple&&f.numSelected==f.numSelectable){b.addClass("unselectable")}},_applyRenderCallbacks:function(){var b=this;a("td",this.context).each(function(){for(var c=0;c<b.renderCallback.length;c++){$td=a(this);b.renderCallback[c].apply(this,[$td,Date.fromString($td.data("datePickerDate")),b.displayedMonth,b.displayedYear])}});return},_displayNewMonth:function(b,c,d){if(!a(b).is(".disabled")){this.setDisplayedMonth(this.displayedMonth+c,this.displayedYear+d,true)}b.blur();return false},_rerenderCalendar:function(){this._clearCalendar();this._renderCalendar()},_renderCalendar:function(){a("h2",this.context).html((new Date(this.displayedYear,this.displayedMonth,1)).asString(a.dpText.HEADER_FORMAT));a(".dp-calendar",this.context).renderCalendar(a.extend({},this.settings,{month:this.displayedMonth,year:this.displayedYear,renderCallback:this.cellRender,dpController:this,hoverClass:this.hoverClass}));if(this.displayedYear==this.startDate.getFullYear()&&this.displayedMonth==this.startDate.getMonth()){a(".dp-nav-prev-year",this.context).addClass("disabled");a(".dp-nav-prev-month",this.context).addClass("disabled");a(".dp-calendar td.other-month",this.context).each(function(){var b=a(this);if(Number(b.text())>20){b.addClass("disabled")}});var b=this.startDate.getDate();a(".dp-calendar td.current-month",this.context).each(function(){var c=a(this);if(Number(c.text())<b){c.addClass("disabled")}})}else{a(".dp-nav-prev-year",this.context).removeClass("disabled");a(".dp-nav-prev-month",this.context).removeClass("disabled");var b=this.startDate.getDate();if(b>20){var c=this.startDate.getTime();var d=new Date(c);d.addMonths(1);if(this.displayedYear==d.getFullYear()&&this.displayedMonth==d.getMonth()){a(".dp-calendar td.other-month",this.context).each(function(){var b=a(this);if(Date.fromString(b.data("datePickerDate")).getTime()<c){b.addClass("disabled")}})}}}if(this.displayedYear==this.endDate.getFullYear()&&this.displayedMonth==this.endDate.getMonth()){a(".dp-nav-next-year",this.context).addClass("disabled");a(".dp-nav-next-month",this.context).addClass("disabled");a(".dp-calendar td.other-month",this.context).each(function(){var b=a(this);if(Number(b.text())<14){b.addClass("disabled")}});var b=this.endDate.getDate();a(".dp-calendar td.current-month",this.context).each(function(){var c=a(this);if(Number(c.text())>b){c.addClass("disabled")}})}else{a(".dp-nav-next-year",this.context).removeClass("disabled");a(".dp-nav-next-month",this.context).removeClass("disabled");var b=this.endDate.getDate();if(b<13){var e=new Date(this.endDate.getTime());e.addMonths(-1);if(this.displayedYear==e.getFullYear()&&this.displayedMonth==e.getMonth()){a(".dp-calendar td.other-month",this.context).each(function(){var c=a(this);var d=Number(c.text());if(d<13&&d>b){c.addClass("disabled")}})}}}this._applyRenderCallbacks()},_closeCalendar:function(b,c){if(!c||c==this.ele){a(document).unbind("mousedown.datepicker");a(document).unbind("keydown.datepicker");this._clearCalendar();a("#dp-popup a").unbind();a("#dp-popup").empty().remove();if(!b){a(this.ele).trigger("dpClosed",[this.getSelected()])}}},_clearCalendar:function(){a(".dp-calendar td",this.context).unbind();a(".dp-calendar",this.context).empty()}});a.dpConst={SHOW_HEADER_NONE:0,SHOW_HEADER_SHORT:1,SHOW_HEADER_LONG:2,POS_TOP:0,POS_BOTTOM:1,POS_LEFT:0,POS_RIGHT:1,DP_INTERNAL_FOCUS:"dpInternalFocusTrigger"};a.dpText={TEXT_PREV_YEAR:"Previous year",TEXT_PREV_MONTH:"Previous month",TEXT_NEXT_YEAR:"Next year",TEXT_NEXT_MONTH:"Next month",TEXT_CLOSE:"Close",TEXT_CHOOSE_DATE:"Choose date",HEADER_FORMAT:"mmmm yyyy"};a.dpVersion="$Id: jquery.datePicker.js 103 2010-09-22 08:54:28Z kelvin.luck $";a.fn.datePicker.defaults={month:undefined,year:undefined,showHeader:a.dpConst.SHOW_HEADER_SHORT,startDate:undefined,endDate:undefined,inline:false,renderCallback:null,createButton:true,showYearNavigation:true,closeOnSelect:true,displayClose:false,selectMultiple:false,numSelectable:Number.MAX_VALUE,clickInput:false,rememberViewedMonth:true,selectWeek:false,verticalPosition:a.dpConst.POS_TOP,horizontalPosition:a.dpConst.POS_LEFT,verticalOffset:0,horizontalOffset:0,hoverClass:"dp-hover",autoFocusNextInput:false};if(a.fn.bgIframe==undefined){a.fn.bgIframe=function(){return this}}a(window).bind("unload",function(){var b=a.event._dpCache||[];for(var c in b){a(b[c].ele)._dpDestroy()}})})(jQuery)

/* FILE /javascript/jquery.fancybox-1.3.4.pack.js, Checksum d84bac3710c2842dc8d5d5ae6e324007443cbd8ae26b909dd89bc2bdc31c8561 */
/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 * 
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 * 
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

;(function(b){var m,t,u,f,D,j,E,n,z,A,q=0,e={},o=[],p=0,d={},l=[],G=null,v=new Image,J=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,W=/[^\.]\.(swf)\s*$/i,K,L=1,y=0,s="",r,i,h=false,B=b.extend(b("<div/>")[0],{prop:0}),M=b.browser.msie&&b.browser.version<7&&!window.XMLHttpRequest,N=function(){t.hide();v.onerror=v.onload=null;G&&G.abort();m.empty()},O=function(){if(false===e.onError(o,q,e)){t.hide();h=false}else{e.titleShow=false;e.width="auto";e.height="auto";m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
F()}},I=function(){var a=o[q],c,g,k,C,P,w;N();e=b.extend({},b.fn.fancybox.defaults,typeof b(a).data("fancybox")=="undefined"?e:b(a).data("fancybox"));w=e.onStart(o,q,e);if(w===false)h=false;else{if(typeof w=="object")e=b.extend(e,w);k=e.title||(a.nodeName?b(a).attr("title"):a.title)||"";if(a.nodeName&&!e.orig)e.orig=b(a).children("img:first").length?b(a).children("img:first"):b(a);if(k===""&&e.orig&&e.titleFromAlt)k=e.orig.attr("alt");c=e.href||(a.nodeName?b(a).attr("href"):a.href)||null;if(/^(?:javascript)/i.test(c)||
c=="#")c=null;if(e.type){g=e.type;if(!c)c=e.content}else if(e.content)g="html";else if(c)g=c.match(J)?"image":c.match(W)?"swf":b(a).hasClass("iframe")?"iframe":c.indexOf("#")===0?"inline":"ajax";if(g){if(g=="inline"){a=c.substr(c.indexOf("#"));g=b(a).length>0?"inline":"ajax"}e.type=g;e.href=c;e.title=k;if(e.autoDimensions)if(e.type=="html"||e.type=="inline"||e.type=="ajax"){e.width="auto";e.height="auto"}else e.autoDimensions=false;if(e.modal){e.overlayShow=true;e.hideOnOverlayClick=false;e.hideOnContentClick=
false;e.enableEscapeButton=false;e.showCloseButton=false}e.padding=parseInt(e.padding,10);e.margin=parseInt(e.margin,10);m.css("padding",e.padding+e.margin);b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){b(this).replaceWith(j.children())});switch(g){case "html":m.html(e.content);F();break;case "inline":if(b(a).parent().is("#fancybox-content")===true){h=false;break}b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup",function(){b(this).replaceWith(j.children())}).bind("fancybox-cancel",
function(){b(this).replaceWith(m.children())});b(a).appendTo(m);F();break;case "image":h=false;b.fancybox.showActivity();v=new Image;v.onerror=function(){O()};v.onload=function(){h=true;v.onerror=v.onload=null;e.width=v.width;e.height=v.height;b("<img />").attr({id:"fancybox-img",src:v.src,alt:e.title}).appendTo(m);Q()};v.src=c;break;case "swf":e.scrolling="no";C='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+e.width+'" height="'+e.height+'"><param name="movie" value="'+c+
'"></param>';P="";b.each(e.swf,function(x,H){C+='<param name="'+x+'" value="'+H+'"></param>';P+=" "+x+'="'+H+'"'});C+='<embed src="'+c+'" type="application/x-shockwave-flash" width="'+e.width+'" height="'+e.height+'"'+P+"></embed></object>";m.html(C);F();break;case "ajax":h=false;b.fancybox.showActivity();e.ajax.win=e.ajax.success;G=b.ajax(b.extend({},e.ajax,{url:c,data:e.ajax.data||{},error:function(x){x.status>0&&O()},success:function(x,H,R){if((typeof R=="object"?R:G).status==200){if(typeof e.ajax.win==
"function"){w=e.ajax.win(c,x,H,R);if(w===false){t.hide();return}else if(typeof w=="string"||typeof w=="object")x=w}m.html(x);F()}}}));break;case "iframe":Q()}}else O()}},F=function(){var a=e.width,c=e.height;a=a.toString().indexOf("%")>-1?parseInt((b(window).width()-e.margin*2)*parseFloat(a)/100,10)+"px":a=="auto"?"auto":a+"px";c=c.toString().indexOf("%")>-1?parseInt((b(window).height()-e.margin*2)*parseFloat(c)/100,10)+"px":c=="auto"?"auto":c+"px";m.wrapInner('<div style="width:'+a+";height:"+c+
";overflow: "+(e.scrolling=="auto"?"auto":e.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');e.width=m.width();e.height=m.height();Q()},Q=function(){var a,c;t.hide();if(f.is(":visible")&&false===d.onCleanup(l,p,d)){b.event.trigger("fancybox-cancel");h=false}else{h=true;b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");f.is(":visible")&&d.titlePosition!=="outside"&&f.css("height",f.height());l=o;p=q;d=e;if(d.overlayShow){u.css({"background-color":d.overlayColor,
opacity:d.overlayOpacity,cursor:d.hideOnOverlayClick?"pointer":"auto",height:b(document).height()});if(!u.is(":visible")){M&&b("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"});u.show()}}else u.hide();i=X();s=d.title||"";y=0;n.empty().removeAttr("style").removeClass();if(d.titleShow!==false){if(b.isFunction(d.titleFormat))a=d.titleFormat(s,l,p,d);else a=s&&s.length?
d.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+s+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+d.titlePosition+'">'+s+"</div>":false;s=a;if(!(!s||s==="")){n.addClass("fancybox-title-"+d.titlePosition).html(s).appendTo("body").show();switch(d.titlePosition){case "inside":n.css({width:i.width-d.padding*2,marginLeft:d.padding,marginRight:d.padding});
y=n.outerHeight(true);n.appendTo(D);i.height+=y;break;case "over":n.css({marginLeft:d.padding,width:i.width-d.padding*2,bottom:d.padding}).appendTo(D);break;case "float":n.css("left",parseInt((n.width()-i.width-40)/2,10)*-1).appendTo(f);break;default:n.css({width:i.width-d.padding*2,paddingLeft:d.padding,paddingRight:d.padding}).appendTo(f)}}}n.hide();if(f.is(":visible")){b(E.add(z).add(A)).hide();a=f.position();r={top:a.top,left:a.left,width:f.width(),height:f.height()};c=r.width==i.width&&r.height==
i.height;j.fadeTo(d.changeFade,0.3,function(){var g=function(){j.html(m.contents()).fadeTo(d.changeFade,1,S)};b.event.trigger("fancybox-change");j.empty().removeAttr("filter").css({"border-width":d.padding,width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2});if(c)g();else{B.prop=0;b(B).animate({prop:1},{duration:d.changeSpeed,easing:d.easingChange,step:T,complete:g})}})}else{f.removeAttr("style");j.css("border-width",d.padding);if(d.transitionIn=="elastic"){r=V();j.html(m.contents());
f.show();if(d.opacity)i.opacity=0;B.prop=0;b(B).animate({prop:1},{duration:d.speedIn,easing:d.easingIn,step:T,complete:S})}else{d.titlePosition=="inside"&&y>0&&n.show();j.css({width:i.width-d.padding*2,height:e.autoDimensions?"auto":i.height-y-d.padding*2}).html(m.contents());f.css(i).fadeIn(d.transitionIn=="none"?0:d.speedIn,S)}}}},Y=function(){if(d.enableEscapeButton||d.enableKeyboardNav)b(document).bind("keydown.fb",function(a){if(a.keyCode==27&&d.enableEscapeButton){a.preventDefault();b.fancybox.close()}else if((a.keyCode==
37||a.keyCode==39)&&d.enableKeyboardNav&&a.target.tagName!=="INPUT"&&a.target.tagName!=="TEXTAREA"&&a.target.tagName!=="SELECT"){a.preventDefault();b.fancybox[a.keyCode==37?"prev":"next"]()}});if(d.showNavArrows){if(d.cyclic&&l.length>1||p!==0)z.show();if(d.cyclic&&l.length>1||p!=l.length-1)A.show()}else{z.hide();A.hide()}},S=function(){if(!b.support.opacity){j.get(0).style.removeAttribute("filter");f.get(0).style.removeAttribute("filter")}e.autoDimensions&&j.css("height","auto");f.css("height","auto");
s&&s.length&&n.show();d.showCloseButton&&E.show();Y();d.hideOnContentClick&&j.bind("click",b.fancybox.close);d.hideOnOverlayClick&&u.bind("click",b.fancybox.close);b(window).bind("resize.fb",b.fancybox.resize);d.centerOnScroll&&b(window).bind("scroll.fb",b.fancybox.center);if(d.type=="iframe")b('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(b.browser.msie?'allowtransparency="true""':"")+' scrolling="'+e.scrolling+'" src="'+d.href+'"></iframe>').appendTo(j);
f.show();h=false;b.fancybox.center();d.onComplete(l,p,d);var a,c;if(l.length-1>p){a=l[p+1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}if(p>0){a=l[p-1].href;if(typeof a!=="undefined"&&a.match(J)){c=new Image;c.src=a}}},T=function(a){var c={width:parseInt(r.width+(i.width-r.width)*a,10),height:parseInt(r.height+(i.height-r.height)*a,10),top:parseInt(r.top+(i.top-r.top)*a,10),left:parseInt(r.left+(i.left-r.left)*a,10)};if(typeof i.opacity!=="undefined")c.opacity=a<0.5?0.5:a;f.css(c);
j.css({width:c.width-d.padding*2,height:c.height-y*a-d.padding*2})},U=function(){return[b(window).width()-d.margin*2,b(window).height()-d.margin*2,b(document).scrollLeft()+d.margin,b(document).scrollTop()+d.margin]},X=function(){var a=U(),c={},g=d.autoScale,k=d.padding*2;c.width=d.width.toString().indexOf("%")>-1?parseInt(a[0]*parseFloat(d.width)/100,10):d.width+k;c.height=d.height.toString().indexOf("%")>-1?parseInt(a[1]*parseFloat(d.height)/100,10):d.height+k;if(g&&(c.width>a[0]||c.height>a[1]))if(e.type==
"image"||e.type=="swf"){g=d.width/d.height;if(c.width>a[0]){c.width=a[0];c.height=parseInt((c.width-k)/g+k,10)}if(c.height>a[1]){c.height=a[1];c.width=parseInt((c.height-k)*g+k,10)}}else{c.width=Math.min(c.width,a[0]);c.height=Math.min(c.height,a[1])}c.top=parseInt(Math.max(a[3]-20,a[3]+(a[1]-c.height-40)*0.5),10);c.left=parseInt(Math.max(a[2]-20,a[2]+(a[0]-c.width-40)*0.5),10);return c},V=function(){var a=e.orig?b(e.orig):false,c={};if(a&&a.length){c=a.offset();c.top+=parseInt(a.css("paddingTop"),
10)||0;c.left+=parseInt(a.css("paddingLeft"),10)||0;c.top+=parseInt(a.css("border-top-width"),10)||0;c.left+=parseInt(a.css("border-left-width"),10)||0;c.width=a.width();c.height=a.height();c={width:c.width+d.padding*2,height:c.height+d.padding*2,top:c.top-d.padding-20,left:c.left-d.padding-20}}else{a=U();c={width:d.padding*2,height:d.padding*2,top:parseInt(a[3]+a[1]*0.5,10),left:parseInt(a[2]+a[0]*0.5,10)}}return c},Z=function(){if(t.is(":visible")){b("div",t).css("top",L*-40+"px");L=(L+1)%12}else clearInterval(K)};
b.fn.fancybox=function(a){if(!b(this).length)return this;b(this).data("fancybox",b.extend({},a,b.metadata?b(this).metadata():{})).unbind("click.fb").bind("click.fb",function(c){c.preventDefault();if(!h){h=true;b(this).blur();o=[];q=0;c=b(this).attr("rel")||"";if(!c||c==""||c==="nofollow")o.push(this);else{o=b("a[rel="+c+"], area[rel="+c+"]");q=o.index(this)}I()}});return this};b.fancybox=function(a,c){var g;if(!h){h=true;g=typeof c!=="undefined"?c:{};o=[];q=parseInt(g.index,10)||0;if(b.isArray(a)){for(var k=
0,C=a.length;k<C;k++)if(typeof a[k]=="object")b(a[k]).data("fancybox",b.extend({},g,a[k]));else a[k]=b({}).data("fancybox",b.extend({content:a[k]},g));o=jQuery.merge(o,a)}else{if(typeof a=="object")b(a).data("fancybox",b.extend({},g,a));else a=b({}).data("fancybox",b.extend({content:a},g));o.push(a)}if(q>o.length||q<0)q=0;I()}};b.fancybox.showActivity=function(){clearInterval(K);t.show();K=setInterval(Z,66)};b.fancybox.hideActivity=function(){t.hide()};b.fancybox.next=function(){return b.fancybox.pos(p+
1)};b.fancybox.prev=function(){return b.fancybox.pos(p-1)};b.fancybox.pos=function(a){if(!h){a=parseInt(a);o=l;if(a>-1&&a<l.length){q=a;I()}else if(d.cyclic&&l.length>1){q=a>=l.length?0:l.length-1;I()}}};b.fancybox.cancel=function(){if(!h){h=true;b.event.trigger("fancybox-cancel");N();e.onCancel(o,q,e);h=false}};b.fancybox.close=function(){function a(){u.fadeOut("fast");n.empty().hide();f.hide();b.event.trigger("fancybox-cleanup");j.empty();d.onClosed(l,p,d);l=e=[];p=q=0;d=e={};h=false}if(!(h||f.is(":hidden"))){h=
true;if(d&&false===d.onCleanup(l,p,d))h=false;else{N();b(E.add(z).add(A)).hide();b(j.add(u)).unbind();b(window).unbind("resize.fb scroll.fb");b(document).unbind("keydown.fb");j.find("iframe").attr("src",M&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");d.titlePosition!=="inside"&&n.empty();f.stop();if(d.transitionOut=="elastic"){r=V();var c=f.position();i={top:c.top,left:c.left,width:f.width(),height:f.height()};if(d.opacity)i.opacity=1;n.empty().hide();B.prop=1;
b(B).animate({prop:0},{duration:d.speedOut,easing:d.easingOut,step:T,complete:a})}else f.fadeOut(d.transitionOut=="none"?0:d.speedOut,a)}}};b.fancybox.resize=function(){u.is(":visible")&&u.css("height",b(document).height());b.fancybox.center(true)};b.fancybox.center=function(a){var c,g;if(!h){g=a===true?1:0;c=U();!g&&(f.width()>c[0]||f.height()>c[1])||f.stop().animate({top:parseInt(Math.max(c[3]-20,c[3]+(c[1]-j.height()-40)*0.5-d.padding)),left:parseInt(Math.max(c[2]-20,c[2]+(c[0]-j.width()-40)*0.5-
d.padding))},typeof a=="number"?a:200)}};b.fancybox.init=function(){if(!b("#fancybox-wrap").length){b("body").append(m=b('<div id="fancybox-tmp"></div>'),t=b('<div id="fancybox-loading"><div></div></div>'),u=b('<div id="fancybox-overlay"></div>'),f=b('<div id="fancybox-wrap"></div>'));D=b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
D.append(j=b('<div id="fancybox-content"></div>'),E=b('<a id="fancybox-close"></a>'),n=b('<div id="fancybox-title"></div>'),z=b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),A=b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));E.click(b.fancybox.close);t.click(b.fancybox.cancel);z.click(function(a){a.preventDefault();b.fancybox.prev()});A.click(function(a){a.preventDefault();b.fancybox.next()});
b.fn.mousewheel&&f.bind("mousewheel.fb",function(a,c){if(h)a.preventDefault();else if(b(a.target).get(0).clientHeight==0||b(a.target).get(0).scrollHeight===b(a.target).get(0).clientHeight){a.preventDefault();b.fancybox[c>0?"prev":"next"]()}});b.support.opacity||f.addClass("fancybox-ie");if(M){t.addClass("fancybox-ie6");f.addClass("fancybox-ie6");b('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D)}}};
b.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",
easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};b(document).ready(function(){b.fancybox.init()})})(jQuery);

/* FILE /javascript/jquery.placeholder.min.js, Checksum c748b58773a5bb108cbd0bd50a28a694e541583db8c9873ea077561e62b373b2 */
/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/

(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);


/* FILE /javascript/main.js, Checksum fff0c3369d6367f4c7c2a5d231fa070228f5b6cf9563d44984d4e27db6ad6fb5 */
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
	function loader($context, extraCSS)
	{
		$loader = $('img.loader', $context.parent() );
		if( $loader.length === 0 )
		{
			$loader = $('<img />').hide().attr({'src': '/images/loader-small.gif', 'alt':'Laddar...'}).addClass('loader').css(extraCSS);
			$context.before($loader);
		}
		return $loader;
	}
	
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
	
	$('.switch').live('click', function()
	{
		_this = $(this)
		$active = $(this).siblings('.active');
		$active.removeClass('active');
		$(this).addClass('active');
		$context = $(this).parents('.recipie-picker');
		$bxwrapper = $('.bx-wrapper', $context);
		
		$bxwrapper.slideToggle();
		$('.search-box-inline', $context).slideToggle();
		
		$('input[type="text"]', $context).bind('keypress', function(e){
			if(e.which == 13) //13 = enter key
			{
				searchRecipiesInline($(this), $context);
				return false;
			}
		});
		
		$('button', $context).click( function()
		{
			searchRecipiesInline($('input[type="text"]', $context), $context);
			return false;
		});
	});
	
	function searchRecipiesInline(obj, $context){
		
		_url = '/ajax-gateways/search/?action=getInlineSearchResults';
		_data = 'q='+obj.val();
				
		if( !obj.empty() || obj.val() != 'Sök efter recept' )
		{
			
			$loader = loader(obj, {'padding-top':'11px', 'float':'right'});
			$loader.fadeIn();

			$('.search-results', $context).slideUp('normal', function(){
				$.ajax({
					url: _url,
					data: _data,
					type: 'post',
					success: function(msg)
					{
						$loader.fadeOut();
						$('.search-results', $context).html(msg).slideDown();
						$('.search-results-slides', $context).bxSlider({pager:true});
					}
				});
			});
		}

		return false;
	}
});

/* FILE /javascript/modernizr-custom.js, Checksum e72deb53f86f89a88b1632422957d1054fa8d9436abd8444dd3a9af1e667d95a */
/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-backgroundsize-bgpositionshorthand-bgpositionxy-bgrepeatspace_bgrepeatround-bgsizecover-borderradius-boxshadow-boxsizing-checked-cssanimations-cssexunit-cssfilters-csspointerevents-csstransitions-fontface-hashchange-hovermq-input-inputtypes-json-lastchild-mediaqueries-nthchild-opacity-overflowscrolling-placeholder-siblinggeneral-touchevents-video-videoautoplay-videoloop !*/
!function(A,e,t){function n(A,e){return typeof A===e}function o(){var A,e,t,o,i,r,a;for(var s in T)if(T.hasOwnProperty(s)){if(A=[],e=T[s],e.name&&(A.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(t=0;t<e.options.aliases.length;t++)A.push(e.options.aliases[t].toLowerCase());for(o=n(e.fn,"function")?e.fn():e.fn,i=0;i<A.length;i++)r=A[i],a=r.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),b.push((o?"":"no-")+a.join("-"))}}function i(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):C?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function r(A){var e=x.className,t=Modernizr._config.classPrefix||"";if(C&&(e=e.baseVal),Modernizr._config.enableJSClass){var n=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");e=e.replace(n,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(e+=" "+t+A.join(" "+t),C?x.className.baseVal=e:x.className=e)}function a(A,e){if("object"==typeof A)for(var t in A)Y(A,t)&&a(t,A[t]);else{A=A.toLowerCase();var n=A.split("."),o=Modernizr[n[0]];if(2==n.length&&(o=o[n[1]]),"undefined"!=typeof o)return Modernizr;e="function"==typeof e?e():e,1==n.length?Modernizr[n[0]]=e:(!Modernizr[n[0]]||Modernizr[n[0]]instanceof Boolean||(Modernizr[n[0]]=new Boolean(Modernizr[n[0]])),Modernizr[n[0]][n[1]]=e),r([(e&&0!=e?"":"no-")+n.join("-")]),Modernizr._trigger(A,e)}return Modernizr}function s(){var A=e.body;return A||(A=i(C?"svg":"body"),A.fake=!0),A}function l(A,t,n,o){var r,a,l,d,c="modernizr",u=i("div"),p=s();if(parseInt(n,10))for(;n--;)l=i("div"),l.id=o?o[n]:c+(n+1),u.appendChild(l);return r=i("style"),r.type="text/css",r.id="s"+c,(p.fake?p:u).appendChild(r),p.appendChild(u),r.styleSheet?r.styleSheet.cssText=A:r.appendChild(e.createTextNode(A)),u.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",d=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),a=t(u,A),p.fake?(p.parentNode.removeChild(p),x.style.overflow=d,x.offsetHeight):u.parentNode.removeChild(u),!!a}function d(A,e){return!!~(""+A).indexOf(e)}function c(A){return A.replace(/([a-z])-([a-z])/g,function(A,e,t){return e+t.toUpperCase()}).replace(/^-/,"")}function u(A,e){return function(){return A.apply(e,arguments)}}function p(A,e,t){var o;for(var i in A)if(A[i]in e)return t===!1?A[i]:(o=e[A[i]],n(o,"function")?u(o,t||e):o);return!1}function f(A){return A.replace(/([A-Z])/g,function(A,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(e,t,n){var o;if("getComputedStyle"in A){o=getComputedStyle.call(A,e,t);var i=A.console;if(null!==o)n&&(o=o.getPropertyValue(n));else if(i){var r=i.error?"error":"log";i[r].call(i,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&e.currentStyle&&e.currentStyle[n];return o}function m(e,n){var o=e.length;if("CSS"in A&&"supports"in A.CSS){for(;o--;)if(A.CSS.supports(f(e[o]),n))return!0;return!1}if("CSSSupportsRule"in A){for(var i=[];o--;)i.push("("+f(e[o])+":"+n+")");return i=i.join(" or "),l("@supports ("+i+") { #modernizr { position: absolute; } }",function(A){return"absolute"==h(A,null,"position")})}return t}function g(A,e,o,r){function a(){l&&(delete D.style,delete D.modElem)}if(r=n(r,"undefined")?!1:r,!n(o,"undefined")){var s=m(A,o);if(!n(s,"undefined"))return s}for(var l,u,p,f,h,g=["modernizr","tspan","samp"];!D.style&&g.length;)l=!0,D.modElem=i(g.shift()),D.style=D.modElem.style;for(p=A.length,u=0;p>u;u++)if(f=A[u],h=D.style[f],d(f,"-")&&(f=c(f)),D.style[f]!==t){if(r||n(o,"undefined"))return a(),"pfx"==e?f:!0;try{D.style[f]=o}catch(v){}if(D.style[f]!=h)return a(),"pfx"==e?f:!0}return a(),!1}function v(A,e,t,o,i){var r=A.charAt(0).toUpperCase()+A.slice(1),a=(A+" "+I.join(r+" ")+r).split(" ");return n(e,"string")||n(e,"undefined")?g(a,e,o,i):(a=(A+" "+z.join(r+" ")+r).split(" "),p(a,e,t))}function y(A,e,n){return v(A,t,t,e,n)}var T=[],w={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(A,e){var t=this;setTimeout(function(){e(t[A])},0)},addTest:function(A,e,t){T.push({name:A,fn:e,options:t})},addAsyncTest:function(A){T.push({name:null,fn:A})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr,Modernizr.addTest("json","JSON"in A&&"parse"in JSON&&"stringify"in JSON);var b=[],x=e.documentElement,R=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=R;var E="CSS"in A&&"supports"in A.CSS,B="supportsCSS"in A;Modernizr.addTest("supports",E||B);var C="svg"===x.nodeName.toLowerCase();Modernizr.addTest("video",function(){var A=i("video"),e=!1;try{e=!!A.canPlayType,e&&(e=new Boolean(e),e.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),e.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),e.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),e.vp9=A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),e.hls=A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(t){}return e}),Modernizr.addTest("bgpositionshorthand",function(){var A=i("a"),e=A.style,t="right 10px bottom 10px";return e.cssText="background-position: "+t+";",e.backgroundPosition===t}),Modernizr.addTest("opacity",function(){var A=i("a").style;return A.cssText=R.join("opacity:.55;"),/^0.55$/.test(A.opacity)}),Modernizr.addTest("csspointerevents",function(){var A=i("a").style;return A.cssText="pointer-events:auto","auto"===A.pointerEvents}),Modernizr.addTest("placeholder","placeholder"in i("input")&&"placeholder"in i("textarea")),Modernizr.addTest("videoloop","loop"in i("video"));var F=function(){function A(A,e){var o;return A?(e&&"string"!=typeof e||(e=i(e||"div")),A="on"+A,o=A in e,!o&&n&&(e.setAttribute||(e=i("div")),e.setAttribute(A,""),o="function"==typeof e[A],e[A]!==t&&(e[A]=t),e.removeAttribute(A)),o):!1}var n=!("onblur"in e.documentElement);return A}();w.hasEvent=F,Modernizr.addTest("hashchange",function(){return F("hashchange",A)===!1?!1:e.documentMode===t||e.documentMode>7});var G=i("input"),S="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),Q={};Modernizr.input=function(e){for(var t=0,n=e.length;n>t;t++)Q[e[t]]=!!(e[t]in G);return Q.list&&(Q.list=!(!i("datalist")||!A.HTMLDataListElement)),Q}(S);var k="search tel url email datetime date month week time datetime-local number range color".split(" "),M={};Modernizr.inputtypes=function(A){for(var n,o,i,r=A.length,a="1)",s=0;r>s;s++)G.setAttribute("type",n=A[s]),i="text"!==G.type&&"style"in G,i&&(G.value=a,G.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(n)&&G.style.WebkitAppearance!==t?(x.appendChild(G),o=e.defaultView,i=o.getComputedStyle&&"textfield"!==o.getComputedStyle(G,null).WebkitAppearance&&0!==G.offsetHeight,x.removeChild(G)):/^(search|tel)$/.test(n)||(i=/^(url|email)$/.test(n)?G.checkValidity&&G.checkValidity()===!1:G.value!=a)),M[A[s]]=!!i;return M}(k);var Z={elem:i("modernizr")};Modernizr._q.push(function(){delete Z.elem}),Modernizr.addTest("cssexunit",function(){var A,e=Z.elem.style;try{e.fontSize="3ex",A=-1!==e.fontSize.indexOf("ex")}catch(t){A=!1}return A});var Y;!function(){var A={}.hasOwnProperty;Y=n(A,"undefined")||n(A.call,"undefined")?function(A,e){return e in A&&n(A.constructor.prototype[e],"undefined")}:function(e,t){return A.call(e,t)}}(),w._l={},w.on=function(A,e){this._l[A]||(this._l[A]=[]),this._l[A].push(e),Modernizr.hasOwnProperty(A)&&setTimeout(function(){Modernizr._trigger(A,Modernizr[A])},0)},w._trigger=function(A,e){if(this._l[A]){var t=this._l[A];setTimeout(function(){var A,n;for(A=0;A<t.length;A++)(n=t[A])(e)},0),delete this._l[A]}},Modernizr._q.push(function(){w.addTest=a}),Modernizr.addAsyncTest(function(){function A(i){o++,clearTimeout(e);var s=i&&"playing"===i.type||0!==r.currentTime;return!s&&n>o?void(e=setTimeout(A,t)):(r.removeEventListener("playing",A,!1),a("videoautoplay",s),void(r.parentNode&&r.parentNode.removeChild(r)))}var e,t=200,n=5,o=0,r=i("video"),s=r.style;if(!(Modernizr.video&&"autoplay"in r))return void a("videoautoplay",!1);s.position="absolute",s.height=0,s.width=0;try{if(Modernizr.video.ogg)r.src="data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A";else{if(!Modernizr.video.h264)return void a("videoautoplay",!1);r.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="}}catch(l){return void a("videoautoplay",!1)}r.setAttribute("autoplay",""),r.style.cssText="display:none",x.appendChild(r),setTimeout(function(){r.addEventListener("playing",A,!1),e=setTimeout(A,t)},0)});var V=w.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in A||A.DocumentTouch&&e instanceof DocumentTouch)t=!0;else{var n=["@media (",R.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");V(n,function(A){t=9===A.offsetTop})}return t}),Modernizr.addTest("checked",function(){return V("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}",function(A){var e=i("input");return e.setAttribute("type","checkbox"),e.setAttribute("checked","checked"),A.appendChild(e),20===e.offsetLeft})});var P=function(){var A=navigator.userAgent,e=A.match(/w(eb)?osbrowser/gi),t=A.match(/windows phone/gi)&&A.match(/iemobile\/([0-9])+/gi)&&parseFloat(RegExp.$1)>=9;return e||t}();P?Modernizr.addTest("fontface",!1):V('@font-face {font-family:"font";src:url("https://")}',function(A,t){var n=e.getElementById("smodernizr"),o=n.sheet||n.styleSheet,i=o?o.cssRules&&o.cssRules[0]?o.cssRules[0].cssText:o.cssText||"":"",r=/src/i.test(i)&&0===i.indexOf(t.split(" ")[0]);Modernizr.addTest("fontface",r)}),V("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}",function(A){Modernizr.addTest("lastchild",A.lastChild.offsetWidth>A.firstChild.offsetWidth)},2),V("#modernizr div {width:1px} #modernizr div:nth-child(2n) {width:2px;}",function(A){for(var e=A.getElementsByTagName("div"),t=!0,n=0;5>n;n++)t=t&&e[n].offsetWidth===n%2+1;Modernizr.addTest("nthchild",t)},5),Modernizr.addTest("siblinggeneral",function(){return V("#modernizr div {width:100px} #modernizr div ~ div {width:200px;display:block}",function(A){return 200==A.lastChild.offsetWidth},2)});var U=function(){var e=A.matchMedia||A.msMatchMedia;return e?function(A){var t=e(A);return t&&t.matches||!1}:function(e){var t=!1;return l("@media "+e+" { #modernizr { position: absolute; } }",function(e){t="absolute"==(A.getComputedStyle?A.getComputedStyle(e,null):e.currentStyle).position}),t}}();w.mq=U,Modernizr.addTest("mediaqueries",U("only all")),Modernizr.addTest("hovermq",U("(hover)"));var N="Moz O ms Webkit",I=w._config.usePrefixes?N.split(" "):[];w._cssomPrefixes=I;var z=w._config.usePrefixes?N.toLowerCase().split(" "):[];w._domPrefixes=z;var D={style:Z.elem.style};Modernizr._q.unshift(function(){delete D.style}),w.testAllProps=v,w.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0)),Modernizr.addTest("bgpositionxy",function(){return y("backgroundPositionX","3px",!0)&&y("backgroundPositionY","5px",!0)}),Modernizr.addTest("bgrepeatround",y("backgroundRepeat","round")),Modernizr.addTest("bgrepeatspace",y("backgroundRepeat","space")),Modernizr.addTest("backgroundsize",y("backgroundSize","100%",!0)),Modernizr.addTest("bgsizecover",y("backgroundSize","cover")),Modernizr.addTest("borderradius",y("borderRadius","0px",!0)),Modernizr.addTest("boxshadow",y("boxShadow","1px 1px",!0)),Modernizr.addTest("boxsizing",y("boxSizing","border-box",!0)&&(e.documentMode===t||e.documentMode>7)),Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return y("filter","blur(2px)");var A=i("a");return A.style.cssText=R.join("filter:blur(2px); "),!!A.style.length&&(e.documentMode===t||e.documentMode>9)}),Modernizr.addTest("overflowscrolling",y("overflowScrolling","touch",!0)),Modernizr.addTest("csstransitions",y("transition","all",!0)),o(),delete w.addTest,delete w.addAsyncTest;for(var H=0;H<Modernizr._q.length;H++)Modernizr._q[H]();A.Modernizr=Modernizr}(window,document);