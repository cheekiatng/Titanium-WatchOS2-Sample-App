Ti.WatchSession.activateSession();

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
    + '\nwatchOS2 is supported: ' + Ti.WatchSession.isSupported
    + '\nwatch is paired: ' + Ti.WatchSession.isPaired
    + '\nwatchApp is installed: ' + Ti.WatchSession.isWatchAppInstalled
    + '\nwatchComplication is enabled: ' + Ti.WatchSession.isComplicationEnabled
    + '\nwatch is reachable: ' + Ti.WatchSession.isReachable
    + '\nMost recent app context: ' + JSON.stringify(Ti.WatchSession.recentApplicationContext);
})
win.add(statusBtn);

var sendMsgBtn = Ti.UI.createButton({
    title: 'send Message with onReply to watch',
    top: 80
});

sendMsgBtn.addEventListener('click', function(e) {
    Ti.WatchSession.sendMessage({
        message: {
            message: 'Hi',
            from: 'app',
            type: 'messageWithReply'           
        },
        onReply: function(e) {
            eventsArea.value += '\nreceive immediate message reply '
            + '\n' + JSON.stringify(e);           
        }
    });
});

var sendMsgBtn2 = Ti.UI.createButton({
    title: 'send Message to watch',
    top: 120
});

sendMsgBtn2.addEventListener('click', function(e) {
    Ti.WatchSession.sendMessage({
        message: {
            message: 'Hi',
            from: 'app',
            type: 'messageWithoutReply'           
        }
    });
});

var sendUserInfoBtn = Ti.UI.createButton({
    title: 'send User Info to watch',
    top: 160
});

sendUserInfoBtn.addEventListener('click', function(e) {
    Ti.WatchSession.transferUserInfo({
        data: 'user info from app',
        created: '2015'
    });
});

var sendAppContextBtn = Ti.UI.createButton({
    title: 'update app context to watch',
    top: 200
});

sendAppContextBtn.addEventListener('click', function(e) {
    Ti.WatchSession.updateApplicationContext({
        status: 'Application Context from app',
        updates: 2
    });
});

var sendFileBtn = Ti.UI.createButton({
    title: 'send File to watch',
    top: 240
});

sendFileBtn.addEventListener('click', function(e) {
    Ti.WatchSession.transferFile({
        fileURL: '/images/default_app_logo.png',
        metaData: {
            data: 'appcelerator logo'
        }
    });
});

Ti.WatchSession.addEventListener('receivemessage', function(e) {
    eventsArea.value += '\nreceive message '
    + '\n' + JSON.stringify(e.message);
});

Ti.WatchSession.addEventListener('receiveuserinfo', function(e) {
    eventsArea.value += '\nreceiveuserinfo '
    + '\n' + JSON.stringify(e);
});

Ti.WatchSession.addEventListener('receivefile', function(e) {
    eventsArea.value += '\nreceivefile ' + '\n' + JSON.stringify(e);
    var cacheFile = e.data.getFile();
    var downloadedFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, cacheFile.getName());
    downloadedFile.write(e.data);
    imageView.setImage(downloadedFile);
});

Ti.WatchSession.addEventListener('receiveapplicationcontext', function(e) {
    eventsArea.value += '\nreceiveapplicationcontext '
    + '\n' + JSON.stringify(e);
});

Ti.WatchSession.addEventListener('watchstatechanged', function(e) {
    eventsArea.value += '\nwatchstatechanged '
    + '\n' + JSON.stringify(e);
});

Ti.WatchSession.addEventListener('reachabilitychanged', function(e) {
    eventsArea.value += '\nreachabilitychanged '
    + '\n' + JSON.stringify(e);
});

Ti.WatchSession.addEventListener('finishfiletransfer', function(e) {
    eventsArea.value += '\nfinishfiletransfer '
    + '\n' + JSON.stringify(e);
});

Ti.WatchSession.addEventListener('finishuserinfotransfer', function(e) {
    eventsArea.value += '\nfinishuserinfotransfer '
    + '\n' + JSON.stringify(e);
});
win.add(sendMsgBtn);
win.add(sendMsgBtn2);
win.add(sendUserInfoBtn);
win.add(sendFileBtn);
win.add(sendAppContextBtn);

win.open();