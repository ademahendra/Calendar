(function() {
	
	var iconHeight = Bali.ui.iconmenu;
	var iconWidth = Bali.ui.iconmenu;
	var imageSuffix = '';

	Bali.ui.icons = {
		height: iconHeight,
		width: iconWidth,
		list: [
			{
				image: 'images/button-home/theresort.png',
				win: function(data) { return Bali.ui.createResortWindow(data)},
				lableTitle : 'The Resort',
				cat : '1'
			},

			{
				image: 'images/button-home/restaurant.png',
				win: function(data) {return Bali.ui.createDiningWindow(data)},
				lableTitle : 'Dining',
				cat : '3'
			},
			{
				image: 'images/button-home/spa.png',
				win: function(data) {return Bali.ui.createSpaWindow(data)},
				lableTitle : 'SPA & Leisures',
				cat : '4'
			},
			{
				image: 'images/button-home/activities.png',
				win: function(data) {return Bali.ui.createPlanetWindow(data)},
				lableTitle : 'Planet Trekkers',
				cat : '10'
			},			
			
			{
				image: 'images/button-home/promo.png',
				win: function(data) {return Bali.ui.createAdvertisingWindow(data)},
				lableTitle : 'Promo',
				cat : '2'
			},
			{
				image: 'images/button-home/camera.png',
				win: function(data) {return Bali.ui.createtakepictureWindow(data)},
				lableTitle : 'Take and Share',
				cat : '8'
			},
			//************ Page 2 List ************ 
			{
				image: 'images/button-home/gallery.png',
				win: function(data) {return Bali.ui.createfeedbackWindow(data)},
				lableTitle : 'Feedback',
				cat : '55'
			},
			{
				image: 'images/button-home/currecyexchange.png',
				win: function(data) {return Bali.ui.createcurrencyrateWindow(data.currency)},
				lableTitle : 'Currency Rate',
				cat : '6'
			},		

			{
				image: 'images/button-home/whetherforecast.png',
				//win: function(data) {Bali.ui.createwheaterforecastWindow({'data':Bali.json.currency}),
				win:  function(data) {return Bali.ui.createwheaterforecastWindow(data.weather)},
				lableTitle : 'Weather',
				cat : '5'
			},
			{
				image: 'images/button-home/flightschedule.png',
				win: function(data) {return Bali.ui.createflightWindow(data)},
				lableTitle : 'Flight Schedule',
				cat : '7'
			},
			
			{
				image: 'images/button-home/interestplaces.png',
				win: function(data) {return Bali.ui.createInterestWindow(data)},
				lableTitle : 'Interest Places',
				cat : '9'
			},
			{
				image: 'images/button-home/calendar.png',
				win: function(data) {return Bali.ui.createmusicWindow(data)},
				lableTitle : 'Music',
				cat : '77'
			}			
		]
	};	
})();