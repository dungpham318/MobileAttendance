
#import "WifiModule.h"
#import <SystemConfiguration/CaptiveNetwork.h>
#import <React/RCTLog.h>

@implementation WifiModule

// To export a module named RCTCalendarModule
RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getWifiInfo)
{

      NSArray *ifs = (__bridge_transfer id)CNCopySupportedInterfaces();
      NSLog(@"interfaces:%@",ifs);
      NSDictionary *info = nil;
      for (NSString *ifname in ifs) {
          info = (__bridge_transfer NSDictionary *)CNCopyCurrentNetworkInfo((__bridge CFStringRef)ifname);
          NSLog(@"%@ => %@",ifname,info);
      }
   
    return info;
}


@end
