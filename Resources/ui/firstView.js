var win = Titanium.UI.createWindow({
    title: 'Leisure',
    backgroundColor: '#fff',
    top: 0
});

var bookedParam = {
	source:'button',
	date:'null'
}; //default parameter to open booking window

var addwindow = Bali.addactivityWindow(bookedParam);
var assignwindow = Bali.assignWindow();
// 
// var hourView = [];
// var dayView = [];
// var weekIndex = [];

var show = false;
var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var pageview = [];

var activitiesView = Ti.UI.createView({
    width: screenwidth,
    height: 120,
    top: -120,
    backgroundColor: '#333333'
});

var optionView = Ti.UI.createView({
    width: screenwidth,
    height: 70,
    top: 0,
    backgroundColor: '#eeeeee'
});

var menuBar = Titanium.UI.createButtonBar({// Titanium.UI.iOS.createTabbedBar({
    // labels: ['information', 'video', 'gallery', 'calendar'],
    labels: ['activity', 'information', 'booked', 'calendar'],	    
    style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
    height: 30,
    width: 400
});

var assignLabel = Ti.UI.createLabel({
    width: 200,
    height: 30,
    right: 20,
    backgroundColor:'#007aff',
    text: 'Assign',
    font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: 'normal'
    },
    color:'#fff',
    textAlign:'center',
    borderRadius:5
});

var activitiesLabel = Ti.UI.createLabel({
    width: 200,
    height: 30,
    left: 20,
    backgroundColor:'#007aff',
    text: activitiesJson[0].name,
    font: {
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: 'normal'
    },
    color:'#fff',
    textAlign:'center',
    borderRadius:5
});

activitiesLabel.addEventListener('click', function(){
	if (show) {
        show = false;
        activitiesView.animate({
            top: -120,
            duration: 250
        });
        optionView.animate({
            top: 0,
            duration: 250
        });
        viewContainer.animate({
            top: 70,
            duration: 250
        });

                
    } else {
    	
        show = true;
        activitiesView.animate({
            top: 0,
            duration: 250
        });
        optionView.animate({
            top: 120,
            duration: 250
        });
        viewContainer.animate({
            top: 190,
            duration: 250
        });
    }	
});

optionView.add(activitiesLabel);
optionView.add(menuBar);
optionView.add(assignLabel);

assignLabel.addEventListener('click', function(){
	//clear session
	assignwindow.open();
});
// optionView.add(actvityBar);

var pageWindow = Ti.UI.createScrollableView({
    width: screenwidth,
    height: screenheight - 70,
    top: screenheight + screenheight
});

var currentPage = pageWindow.currentPage;

var today = new Date();
today = new Date(today.setDate(today.getDate()));


var displayCalendar = function(data){
	Bali.disabledatelast = 0;
	var dt  = data.checkin.split(/\-|\s/);
    var datecheckin = new Date(dt.slice(0,3).reverse().join('/')+' '+dt[3]);
    var dtout  = data.checkout.split(/\-|\s/);
    var datecheckout = new Date(dtout.slice(0,3).reverse().join('/')+' '+dtout[3]);
    
	var checkin = new Date(datecheckin);
	var checkout = new Date(datecheckout);
	// Ti.API.info(checkin+' - '+checkout+' - diff: '+totalStay(checkin, checkout));
	var daystay = Bali.totalStay(checkin, checkout);
	var page = 0;
	if(daystay <= 7){
		pageWindow.scrollingEnabled = false;
		page = 1;
	} else {
		page = Math.floor(daystay/7) + 1;
		pageWindow.scrollingEnabled = true;
	}
	
	var today = new Date(checkin);
	today = new Date(today.setDate(today.getDate() - 7));
	
	
	for (var i = 0; i < page; i++) {
	    var dateWeek = new Date(today.setDate(today.getDate() + 7));
	    // var first = dateWeek.getDate() - dateWeek.getDay();
	    // var firstday = new Date(dateWeek.setDate(first));
	    var weekofday = getWeekNumber(dateWeek);
	    // Ti.API.info('==> '+weekofday[0]+' :::> '+weekofday);
		var parameter = {
			weekday:weekofday[1],
			yearday:weekofday[0],
			totalstay:daystay+1,
			dateCheckIn:dateWeek
		};
	    pageview.push(Bali.createPageView(parameter));
	}
	
	pageWindow.views = pageview;
	pageWindow.setCurrentPage(0);	
};
displayCalendar(guestlist[0]);


// var viewWindow = pageWindow.getViews();
// if (viewWindow[1].children) {
    // // Ti.API.info('container view:' + viewWindow[1].children);
    // viewWindow[1].children[3].hide();
// }

var viewInfo = Ti.UI.createView({
    width: screenwidth,
    height: screenheight - 70,
    top: 0,
    backgroundColor: '#f1f1f1'
});

var webinfo = Ti.UI.createWebView({
	//url:'http://vb.icbali.com/leisure/volley.php',
	url:'ui/html/test.html',
	top:0,
});

Ti.App.addEventListener('app:fromWebView', function(e) {
	assignwindow.open();
});

viewInfo.add(webinfo);

menuBar.addEventListener('click', function (e) {
    Ti.API.info(e.index);
    var index = e.index;
    //this.index = e.index;
    //show = false;
    if (index === 0) {
    	Ti.API.info('Masuk Klik Activity');
		if (show) {
	        show = false;
	        activitiesView.animate({
	            top: -120,
	            duration: 250
	        });
	        optionView.animate({
	            top: 0,
	            duration: 250
	        });
	        viewContainer.animate({
	            top: 70,
	            duration: 250
	        });
	    } else {
	        show = true;
	        activitiesView.animate({
	            top: 0,
	            duration: 250
	        });
	        optionView.animate({
	            top: 120,
	            duration: 250
	        });
	        viewContainer.animate({
	            top: 190,
	            duration: 250
	        });
	    }    	
    } else if (index === 1) {
        viewInfo.animate({
            top: 0,
            duration: 500
        });
        pageWindow.animate({
            top: screenheight + screenheight,
            duration: 500
        });
        activitiesView.animate({
            top: -120,
            duration: 250
        });
        optionView.animate({
            top: 0,
            duration: 250
        });
        viewContainer.animate({
            top: 70,
            duration: 250
        });
        show = false;
    } else if (index === 2) {
        show = false;
        activitiesView.animate({
            top: -120,
            duration: 250
        });
        optionView.animate({
            top: 0,
            duration: 250
        });
        viewContainer.animate({
            top: 70,
            duration: 250
        });
        addwindow.open();
        
    } else if (index === 3) {

        viewInfo.animate({
            top: screenheight + screenheight,
            duration: 500
        });

        pageWindow.animate({
            top: 0,
            duration: 500
        });
        activitiesView.animate({
            top: -120,
            duration: 250
        });
        optionView.animate({
            top: 0,
            duration: 250
        });
        viewContainer.animate({
            top: 70,
            duration: 250
        });
        show = false;
    }
});

var viewContainer = Ti.UI.createView({
	width:screenwidth,
	height:screenheight-70,
	top:70	
});

activitiesView.add(Bali.createActivitiesContent());
win.add(activitiesView);
win.add(optionView);

viewContainer.add(pageWindow);
viewContainer.add(viewInfo);

win.add(viewContainer);

win.open();