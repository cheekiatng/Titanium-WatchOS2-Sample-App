//
//  InterfaceController.h
//  SGDemoWatchOS2 WatchApp Extension
//
//  Created by Chee Kiat Ng on 8/15/2015.
// Copyright (c) 2015 by Appcelerator, Inc. All Rights Reserved.
//

#import <WatchKit/WatchKit.h>
#import <Foundation/Foundation.h>
#import <WatchConnectivity/WatchConnectivity.h>

@interface InterfaceController : WKInterfaceController <WCSessionDelegate> {
    WCSession *watchSession;
    NSString *backgroundSavedString;
    NSData *imageData;
}
@property (strong, nonatomic) IBOutlet WKInterfaceLabel *titaniumLabel;
@property (strong, nonatomic) IBOutlet WKInterfaceButton *titaniumButton;
@property (strong, nonatomic) IBOutlet WKInterfaceImage *titaniumImage;

-(IBAction)sendMsgButtonPressed:(id)sender;
-(IBAction)sendUserInfoButtonPressed:(id)sender;
-(IBAction)sendFileButtonPressed:(id)sender;
-(IBAction)sendAppContextButtonPressed:(id)sender;
@end
