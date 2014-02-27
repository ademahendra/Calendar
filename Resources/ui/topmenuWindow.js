var activitiesJsons = '[ { "id": 1, "image": "L1.png", "name": "Volley Ball" ,"headerimage":"bgfun2.png" ,"url":"http://vb.icbali.com/leisure/volley.php" }, { "id": 2, "image": "L2.png", "name": "Surfing" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/surfing.php"}, { "id": 3, "image": "L3.png", "name": "Bungie Jumping","headerimage":"bgfun2.png","url":"http://vb.icbali.com/leisure/volley.php" }, { "id": 4, "image": "L4.png", "name": "Kids" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/kids.php"}, { "id": 5, "image": "L5.png", "name": "Swimming","headerimage":"bgfun2.png","url":"http://vb.icbali.com/leisure/volley.php" }, { "id": 6, "image": "L6.png", "name": "Water Sport" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/surfing.php"}, { "id": 7, "image": "L7.png", "name": "Diving" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/volley.php"}, { "id": 8, "image": "L1.png", "name": "Dancing" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/volley.php"}, { "id": 9, "image": "L2.png", "name": "Tennis","headerimage":"bgfun.png" ,"url":"http://vb.icbali.com/leisure/volley.php"}, { "id": 10, "image": "L3.png", "name": "Yoga","headerimage":"bgfun.png" ,"url":"http://vb.icbali.com/leisure/yoga.php"}, { "id": 11, "image": "L4.png", "name": "Fitness" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/volley.php"}, { "id": 12, "image": "L5.png", "name": "Balinese Dance" ,"headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/volley.php"}, { "id": 13, "image": "L6.png", "name": "Fishing","headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/volley.php" }, { "id": 14, "image": "L7.png", "name": "Bike Tour","headerimage":"bgfun.png","url":"http://vb.icbali.com/leisure/bike.php" } ]';
var activitiesJson = JSON.parse(activitiesJsons);

var videoJsons = '[ { "id": 1, "image": "interconthumb1.jpg", "video": "interconvideo.mp4" }, { "id": 2, "image": "interconthumb2.jpg", "video": "interconvideo2.mp4" }, { "id": 3, "image": "interconthumb3.jpg", "video": "Intercontinental.mp4" },{ "id": 4, "image": "interconthumb1.jpg", "video": "interconvideo.mp4" }, { "id": 5, "image": "interconthumb2.jpg", "video": "interconvideo2.mp4" }, { "id": 6, "image": "interconthumb3.jpg", "video": "Intercontinental.mp4" },{ "id": 7, "image": "interconthumb1.jpg", "video": "interconvideo.mp4" }, { "id": 8, "image": "interconthumb2.jpg", "video": "interconvideo2.mp4" }, { "id": 9, "image": "interconthumb3.jpg", "video": "Intercontinental.mp4" }]';
var videoJson = JSON.parse(videoJsons);

var galleryJsons = '[ { "id": 1, "image": "gallery1.jpg", "thumb": "gallery1.jpg" }, { "id": 2, "image": "gallery2.jpg", "thumb": "gallery2.jpg" }, { "id": 3, "image": "gallery3.jpg", "thumb": "gallery3.jpg" }, { "id": 4, "image": "gallery4.jpg", "thumb": "gallery4.jpg" }, { "id": 5, "image": "gallery5.jpg", "thumb": "gallery5.jpg" }, { "id": 6, "image": "gallery6.jpg", "thumb": "gallery6.jpg" }, { "id": 7, "image": "gallery7.jpg", "thumb": "gallery7.jpg" }, { "id": 8, "image": "gallery8.jpg", "thumb": "gallery8.jpg" }, { "id": 9, "image": "gallery9.jpg", "thumb": "gallery9.jpg" } ]';
var galleryJson = JSON.parse(galleryJsons);

Bali.createActivitiesContent = function () {
    var scrollview = Ti.UI.createScrollView({
        width: screenwidth - 10,
        height: 120,
        left: 0,
        top: 0,
        contentWidth: 'auto',
        contentHeight: 100,
        layout: 'horizontal',
        // backgroundColor:'#f1f1f1'
    });

    for (var i = 0; i < activitiesJson.length; i++) {
    	var activityContainer = Ti.UI.createView({
            width: 100,
            height: 120,
            name:activitiesJson[i].name,
            url:activitiesJson[i].url,
            headerimg:activitiesJson[i].headerimage,
       	});
       	 
        var activitiesOption = Ti.UI.createView({
            width: 81,
            height: 80,
            top: 5,
            // left: 10,
            backgroundImage: 'images/icon/'+activitiesJson[i].image,
            name:activitiesJson[i].name,
            url:activitiesJson[i].url,
            headerimg:activitiesJson[i].headerimage,
        });
        
        var activitynameLabel = Ti.UI.createLabel({
        	width: 100,
		    height: 30,
		    top:87,
		    backgroundColor:'transparent',
		    text: activitiesJson[i].name,
		    font: {
		        fontFamily: 'Helvetica Neue',
		        fontSize: 14,
		        fontWeight: 'normal'
		    },
		    color:'#fff',
		    textAlign:'center',

		    name:activitiesJson[i].name,
            url:activitiesJson[i].url,
            headerimg:activitiesJson[i].headerimage,
        });
        
        activityContainer.add(activitiesOption);
        activityContainer.add(activitynameLabel);
        
        activityContainer.addEventListener('click', function(e){
        	activitiesLabel.text = e.source.name;

        	webinfo.url = e.source.url;
        	
        	show = false;
	        activitiesView.animate({
	            top: -100,
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
        });

        scrollview.add(activityContainer);
    }
    return scrollview;
};
