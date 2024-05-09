import type { ViewStyle } from 'react-native';

export type HtmlTextProps = {
  html: string;
  style: ViewStyle;
  baseTextStyle: BaseTextStyle;
};

export interface BaseTextStyle {
  fontSize?: number | string;
  fontFamily?: string;
  textAlign?: 'left' | 'right' | 'center';
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?: 'none' | 'underline';
  lineHeight?: number;
  color?: string;
}
