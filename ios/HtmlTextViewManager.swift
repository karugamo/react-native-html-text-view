import Foundation
import React
import UIKit

@objc(HtmlTextViewManager)
class HtmlTextViewManager: RCTViewManager {
  override func view() -> UIView! {
    let htmlView = HTMLTextView()
    htmlView.isSelectable = true
    htmlView.isEditable = false
    htmlView.isScrollEnabled = false
    htmlView.textContainerInset = .zero
    htmlView.textContainer.lineFragmentPadding = 0
    htmlView.backgroundColor = .clear
    htmlView.isUserInteractionEnabled = true
    htmlView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    return htmlView
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

class HTMLTextView: UITextView {
  @objc var onSizeChange: RCTDirectEventBlock?

  func updateSize(width: CGFloat, height: CGFloat, forView htmlView: HTMLTextView) {
    if let reactTag = htmlView.reactTag {
      self.onSizeChange?([
        "reactTag": reactTag,
        "width": width,
        "height": height
      ])
    }
  }

  @objc var html: String? {
    didSet {
      guard let html = html else { return }
      let data = Data(html.utf8)
      let options: [NSAttributedString.DocumentReadingOptionKey: Any] = [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue]
      DispatchQueue.main.async {
        if let attributedString = try? NSAttributedString(data: data, options: options, documentAttributes: nil) {
          self.attributedText = attributedString
          self.invalidateIntrinsicContentSize()
          self.updateSizeToReact()
        }
      }
    }
  }

  private func updateSizeToReact() {
    self.layoutIfNeeded()
    let size = self.sizeThatFits(CGSize(width: self.bounds.width, height: CGFloat.greatestFiniteMagnitude))
    self.updateSize(width: size.width, height: size.height, forView: self)
  }

  override var intrinsicContentSize: CGSize {
    let size = sizeThatFits(CGSize(width: bounds.width, height: CGFloat.greatestFiniteMagnitude))
    return CGSize(width: UIView.noIntrinsicMetric, height: size.height)
  }
}
