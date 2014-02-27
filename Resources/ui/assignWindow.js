Bali.assignWindow = function(){
	var screenwidth = Ti.Platform.displayCaps.platformWidth;
	var screenheight = Ti.Platform.displayCaps.platformHeight;
	
		
	
	Titanium.UI.setBackgroundColor('#000');
		
	var win = Titanium.UI.createWindow({
	    title: 'Assign Guest',
	    backgroundColor: 'transparent',
	    // backgroundImage:'/images/bgpopup.png',
	    // backgroundImage:'/images/gallery/gallery1.jpg',
	    top: 0,
	    width:screenwidth,
	    height:screenheight,
	    fullscreen:true
	});
	
	var viewForm = Ti.UI.createView({
		width:screenwidth,
	    height:screenheight,
	    top:0,
	    left:0,
	    opacity:0,
	    // backgroundColor:'#fff',	
		backgroundImage:'/images/gallery/gallery1.jpg'        
	});
	
	var headerView = Ti.UI.createView({
		width:400,
	    height:50,
	    top:100,
	    backgroundColor:'#007aff'    
	});
	
	var searchView = Ti.UI.createView({
		width:400,
	    height:50,
	    top:150,
	    backgroundColor:'#fff',	
	    borderWidth:1,
	    borderColor:'#cccccc'    
	});
	
	var resultView = Ti.UI.createView({
		width:400,
	    height:50,
	    top:200,
	    backgroundColor:'#fff' 
	});
	
	var actionView = Ti.UI.createView({
		width:400,
	    height:50,
	    top:250,
	    backgroundColor:'#fff'    
	});	
	
	//header item
	var titleLabel = Ti.UI.createLabel({
        width: 400,
        color: '#fff',
        font: {
            fontFamily: 'Helvetica Neue',
            fontSize: 18,
            fontWeight: 'Normal'
        },
        text: 'Assign Guest',
        textAlign: 'center'
    });
    
    headerView.add(titleLabel);
	//end header item
	
	//search item
	var inputRoomNo = Ti.UI.createTextField({
		width:400,
		height:50,
		backgroundColor:'#fff',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_NONE,
		keyboardType:Ti.UI.KEYBOARD_NUMBER_PAD,
		returnKeyType:Ti.UI.RETURNKEY_SEARCH,
		hintText:'Room No.',
		paddingLeft:10,
		paddingRight:10
	});

	searchView.add(inputRoomNo);
	
	//end search item
	
	
	//animation
	var slideBottom = Ti.UI.createAnimation();
	slideBottom.opacity = 0;
	slideBottom.duration = 500;
		
	var slideTop = Ti.UI.createAnimation();
	slideTop.opacity = 1;
	slideTop.duration = 500;
	
	//end animation	
	
	var doneButton = Ti.UI.createButton({
		title:'Done',
		// right:10,
		width:100
	});
// 	
	doneButton.addEventListener('click', function(){
		checkGuest();
		
		
	    // viewForm.hide(); 
	});
	
	win.addEventListener('open', function(){
		// viewForm.show();
		viewForm.animate(slideTop);
		inputRoomNo.focus();
	});
	
	actionView.add(doneButton);
	
	viewForm.add(headerView);
	viewForm.add(searchView);
	viewForm.add(resultView);
	viewForm.add(actionView);
	
	win.add(viewForm);
	
	var closeWindow = function(){
		viewForm.animate(slideBottom);
	    setTimeout(function(e){
	        win.close();
	    }, 300);
	};
	
	
	var checkGuest = function(data){
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
			
			//assign user here
			
			//close window on success
			closeWindow();
		};
		
		xhr.onerror = function(e){
			//error alert
			alert('Error, Belum ada API nya');
		};
	};	
	
	return win;
};
