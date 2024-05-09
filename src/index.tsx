import React, { useCallback, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-html-text' doesn't seem to be linked. Make sure: \n\n` +
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

type HtmlTextProps = {
  html: string;
  style: ViewStyle;
};

export default function HtmlTextView({ style, ...props }: HtmlTextProps) {
  const [height, setHeight] = useState(0);

  const onSizeChange = useCallback(
    function (event: { nativeEvent: { width: number; height: number } }) {
      setHeight(event.nativeEvent.height);
    },
    [setHeight]
  );

  return (
    <NativeHtmlTextView
      onSizeChange={onSizeChange}
      style={{
        ...style,
        height,
      }}
      {...props}
    />
  );
}
