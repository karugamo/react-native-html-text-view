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

    @objc var html: String? {
        didSet {
            self.updateContent()
        }
    }

    private func updateContent() {
        guard let html = html else { return }
        let data = Data(html.utf8)
        let options: [NSAttributedString.DocumentReadingOptionKey: Any] = [
            .documentType: NSAttributedString.DocumentType.html,
            .characterEncoding: String.Encoding.utf8.rawValue
        ]

        DispatchQueue.main.async {
            if let attributedString = try? NSMutableAttributedString(data: data, options: options, documentAttributes: nil) {
                self.attributedText = attributedString
                self.invalidateIntrinsicContentSize()
                self.updateSizeToReact()
            }
        }
    }

    private func updateSizeToReact() {
        self.layoutIfNeeded()
        let size = self.sizeThatFits(CGSize(width: self.frame.size.width, height: CGFloat.greatestFiniteMagnitude))
        self.onSizeChange?([
            "width": size.width,
            "height": size.height
        ])
    }

    override var intrinsicContentSize: CGSize {
        let size = sizeThatFits(CGSize(width: bounds.width, height: CGFloat.greatestFiniteMagnitude))
        return CGSize(width: UIView.noIntrinsicMetric, height: size.height)
    }
}
