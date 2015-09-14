//
//  InterfaceController.m
//  SGDemoWatchOS2 WatchApp Extension
//
//  Created by Chee Kiat Ng on 8/15/2015.
// Copyright (c) 2015 by Appcelerator, Inc. All Rights Reserved.
//

#import "InterfaceController.h"


@interface InterfaceController()

@end


@implementation InterfaceController

- (void)awakeWithContext:(id)context {
    [super awakeWithContext:context];
    
    // Configure interface objects here.
}

- (void)willActivate {
    // This method is called when watch view controller is about to be visible to user
    [super willActivate];
    
    if ([WCSession isSupported] && watchSession == nil) {
        watchSession = [WCSession defaultSession];
        watchSession.delegate = self;
        [watchSession activateSession];
    }
    
    if (watchSession == nil) {
        return;
    }
    
    if (backgroundSavedString != nil) {
        _titaniumLabel.text = [NSString stringWithFormat:@"(background)%@",backgroundSavedString] ;
    }
    if (imageData != nil) {
        _titaniumLabel.text = [NSString stringWithFormat:@"(background)%@",backgroundSavedString] ;
        [_titaniumImage setImageData:imageData];
    }
}

- (void)didDeactivate {
    // This method is called when watch view controller is no longer visible
    [super didDeactivate];
}

#pragma mark watch methods
-(IBAction)sendMsgButtonPressed:(id)sender
{
    [watchSession sendMessage:[NSDictionary dictionaryWithObjectsAndKeys:@"Hi from watch",@"message", nil] replyHandler:nil errorHandler:nil];
}

-(IBAction)sendFileButtonPressed:(id)sender
{
    NSURL *fileURL = [[NSBundle mainBundle] URLForResource:@"thumbUp" withExtension:@"png"];
    [watchSession transferFile:fileURL metadata:[NSDictionary dictionaryWithObjectsAndKeys:@"thumbup",@"data",nil]];
}

-(IBAction)sendAppContextButtonPressed:(id)sender
{
    //only latest appContext is registered.
    [watchSession updateApplicationContext:[NSDictionary dictionaryWithObjectsAndKeys:@"App context from watch",@"status", nil] error:nil];
}

-(IBAction)sendUserInfoButtonPressed:(id)sender
{
    [watchSession transferUserInfo:[NSDictionary dictionaryWithObjectsAndKeys:@"User Info from watch",@"data", nil]];
}

#pragma mark watch delegates
- (void)session:(nonnull WCSession *)session didReceiveMessage:(nonnull NSDictionary<NSString *,id> *)message
{
    _titaniumLabel.text = [NSString stringWithFormat:@"Received Message: %@",[message objectForKey:@"message"]] ;
    backgroundSavedString = nil;
}

- (void)session:(WCSession *)session didReceiveMessage:(NSDictionary<NSString *,id> *)message replyHandler:(void (^)(NSDictionary<NSString *,id> * _Nonnull))replyHandler
{
    _titaniumLabel.text = [NSString stringWithFormat:@"Received Message: %@. Replying now.",[message objectForKey:@"message"]] ;
    backgroundSavedString = nil;
    replyHandler([NSDictionary dictionaryWithObject:@"replyHandled from watch" forKey:@"message"]);
}

- (void)session:(nonnull WCSession *)session didReceiveUserInfo:(nonnull NSDictionary<NSString *,id> *)userInfo
{
    //if in foreground just change text immediately
    _titaniumLabel.text = [NSString stringWithFormat:@"(foreground)Received User Info : %@",[userInfo objectForKey:@"data"]];
    backgroundSavedString = [NSString stringWithFormat:@"Received User Info: %@",[userInfo objectForKey:@"data"]];
    
}

- (void)session:(WCSession * _Nonnull)session didFinishUserInfoTransfer:(nonnull WCSessionUserInfoTransfer *)userInfoTransfer error:(nullable NSError *)error
{
    _titaniumLabel.text = [NSString stringWithFormat:@"Finished sending User Info: %@",userInfoTransfer.description] ;
}

- (void)session:(nonnull WCSession *)session didReceiveFile:(nonnull WCSessionFile *)file
{
    NSURL *url = [file fileURL];
    imageData = [NSData dataWithContentsOfURL:url];
    [_titaniumImage setImageData:imageData];
    _titaniumLabel.text = [NSString stringWithFormat:@"(foreground)Received image File : %@",file.description] ;
    backgroundSavedString = [NSString stringWithFormat:@"Received image File: %@",file.description] ;
}

- (void)session:(nonnull WCSession *)session didFinishFileTransfer:(nonnull WCSessionFileTransfer *)fileTransfer error:(nullable NSError *)error
{
    _titaniumLabel.text = [NSString stringWithFormat:@"Finished sending file: %@",fileTransfer.description] ;
}

- (void)session:(nonnull WCSession *)session didReceiveApplicationContext:(nonnull NSDictionary<NSString *,id> *)applicationContext
{
    _titaniumLabel.text = [NSString stringWithFormat:@"(foreground)Received App Context: %@",[applicationContext objectForKey:@"status"]] ;
    backgroundSavedString = [NSString stringWithFormat:@"Received App Context: %@",[applicationContext objectForKey:@"status"]] ;
    
}
@end



