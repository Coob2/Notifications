var notification_count=0;

$(document).on('pageinit', function() {

	$('#messageButton').on('click', function() {
		createMessage();
	});

	$('#dialogButton').on('click', function() {
		createDialog();
	});

	$('#notificationButton').on('click', function() {
		createNotification();
	});

});

function createMessage(){
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    new Toast({content: 'It\'s a rock lobster.', duration: 10000});
}

function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example
 	console.log("Dialog");
	navigator.notification.confirm(
    	'What do you feel like doing at the moment?',  // message
        dialogDismissed,         // callback
        'How are you feeling?',            // title
        ['Take a break!', 'Continue work.', 'FOOD!!!']                  // buttons
    );

}

function dialogDismissed(buttonIndex) {

	if(buttonIndex==1) new Toast({content: "You're only allowed 15 minutes.", duration: 3000});
   	else if(buttonIndex==2) new Toast({content: 'Work is boring.', duration: 3000});
		else if(buttonIndex==3) new Toast({content: 'Its food time!', duration: 3000});

}

function createNotification() {
	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + 30000); //delayed time  - add 1 second

    //
    //setup notification
    //

    cordova.plugins.notification.local.schedule({
    	id: 		1,
        title: 		"Hello " + navigator.userAgent,
        message: 	"This is an example notification",
        date: 		notificationTime,
        badge: 		notification_count++
   	});

}
