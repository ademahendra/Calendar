/*
var Bali = {
	android: {
		menu: {}	
	},
	datetime: {},
    ui: {},
    __isLargeScreen: undefined,
    __isAndroid: undefined,
    navGroup: undefined
};

(function() {
	
	Bali.cleanSpecialChars = function(str) {
  		if (str == null) {
    		return '';
  		}
  		if (typeof str === 'string') {
    		return  str
      			.replace(/&quot;/g,'"')
      			.replace(/\&amp\;/g,"&")
      			.replace(/&lt;/g,"<")
      			.replace(/&gt;/g,">")
      			.replace(/&#039;/g, "'");
  		}
  		return '';
	};
})();
*/
var Bali = {
	android: {
		menu: {}	
	},
	ws:{},
	chatlog:{},
	datetime: {},
    ui: {},
    __isLargeScreen: undefined,
    __isAndroid: undefined,
    navGroup: undefined
};
	
Bali.url = 'http://222.165.204.43/intercontinental/';

// Bali.url = 'http://192.168.2.8/~putu/intercontinental/';

Bali.socket = 'ws://222.165.204.43:9302';

Bali.batterylevelupdate = Titanium.Platform.batteryLevel*100;
// Bali.socket = 'ws://192.168.2.8:9302';

Bali.Today = new Date();

Bali.ssid = null;

Bali.sender = 0;

    var getDistance =  function(latitudeFrom, longitudeFrom, latitudeTo, longitudeTo)
	{
		// alert("File CS: "+latitudeFrom+", "+longitudeFrom+", "+latitudeTo+", "+longitudeTo);
		//= 6371000
		var earthRadius = 6371000;
		
	  // convert from degrees to radians
 		 var latFrom = deg2rad(latitudeFrom);
 		 var lonFrom = deg2rad(longitudeFrom);
  		var latTo = deg2rad(latitudeTo);
  		var lonTo = deg2rad(longitudeTo);

  		var lonDelta = lonTo - lonFrom;
  		var a = Math.pow(Math.cos(latTo) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(latFrom) * Math.sin(latTo) - Math.sin(latFrom) * Math.cos(latTo) * Math.cos(lonDelta), 2);
  		var b = Math.sin(latFrom) * Math.sin(latTo) + Math.cos(latFrom) * Math.cos(latTo) * Math.cos(lonDelta);

  		var angle = Math.atan2(Math.sqrt(a), b);
  		// alert("angle: "+angle+"Distance : "+(angle * earthRadius));
  		return angle * earthRadius;
	};
		       
    function deg2rad (angle) {
    		return (angle / 180) * Math.PI;
    	}
    	
(function() {
	Bali.extend = function(obj) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    for (var i = 0; i < args.length; i++) {
	    	var source = args[i];
	      	for (var prop in source) {
	        	if (source[prop] !== void 0) obj[prop] = source[prop];
	      	}
	    }
	    return obj;
	};
	
	Bali.isLargeScreen = function() {
		if (Bali.__isLargeScreen === undefined) {
			Bali.__isLargeScreen = (Ti.Platform.displayCaps.platformWidth >= 600);
		}
		return Bali.__isLargeScreen;
	};
	
	Bali.isAndroid = function() {
		if (Bali.__isAndroid === undefined) {
			Bali.__isAndroid = (Ti.Platform.osname == 'android');
		}
		return Bali.__isAndroid;
	};
	
	Bali.cleanSpecialChars = function(str) {
  		if (str == null) {
    		return '';
  		}
  		if (typeof str === 'string') {
    		return  str
      			.replace(/&quot;/g,'"')
      			.replace(/\&amp\;/g,"&")
      			.replace(/&lt;/g,"<")
      			.replace(/&gt;/g,">")
      			.replace(/&#039;/g, "'");
  		}
  		return '';
	};
	
	Bali.android.menu = {
		data: [],
		init: function(params) {
			var activity = params.win.activity; 
	        activity.onCreateOptionsMenu = function (e) {
	          	var optionsmenu = e.menu;
	          	for (k = 0; k < params.buttons.length; k++) {
	            	Bali.android.menu.data[k] = optionsmenu.add({
	              		title: params.buttons[k].title
	            	});
	            	Bali.android.menu.data[k].addEventListener("click", params.buttons[k].clickevent);
	          	}
	        };
		}
	};
	
	Bali.decodeLine = function (encoded) {
	    var len = encoded.length;
	    var index = 0;
	    var array = [];
	    var lat = 0;
	    var lng = 0;
	 
	    while (index < len) {
	        var b;
	        var shift = 0;
	        var result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lat += dlat;
	 
	        shift = 0;
	        result = 0;
	        do {
	            b = encoded.charCodeAt(index++) - 63;
	            result |= (b & 0x1f) << shift;
	            shift += 5;
	        } while (b >= 0x20);
	        var dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
	        lng += dlng;
	 
	        array.push({longitude:lng * 1e-5, latitude:lat * 1e-5});
	    }
	 
	    return array;
	};
	
	Bali.formatCurrency = function(strValue) {
	    strValue = strValue.toString().replace(/\$|\,/g,'');
		dblValue = parseFloat(strValue);
	
		blnSign = (dblValue == (dblValue = Math.abs(dblValue)));
		dblValue = Math.floor(dblValue*100+0.50000000001);
		intCents = dblValue%100;
		strCents = intCents.toString();
		dblValue = Math.floor(dblValue/100).toString();
		if(intCents<10)
			strCents = "0" + strCents;
		for (var i = 0; i < Math.floor((dblValue.length-(1+i))/3); i++)
			dblValue = dblValue.substring(0,dblValue.length-(4*i+3))+','+
			dblValue.substring(dblValue.length-(4*i+3));
		return (((blnSign)?'':'-') + 'IDR ' + dblValue);
	};
	
	Bali.objToString = function(obj) {
	    var str = '';
	    for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	            str += p + '::' + obj[p] + '\n';
	        }
	    }
	    return str;
	};	

	Bali.getCurrentLocation = function () {
		Titanium.Geolocation.purpose = 'Get device location';
	    Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
	    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	    Titanium.Geolocation.distanceFilter = 10;
	    Titanium.Geolocation.getCurrentPosition(function (e) {
	        if (e.error) {
	            Ti.API.info('Sorry, We are cannot get your current location');
	            longitude = '115.160751';
	        	latitude = '-8.680476';
	            return;
	        }
	        longitude = e.coords.longitude;
	        latitude = e.coords.latitude;
	        var altitude = e.coords.altitude;
	        var heading = e.coords.heading;
	        var accuracy = e.coords.accuracy;
	        var speed = e.coords.speed;
	        var timestamp = e.coords.timestamp;
	        var altitudeAccuracy = e.coords.altitudeAccuracy;				    				    
	    });
	};
	
	Bali.totalStay = function(checkin, checkout){
		var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		var firstDate = new Date(checkin);
		var secondDate = new Date(checkout);
		
		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		return diffDays;
	};		

Ti.App.glbGeoData = {
    _curLatitude:"115.228796",
    _curLongitude:"-8.67869"
};
})();