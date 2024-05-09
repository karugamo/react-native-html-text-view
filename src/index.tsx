import React, { useCallback, useState } from 'react';
import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

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

type HtmlTextProps = {
  html: string;
  style: ViewStyle & SupportedTextStyle;
};

export default function HtmlTextView({ style, html, ...props }: HtmlTextProps) {
  const [height, setHeight] = useState(0);

  const onSizeChange = useCallback(
    function (event: { nativeEvent: { width: number; height: number } }) {
      setHeight(event.nativeEvent.height);
    },
    [setHeight]
  );

  const { textStyles, viewStyles } = splitStyles(style);

  const wrappedHtml = `<body style="${convertToCSS(textStyles)}">${html}</body>`;

  return (
    <NativeHtmlTextView
      onSizeChange={onSizeChange}
      html={wrappedHtml}
      style={{
        ...viewStyles,

        height,
      }}
      {...props}
    />
  );
}

type Test = ViewStyle & SupportedTextStyle;

function splitStyles(style: Test): {
  textStyles: any;
  viewStyles: any;
} {
  const textStyles: any = {};
  const viewStyles: any = {};

  for (const prop in style) {
    if (textProperties.includes(prop as keyof SupportedTextStyle)) {
      textStyles[prop] = style[prop as keyof SupportedTextStyle];
    } else {
      viewStyles[prop] = style[prop as keyof ViewStyle];
    }
  }

  return { textStyles, viewStyles };
}

const textProperties: Array<keyof SupportedTextStyle> = [
  'fontSize',
  'fontFamily',
  'textAlign',
  'fontWeight',
  'fontStyle',
  'textDecorationLine',
  'lineHeight',
  'color',
];

function convertToCSS(styles: Record<string, number | string>) {
  return Object.keys(styles)
    .map((key) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (typeof styles[key] === 'number') {
        return `${cssKey}: ${styles[key]}px;`;
      }

      return `${cssKey}: ${styles[key]};`;
    })
    .join(' ');
}

interface SupportedTextStyle {
  fontSize?: number | string;
  fontFamily?: string;
  textAlign?: 'left' | 'right' | 'center';
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?: 'none' | 'underline';
  lineHeight?: number;
  color?: string;
}
