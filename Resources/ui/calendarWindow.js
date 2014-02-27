var createHoursView = function () {
    var hourView = Ti.UI.createView({
        width: 75,
        height: 1440,
        // top:40,
        backgroundImage: 'images/hours.png',
        layout: 'vertical'
    });
    for (var i = 0; i < 24; i++) {
        var hourLabel = Ti.UI.createLabel({
            width: 75,
            height: 60,
            // borderWidth:1,
            // bordercolor:'#f1f1f1',
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 11,
                fontWeight: 'normal'
            },
            text: Bali.datetime.formatTime(i),
            textAlign: 'center'
        });
        hourView.add(hourLabel);
    }

    return hourView;
};

var createScheduleView = function (data) {

    var viewSchedule = Ti.UI.createView({
        width: data.viewwidth,
        height: data.minutes,
        top: data.y,
        left: 0,
        backgroundColor: '#7FC33A',
        borderWidth: 1,
        borderColor: '#7FC33A'
    });

    return viewSchedule;
};

var createDateView = function (data) {
    var dateHeaderView = Ti.UI.createView({
        width: (screenwidth - 75) / data.totalstay - 1,
        height: 40,
        // borderWidth:1,
        // borderColor:'#acacac',
        backgroundColor: '#eeeeee',
        color: '#333333'
    });

    var today = new Date();

    var dateLabel = Ti.UI.createLabel({
        width: (screenwidth - 75) / data.totalstay,
        height: 40,
        top: 0,
        color: '#333333',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 12,
            fontWeight: 'Normal'
        },
        text: Bali.datetime.dateHeaderCalendar(data.firstdate),
        textAlign: 'center'
    });
    // Ti.API.info(today + ' : ' + data.firstdate+' totalstay:'+data.totalstay);
    
    var todayF = today.getDate() + '-' + today.getMonth() + '-' + today.getFullYear();
    var dateDayF = data.firstdate.getDate() + '-' + data.firstdate.getMonth() + '-' + data.firstdate.getFullYear();
    
    if (todayF === dateDayF) {
        dateLabel.color = '#0074e6';
    }

    if (data.firstdate.getDay() === 0 || data.firstdate.getDay() === 6) {
        dateLabel.color = '#ff2e2e';
    }

    dateHeaderView.add(dateLabel);
    return dateHeaderView;
};

var createDaysView = function (data) {
    viewwidth = (screenwidth - 75) / data.totalstay;
    var dayView = Ti.UI.createView({
        width: viewwidth,
        height: 1440,
        borderWidth: 0.5,
        borderColor: '#dbdbdb',
        backgroundImage: 'images/daybg.png',
        date:data.firstdate
    });

	if(data.disable == true){
		if(data.halflast == true){
			var parameter = {
				top:1440/2 + 60,
				width:viewwidth,
				height:1440/2 - 60
			};
		} else if(data.halffirst == true){
			var parameter = {
				top:0,
				width:viewwidth,
				height:1440/2 + 120
			};
		} else {
			var parameter = {
				top:0,
				width:viewwidth,
				height:1440
			};
		}
		dayView.add(createDisableView(parameter));
	}
	
    dayView.addEventListener('longpress', function (e) {
        var y = e.y;
        var minutes = Math.floor((Math.random() * 4) + 1) * 60;
        var parameter = {
        	viewwidth:viewwidth,
        	minutes:minutes,
        	y:y
        };
        // this.add(createScheduleView(parameter));
		var bookedParam = {
			source:'calendar',
			date:e.source.date
		};
		var addwindow = Bali.addactivityWindow(bookedParam);
		addwindow.open();
    });
    
    return dayView;
};

var createFooterView = function (pageweek, datebegin, dateend) {
    var footerContainer = Ti.UI.createView({
        width: 500,
        height: 40,
        top: 0
    });

    var weekdateLabel = Ti.UI.createLabel({
        width: 400,
        textAlign: 'center',
        text: Bali.datetime.shortDateiPad(datebegin) + ' - ' + Bali.datetime.shortDateiPad(dateend),
        color: '#333333',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 14,
            fontWeight: 'bold'
        },
    });

    var leftArrow = Ti.UI.createImageView({
        width: 25,
        height: 25,
        left: 10,
        image: 'images/arrowleft.png'
    });

    var rightArrow = Ti.UI.createImageView({
        width: 25,
        height: 25,
        right: 10,
        image: 'images/arrowright.png'
    });

    // leftArrow.addEventListener('click', function () {
        // pageWindow.scrollToView(0);
    // });
// 
    // rightArrow.addEventListener('click', function () {
        // pageWindow.scrollToView(2);
    // });
// 
    // footerContainer.add(leftArrow);
    // footerContainer.add(rightArrow);
    footerContainer.add(weekdateLabel);

    return footerContainer;
};

var createDisableView = function(data){
	var container = Ti.UI.createView({
		width: data.width,
		height:data.height,
		top:data.top,
		backgroundColor:'#ccc',
		opacity:0.7
	});		
	return container;
};

var createDisableActivities = function(data){
	var container = Ti.UI.createView({
		width: data.width,
		height:data.height,
		top:data.top,
		backgroundColor:'red',
		opacity:0.4
	});
	return container;
};

Bali.createPageView = function (data) {
    var container = Ti.UI.createView({
        width: screenwidth,
        height: screenheight - 70,
        top: 0,
        backgroundColor: '#f0f0f0',
        year: data.yearday,
        week: data.weekday
    });

    var scrollview = Ti.UI.createScrollView({
        width: screenwidth,
        height: screenheight - 150,
        contentHeight: 1440,
        layout: 'horizontal',
        top: 40,
        tintColor:'#f0f0f0'
    });

    var dateHeader = Ti.UI.createView({
        width: screenwidth,
        height: 40,
        top: 0,
        backgroundColor: '#eeeeee',
        layout: 'horizontal'
    });

    var hourHeader = Ti.UI.createView({
        width: 75,
        height: 40,
        left: 0,
        backgroundColor: '#eeeeee',
    });
    dateHeader.add(hourHeader);

    var weekFooter = Ti.UI.createView({
        width: screenwidth,
        height: 40,
        bottom: 0,
        backgroundColor: '#eeeeee',
        opacity:0.5
    });

    var loadingView = Ti.UI.createView({
        width: screenwidth,
        height: screenheight - 40,
        backgroundColor: '#bbbbbb',
        opacity: 0.9,
        borderWidth: 1,
        borderColor: '#8a8a8a'
    });

    firstdate = data.dateCheckIn;
	Ti.API.info('1. firstdate:> '+firstdate);

    var dateWeekB = new Date(data.dateCheckIn);    
    var datebegin = new Date(data.dateCheckIn);//new Date(dateWeekA.setDate(dateWeekA.getDate())); // checkin date
    var datelong = 6;
    if(data.totalstay < 7){
    	datelong = data.totalstay - 1;
    }
    var dateend = new Date(dateWeekB.setDate(dateWeekB.getDate() + datelong)); // checkout date
    
    var labelDate = Bali.datetime.shortDateiPad(datebegin) + ' - ' + Bali.datetime.shortDateiPad(dateend);

    var pleaseWait = Ti.UI.createLabel({
        color: '#333333',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 22,
            fontWeight: 'bold'
        },
        text: '(Week ' + data.weekday + ')\n' + labelDate,
        height: 100,
        width: 400,
        textAlign: 'center'
    });

    scrollview.add(createHoursView());
    Ti.API.info('2. firstdate:> '+firstdate);
    firstdate = new Date(firstdate.setDate(firstdate.getDate() - 1));
    Ti.API.info('3. firstdate:> '+firstdate);
    totalstay = data.totalstay;
	if(data.totalstay > 7){
		totalstay = 7;
	} else {
		totalstay = data.totalstay;
	}
	
	
    for (var i = 0; i < totalstay; i++) {
        firstdate = new Date(firstdate.setDate(firstdate.getDate() + 1));
        
        var disable = false;
        var halflast = false;
        var halffirst = false;
        if(Bali.disabledatelast >= data.totalstay - 1){
        	disable = true;
        	if(Bali.disabledatelast == data.totalstay - 1){
        		halflast = true;
        	}
        }
        if(Bali.disabledatelast == 0){
        	disable = true;
        	halffirst = true;
        }
        Ti.API.info(Bali.disabledatelast+'. disable:'+disable+' :firstdate: '+firstdate);
        var parameter = {
        	firstdate:firstdate,
        	totalstay:totalstay,
        	disable:disable,
        	halflast:halflast,
        	halffirst:halffirst
        };
        dateHeader.add(createDateView(parameter));
        scrollview.add(createDaysView(parameter));
        
        Bali.disabledatelast++; 
    }

    weekFooter.add(createFooterView(data.weekday, datebegin, dateend));
    container.add(dateHeader);
    container.add(scrollview);
    container.add(weekFooter);

    return container;
};
