#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(HtmlTextViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(html, NSString)
RCT_EXPORT_VIEW_PROPERTY(onSizeChange, RCTDirectEventBlock)

@end
