import React, { useCallback, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';
import type { BaseTextStyle, HtmlTextProps } from './props';

const LINKING_ERROR =
  `The package 'react-native-html-text-view' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type NativeHtmlTextProps = {
  html: string;
  onSizeChange?: (event: {
    nativeEvent: { width: number; height: number };
  }) => void;
  style: ViewStyle;
};

const ComponentName = 'HtmlTextView';

const NativeHtmlTextView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<NativeHtmlTextProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

export default function HtmlTextViewIOS({
  style,
  baseTextStyle,
  html,
  ...props
}: HtmlTextProps) {
  const [height, setHeight] = useState(0);

  const onSizeChange = useCallback(
    function (event: { nativeEvent: { width: number; height: number } }) {
      setHeight(event.nativeEvent.height);
    },
    [setHeight]
  );

  const wrappedHtml = baseTextStyle
    ? `<body style="${convertToCSS(baseTextStyle)}">${html}</body>`
    : html;

  return (
    <NativeHtmlTextView
      onSizeChange={onSizeChange}
      html={wrappedHtml}
      style={{
        ...style,
        height,
      }}
      {...props}
    />
  );
}

function convertToCSS(styles: BaseTextStyle) {
  return Object.keys(styles)
    .map((key) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (typeof styles[key as keyof BaseTextStyle] === 'number') {
        return `${cssKey}: ${styles[key as keyof BaseTextStyle]}px;`;
      }

      return `${cssKey}: ${styles[key as keyof BaseTextStyle]};`;
    })
    .join(' ');
}
