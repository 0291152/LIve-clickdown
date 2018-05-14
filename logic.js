// Initialize Firebase
var config = {
	apiKey: "AIzaSyCUgKNATIy6ihsiENKrZGwF-jBADMj0mvE",
	authDomain: "live-clickdown-ag.firebaseapp.com",
	databaseURL: "https://live-clickdown-ag.firebaseio.com",
	projectId: "live-clickdown-ag",
	storageBucket: "live-clickdown-ag.appspot.com",
	messagingSenderId: "768598902268"
	};

firebase.initializeApp(config);



var database = firebase.database();

var connectionsRef = database.ref("/connections");

var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap){
	if(snap.val()){
		var can = connectionsRef.push(true);

		con.onDisconnect().remove();

	}
});

connectionsRef.on("value", function(snap){
	$("#watchers").html(snap.numChildren());

});

var initialValue = 100;
var clickCounter = initialValue;
database.ref("/clicks").on("value", function(snapshot){

	console.log(snapshot.val());

	clickCounter = snapshot.val().clickCount;

	console.log(clickCounter);

	$("#click-value").html(snapshot.val().clickCount);

	$("#click-value").html(clickCounter);

}, function(errorObject) {
	console.log("The read failed: " + errorObject.code);
});



$('#click-button').on("click", function(){

	clickCounter--;

	 if (clickCounter === 0){
	 	alert("Phew! You made it! The was a lot of clicking, i hope you're ok");
	 	clickCounter = initialValue;

	 } database.ref('/clicks').set({
	 	clickCount: clickCounter

	 });
	 console.log(clickCounter);
});

$('#restart-button').on('click', function(){

	clickCounter = initialValue;

	database.ref('/clicks').set({
		clickCount: clickCounter
	});

	console.log(clickCounter);

	$('#click-value').html(clickCounter);


});

