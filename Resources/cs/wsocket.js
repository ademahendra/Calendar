// websocket
//Bali.ws.websocket = require('com.gosocket').createWS();
//Bali.ws.websocket.open(Bali.socket);

var wwebsocket = require('com.gosocket').createWS();

var adsshow = true;
var assignstatus = false;
var longitude;
var latitude ;

Ti.App.Properties.setString('assignstatus', false);



Ti.App.addEventListener('resume', function () {
    //   showMessage('Reopen connection after resuming');
    wwebsocket.reconnect(Bali.socket);
    
   
    
    onbackground = false;
    Ti.App.Properties.setString('onbackground', false);
});

var checkAdvertising = function(){
	var xhrCheck = Ti.Network.createHTTPClient();
	Ti.API.info("Check Advertising from top socket: " + deviceguidd + " = "+assignid);
	var params = {
	    'guidd': deviceguidd,
	    'assignid':assignid,
	    'r':'m_checkadv'
	};
	
	xhrCheck.onload = function () {    
	    Ti.API.info("Check Advertising from socket: " + this.responseText);
	    try{
		    var json = JSON.parse(this.responseText);
		    if(json.status){
		    	setTimeout(Bali.ui.createAdsWindow(json.data), 5000);
				// Bali.ui.createAdsWindow(json.data);
			}
		} catch(e){
			Ti.API.info('Error: check advertising  ');
		}
	}
	
	xhrCheck.onerror = function (e) {
	    Ti.API.info("Response Error " + e.error);
	}
	
	xhrCheck.open("POST", Bali.url+"api/poajax.php");
	xhrCheck.send(params);		
}

var checkAssignDevice = function(fromsource){
	var xhrCheck = Ti.Network.createHTTPClient();
	var params = {
	    'guidd': deviceguidd,
	    'r':'m_assign'
	};
	
	xhrCheck.onload = function () {
	    Ti.API.info("Response Check Assign cad -: " + this.responseText);
	    
	    try{
	    	var json = JSON.parse(this.responseText);
	    	 Ti.API.info("Check Assign 1 NOW:: " + json.deviceid +" == "+json.clientid);
		    if(!json.status){
		  	 Ti.include('ui/common/assignCheck.js');
		    	Bali.ui.createAssignCheckWindow();
		    	// Ti.App.fireEvent('cleanloginData');
		    	// Ti.App.Properties.removeProperty('deviceid');
		    	// Ti.App.Properties.removeProperty('clientid');
		    	// Ti.App.Properties.removeProperty('languageid');
		    	// Ti.App.Properties.removeProperty('serverclientid');
		    	// Ti.App.Properties.removeProperty('assignid');
// 		    	
		    	 Ti.App.fireEvent('emptychat');
		    	 Ti.App.fireEvent('emptytextchat');
		    	
		    	assignstatus = false;
		    	Ti.App.Properties.setString('assignstatus', false);
		    	 Ti.API.info("Check Assign 0 NOOO ::");
		    	
		    } else {
		    	
		    	Ti.API.info("Check Assign NOW:: " + json.deviceid +" == "+json.clientid);
		    	Ti.App.Properties.setString('deviceid', json.deviceid);
		    	Ti.App.Properties.setString('clientid', json.clientid);
		    	Ti.App.Properties.setString('languageid', 1); // set default english
		    	Ti.App.Properties.setString('serverclientid', json.serverclientid);
		    	Ti.App.Properties.setString('assignid', json.assignid);
		    	Ti.App.Properties.setString('assignstatus', true);
		    	languageid = 1; //set default englisg
				clientid = Ti.App.Properties.getString('clientid');
				deviceid = Ti.App.Properties.getString('deviceid');
				serverclientid = Ti.App.Properties.getString('serverclientid');
				assignid = Ti.App.Properties.getString('assignid');
				
				if(fromsource == 'resumed')
				{
					 // reload json data
   					 Ti.API.info("reloading json from wsocket - resumed");
			    		Titanium.App.fireEvent('ReloadingLoadJson');
			    		
					Ti.API.info("from resumed - function checkAssignDevice");
					checkAdvertising();
				}
				
		    	if(!mainWindowLoad){
		    		 Ti.API.info("LOAD NEW JSON ");
		    		getAllJson();
		    	}
		    	assignstatus = true;

		    }
	    } catch(e) {
	    	Ti.API.info('e.error');
	    	assignstatus = false;
	    }
	}
	
	xhrCheck.onerror = function (e) {
	    Ti.API.info("Response Error " + e.error);
	    return false;
	}
	
	xhrCheck.open("POST", Bali.url+"api/poajax.php");
	xhrCheck.send(params);	
}

var deviceStatus = function(battery,glat,glon, bssid){
	
    var xhr = Titanium.Network.createHTTPClient();
    var params = {
    	'deviceid':deviceid,
	    'guidd':deviceguidd,
	    'battery':battery,
	    'glat':glat,
	    'glon':glon,
	    'bssid':bssid,
	    'r':'m_devicestatus'
	};
  Ti.API.info("Device status send params :: "+params);
    xhr.onerror = function (e) {
        Ti.API.info('IN ERROR ' + e.error);
    };
    xhr.onload = function () {
        var response = this.responseText;
         Ti.API.info("Device status responds :: "+response);
    };

    xhr.open('POST', Bali.url+'api/poajax.php');
    xhr.send(params);
}

Ti.App.addEventListener('resumed', function (e) {
    Ti.API.info("app has resumed from the background "+Bali.sender);

    if (service != null) {
        service.stop();
        service.unregister();
    }
    Titanium.UI.iPhone.appBadge = null;
    checkAssignDevice('resumed');

	
    
    
	onbackground = false;
	alertCount = 0;
	
	Titanium.Platform.batteryMonitoring = true;
	var batterylevel = Titanium.Platform.batteryLevel*100;
    Bali.getCurrentLocation();
    var ssid = wwebsocket.currentWifiSSID;
    
    deviceStatus(batterylevel,latitude,longitude, wwebsocket.currentWifiSSID);

});

Titanium.App.addEventListener('reloadwebsocket', function(){
	Ti.API.info("IS CALLED !!!");
	wwebsocket.reconnect(Bali.socket);
	
});


Ti.App.addEventListener('pause', function (e) {
	
	Ti.App.Properties.setString('onbackground', true);
    Ti.API.info("app was paused from the foreground");
    onbackground = true;
    service = Ti.App.iOS.registerBackgroundService({
        url: 'bgservices.js'
    });
    Ti.API.info("registered background service = " + service);

});

wwebsocket.addEventListener('close', function (ev) {
	 Ti.API.info('socket closed');
	 	Ti.App.Properties.setString('socketstatus', false);
	 
	checkAssignDevice('closed');
	if(assignstatus){
		 Ti.API.info('socket closed + device is assign : '+Bali.socket);
	// var dialog = Ti.UI.createAlertDialog({
	    // cancel: 1,
	    // buttonNames: ['Yes', 'No'],
	    // message: 'Disconnected. reconnect socket ?',
	    // title: 'Confirmation'
	// });
// 	
	// dialog.addEventListener('click', function (e) {
	    // if (e.index === e.source.cancel) {
	        // socketstatus = false;
	    // } else {
			// if(assignstatus){
			//	wwebsocket.reconnect(Bali.socket);
	        //	adsshow = true;
	       // 	socketstatus = true;
	        // }
	    // }
	// });
	// dialog.show();
	
	
   } else {
   		 Ti.API.info('socket closed + device is NOT assign');
	   	socketstatus = false;
		Ti.App.fireEvent('disableChatButton');
   }
});

wwebsocket.addEventListener('open', function (ev) {

    var holdatt = {
        'myguidd': deviceguidd,
        'profilename': 'putu',
        'command': 7,
        'devicecode': 'ipod',
        'status': 'on',
        'cmdact': ''
    };
    
    wwebsocket.send(JSON.stringify(holdatt));
    Ti.App.fireEvent('enableChatButton');
    adsshow = true;
	socketstatus = true;
	Ti.App.Properties.setString('socketstatus', true);
	Ti.API.info("SOCKET CONNECTED");
});


// keep check socket !
function checksocket() {
	
	// update date time
	Ti.App.fireEvent('datetimelabelupdate');
	
	 if(Titanium.Network.online)
	{
		
		 Ti.API.info('Socket timer check point !! every 60 second.');
		// only there is internet connection
		
		// if in background we dont need to check this
		
		var isbackg = Ti.App.Properties.getString('onbackground');
		
		
		if(isbackg == false)
		{
		
			Ti.API.info('Socket timer check point !! every 60 second :: background service is OFF.');
			
			
			var scstat = Ti.App.Properties.getString('socketstatus');
			var asstat = Ti.App.Properties.getString('assignstatus');	
			Ti.API.info("socketstatus: "+scstat + 'assign status :'+asstat); 
	            if (scstat == 0 && asstat == 1) {
	            
	            // try reconnect socket
	            // keep alive
	              Ti.API.info('reconnect socket from from checksocket function.');
	                wwebsocket.reconnect(Bali.socket);
	                var scstat = Ti.App.Properties.setString('socketstatus',true);
	            
	            }
				else
				{
					 Ti.API.info('internet still online. from socket check point.');
				}
		}
	}
	
	
}

function checkdevicestat(){
	
	var isbackg = Ti.App.Properties.getString('onbackground');
		
		Ti.API.info("checkdevicestat IS CALLED  1 !"+isbackg);
		if(isbackg == false)
		{
			Ti.API.info("checkdevicestat IS CALLED 2 !");
	Titanium.Platform.batteryMonitoring = true;
	var batterylevel = Titanium.Platform.batteryLevel*100;
    Bali.getCurrentLocation();
    var ssid = wwebsocket.currentWifiSSID;
    
    deviceStatus(batterylevel,latitude,longitude, wwebsocket.currentWifiSSID);
	}
}


Titanium.App.addEventListener('checkdevicestatbackground', function(){
	Ti.API.info("checkdevicestatbackground IS CALLED !!!");
	
    Bali.getCurrentLocation();
    var ssid = wwebsocket.currentWifiSSID;
    Titanium.Platform.batteryMonitoring = true;
	Bali.batterylevelupdate = Titanium.Platform.batteryLevel*100;
	
    deviceStatus(Bali.batterylevelupdate,latitude,longitude, wwebsocket.currentWifiSSID);
	
	
});

Ti.Platform.addEventListener('battery',function(e){
	Ti.API.info("AUTOMATIC BATTERY LEVEL UPDATE !!!");
	Bali.getCurrentLocation();
    var ssid = wwebsocket.currentWifiSSID;
    Bali.batterylevelupdate = e.level * 100;
    deviceStatus(Bali.batterylevelupdate,latitude,longitude, wwebsocket.currentWifiSSID);
	
});


var timersocket = setInterval(checksocket, 60000);
//var trackerdevice = setInterval(checkdevicestat, 300000);


//})();