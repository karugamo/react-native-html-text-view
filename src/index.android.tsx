import React from 'react';
import RenderHtml from 'react-native-render-html';
import type { HtmlTextProps } from './props';

export default function HtmlTextViewAndroid({
  html,
  baseTextStyle,
}: HtmlTextProps) {
  return (
    <RenderHtml
      source={{ html }}
      systemFonts={
        baseTextStyle.fontFamily ? [baseTextStyle.fontFamily] : undefined
      }
      defaultTextProps={{ selectable: true }}
      baseStyle={baseTextStyle}
    />
  );
}
