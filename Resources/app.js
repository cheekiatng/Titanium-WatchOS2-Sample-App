var win = Ti.UI.createWindow({
	backgroundColor: 'white'
});

var eventsArea = Ti.UI.createTextArea({
  borderWidth: 2,
  borderColor: '#bbb',
  borderRadius: 5,
  color: '#888',
  font: {fontSize:16},
  textAlign: 'left',
  value: 'This is where we listen for events',
  bottom: 10,
  width: 300, height : 140
});

win.add(eventsArea);


var watchSession = Ti.App.iOS.createWatchSession();

var imageView = Ti.UI.createImageView ({
	top: 240,
	width: 80,
	height: 80
});

win.add(imageView);

var statusBtn = Ti.UI.createButton({
	title: 'status me',
	top: 40
});

statusBtn.addEventListener('click', function(e) {
	eventsArea.value += '\nbtn pressed '
	+ '\nwatchOS2 is supported: ' + watchSession.isSupported
	+ '\nwatch is paired: ' + watchSession.isPaired
	+ '\nwatchApp is installed: ' + watchSession.isWatchAppInstalled
	+ '\nwatchComplication is enabled: ' + watchSession.isComplicationEnabled
	+ '\nwatch is reachable: ' + watchSession.isReachable
	+ '\nMost recent app context: ' + JSON.stringify(watchSession.recentAppContext);
})
win.add(statusBtn);

var sendMsgBtn = Ti.UI.createButton({
	title: 'send Message to watch',
	top: 80
});

sendMsgBtn.addEventListener('click', function(e) {
	watchSession.sendMessage({
		message: {
			message: 'Hi',
			from: 'app',
			type: 'message'
		}
	});
});

var sendUserInfoBtn = Ti.UI.createButton({
	title: 'send User Info to watch',
	top: 120
});

sendUserInfoBtn.addEventListener('click', function(e) {
	watchSession.transferUserInfo({
		userInfo: {
			data: 'user info from app',
			created: '2015'
		}
	});
});

var sendAppContextBtn = Ti.UI.createButton({
	title: 'update app context to watch',
	top: 160
});

sendAppContextBtn.addEventListener('click', function(e) {
	//only the latest appContext is registered. Send 2 to test.
	watchSession.updateAppContext({
		appContext: {
			status: 'AppContext from app',
			updates: 2
		}
	});
});

var sendFileBtn = Ti.UI.createButton({
	title: 'send File to watch',
	top: 200
});

sendFileBtn.addEventListener('click', function(e) {
	watchSession.transferFile({
		fileURL: '/images/default_app_logo.png',
		metaData: {
			data: 'appcelerator logo'
		}
	});
});

watchSession.addEventListener('watchSessionReceivedMessage', function(e) {
	eventsArea.value += '\nwatchSessionReceivedMessage '
	+ '\n' + JSON.stringify(e);
});

watchSession.addEventListener('watchSessionReceivedUserInfo', function(e) {
	eventsArea.value += '\nwatchSessionReceivedUserInfo '
	+ '\n' + JSON.stringify(e);	
});

watchSession.addEventListener('watchSessionReceivedFile', function(e) {
	eventsArea.value += '\nwatchSessionReceivedFile '
	+ '\n' + JSON.stringify(e);
	//original implementation
//	file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, e.fileName);
//	imageView.setImage(file);
    //new implementation
    var cacheFile = e.data.getFile();
    var downloadedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFile.getName());
    downloadedFile.write(e.data);	
    imageView.setImage(downloadedFile);
});

watchSession.addEventListener('watchSessionReceivedAppContext', function(e) {
	eventsArea.value += '\nwatchSessionReceivedAppContext '
	+ '\n' + JSON.stringify(e);	
});

watchSession.addEventListener('watchStateChanged', function(e) {
	eventsArea.value += '\nwatchStateChanged '
	+ '\n' + JSON.stringify(e);		
});

watchSession.addEventListener('watchReachabilityChanged', function(e) {
	eventsArea.value += '\nwatchReachabilityChanged '
	+ '\n' + JSON.stringify(e);		
});

watchSession.addEventListener('watchSessionFinishedFileTransfer', function(e) {
	eventsArea.value += '\nwatchSessionFinishedFileTransfer '
	+ '\n' + JSON.stringify(e);		
});

watchSession.addEventListener('watchSessionFinishedUserInfoTransfer', function(e) {
	eventsArea.value += '\nwatchSessionFinishedUserInfoTransfer '
	+ '\n' + JSON.stringify(e);		
});
win.add(sendMsgBtn);
win.add(sendUserInfoBtn);
win.add(sendFileBtn);
win.add(sendAppContextBtn);

win.open();