Bali.addactivityWindow = function(param){
	var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	
	Titanium.UI.setBackgroundColor('#000');
		
	var win = Titanium.UI.createWindow({
	    title: 'Add Activity',
	    backgroundColor: 'transparent',
	    backgroundImage:'/images/bgpopup.png',
	    top: 0,
	    width:screenwidth,
	    height:screenheight,
	    fullscreen:true
	});
	
	var viewForm = Ti.UI.createView({
		width:624,
	    height:screenheight-100,
	    top:screenheight,
	    backgroundColor:'#fff',	 
	    borderWidth:1,
	    borderRadius:5,
	    borderColor:'#f1f1f1'   
	});
	
	var headerView = Ti.UI.createView({
		width:624,
	    height:50,
	    top:0,
	    backgroundColor:'#007aff',	
	    // borderWidth:1,
	    // borderColor:'#cccccc'    
	});	
	
	//header item
	var titleLabel = Ti.UI.createLabel({
        width: 624,
        color: '#fff',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 18,
            fontWeight: 'Normal'
        },
        text: 'Booked Activity',
        textAlign: 'center'
    });
    
    headerView.add(titleLabel);
	//end header item	
	
	var scrollContent = Ti.UI.createScrollView({
		width:624,
	    height:screenheight-150,
	    top:50,
	    contentWidth:624,
	    contentHeight:'auto',
	    layout:'vertical'
	});
	
	//activity view
	
	var activityView = Ti.UI.createView({
		width:624,
		height:140,
		backgroundColor:'#fff',
		borderColor:'#ccc',
		borderWidth:1,
		top:0
	});
	
	var activityImage = Ti.UI.createImageView({
		top:20,
		left:20,
		width:81,
		height:80,
		image:'images/icon/L1.png'
	});
	
	var labelActivityName = Ti.UI.createLabel({
        width: 80,
        color: '#000',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 14,
            fontWeight: 'Normal'
        },
        text: 'Volley',
        textAlign: 'center',
        left:20,
        top:105,
    });
	
	var labelName = Ti.UI.createLabel({
        width: 500,
        color: '#000',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 26,
            fontWeight: 'Normal'
        },
        text: 'Mr. Tim Cook',
        textAlign: 'left',
        left:120,
        top:20,
    });
    
    var labelRoom = Ti.UI.createLabel({
        width: 500,
        color: '#000',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 24,
            fontWeight: 'Normal'
        },
        text: 'Room No.: 8114',
        textAlign: 'left',
        left:120,
        top:55,
    });
    
    activityView.add(activityImage);
    activityView.add(labelActivityName);
    activityView.add(labelName);
    activityView.add(labelRoom);
	
	//end acitvity view
	
	//booked detail
	var bookedView = Ti.UI.createView({
		width:624,
		height:400,
		backgroundColor:'#fff',
		borderColor:'#ccc',
		borderWidth:1,
		top:0,
		// layout:'vertical'
	});
	
	var sessionView = Ti.UI.createScrollView({
		width:624,
		height:400,
		contentHeight:400,
		contentwidth:'auto',
		backgroundColor:'#fff',
		top:0,
		// layout:'vertical'
	});
	
	var createDateHeader = function(data, daywidth){
		var headerContainer = Ti.UI.createView({
			width:daywidth,
			height:50,
			left:0
		});

		var labelDate = Ti.UI.createLabel({
            width: daywidth,
            height: 60,
            // borderWidth:1,
            // bordercolor:'#f1f1f1',
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 11,
                fontWeight: 'normal'
            },
            text: Bali.datetime.dateHeaderCalendar(data),
            textAlign: 'center'
        });
        
        headerContainer.add(labelDate);
        return headerContainer;
	};
	
	var sendBooking = function(data){
		var xhr = Titanium.Network.createHTTPClient();
		var apiurl = '';
		Ti.API.info('URL : '+apiurl);
		var params = {
			'lang' : 'EN'
		};
		xhr.open('POST', apiurl);
		xhr.send(params);
		Ti.API.info('Send Params');
		xhr.onload = function(){
			Ti.API.info('Response : '+this.responseText);
			var json = JSON.parse(this.responseText);
		};
		
		xhr.onerror = function(e){
			//error alert
		};
	};
	
	var createDayView = function(data){
		var dayContainer = Ti.UI.createScrollView({
			width:data.daywidth,
			height:350,
			contentWidth:150,
			contentHeight:'auto',
			layout:'vertical',
			borderColor:'#f1f1f1',
			borderWidth:1,
			left:0
		});
		
		var params = {
			name:'Steve Jobs',
			timefrom:'09.00',
			timeto:'12.00'
		};
		var loop = Math.floor((Math.random() * 5) + 1);
		for(var i = 0;i < loop;i++){
			dayContainer.add(createInstructurView(params));
		}	
		return dayContainer;
	};
	
	var dateheader = function(data){
		var dateContainer = Ti.UI.createView({
			width:data.width,
			height:50,
			layout:'vertical',
			backgroundColor:'#f1f1f1',
			top:0,
			layout:'horizontal'
		});
		return dateContainer;
	};
	
	var daycontainer = function(data){
		var dateContainer = Ti.UI.createView({
			width:data.width,
			height:350,
			layout:'vertical',
			borderColor:'#f1f1f1',
			borderWidth:1,
			top:50,
			layout:'horizontal'
		});
		return dateContainer;
	};
	
	var selectedObject = null;
	
	var createInstructurView = function(data){
		var instructurContainer = Ti.UI.createView({
			// width:data.width,
			height:75,
			layout:'vertical',
			borderColor:'#8AC53F',
			borderWidth:1,
			borderRadius:5,
			backgroundColor:'#8AC53F',
			top:5,
			left:5,
			right:5,
			layout:'horizontal'
		});
		
		var labelName = Ti.UI.createLabel({
            color:'#fff',
            height:30,
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 14,
                fontWeight: 'normal'
            },
            text: data.name,
            textAlign: 'center',
            top:5,
            left:5,
            right:5
        });

		var labelTime = Ti.UI.createLabel({
            color:'#fff',
            height:30,
            font: {
                fontFamily: 'Helvetica Neue',
                fontSize: 12,
                fontWeight: 'normal'
            },
            text: data.timefrom+' - '+data.timeto,
            textAlign: 'center',
            bottom:5,
            left:5,
            right:5
        }); 
		
		instructurContainer.add(labelName);
		instructurContainer.add(labelTime);
		
		instructurContainer.addEventListener('click', function(e){
			if(selectedObject != null){
				selectedObject.backgroundColor = '#8AC53F';
				selectedObject.borderColor = '#8AC53F';
			};
			this.backgroundColor = '#FF0066';
			this.borderColor = '#FF0066';
			selectedObject = this;
			Ti.API.info('Session View Children:  '+sessionView.children.length);
		});
		return instructurContainer;
	};
	
	var displaySession = function(data){
		var dt  = data.checkin.split(/\-|\s/);
	    var datecheckin = new Date(dt.slice(0,3).reverse().join('/')+' '+dt[3]);
	    var dtout  = data.checkout.split(/\-|\s/);
	    var datecheckout = new Date(dtout.slice(0,3).reverse().join('/')+' '+dtout[3]);
	    
		var checkin = new Date(datecheckin);
		var checkout = new Date(datecheckout);
		var daystay = Bali.totalStay(checkin, checkout);
		
		if(param.source === 'button'){
			var parameter = {
				width:(daystay+1) * 150,
				checkin:checkin,
				daywidth:150
			};
			var dateheaderView = dateheader(parameter);
			var daycontainerView = daycontainer(parameter);
			
			checkin = new Date(checkin.setDate(checkin.getDate()-1));
			for(var i = 0; i <= daystay; i++){
				checkin = new Date(checkin.setDate(checkin.getDate()+1));
				dateheaderView.add(createDateHeader(checkin,150));
				daycontainerView.add(createDayView(parameter));
			}
		} else if(param.source === 'calendar') {
			var parameter = {
				width:624,
				checkin:param.date,
				daywidth:624
			};
			
			var dateheaderView = dateheader(parameter);
			var daycontainerView = daycontainer(parameter);			

			checkin = new Date(param.date);
			dateheaderView.add(createDateHeader(checkin,624));
			daycontainerView.add(createDayView(parameter));

		}
		sessionView.add(dateheaderView);
		sessionView.add(daycontainerView);
	};
	
	displaySession(guestlist[0]);	//guestlist di ganti activity data
	
	bookedView.add(sessionView);
	
	var slideBottom = Ti.UI.createAnimation();
	slideBottom.top = screenheight;
	slideBottom.duration = 300;
		
	var slideTop = Ti.UI.createAnimation();
	slideTop.top = 50;
	slideTop.duration = 300;	
	
	var doneButton = Ti.UI.createButton({
		title:'Cancel',
		top:10,
		width:100
	});
	
	doneButton.addEventListener('click', function(){
		viewForm.animate(slideBottom);
	    setTimeout(function(e){
	        win.close();
	    }, 300); 
	});
	
	win.addEventListener('open', function(){
		viewForm.animate(slideTop);
	});
	
	scrollContent.add(activityView);
	scrollContent.add(bookedView);
	scrollContent.add(doneButton);
	viewForm.add(headerView);
	viewForm.add(scrollContent);
	win.add(viewForm);
	
	return win;
};
