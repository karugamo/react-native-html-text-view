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

type HtmlTextProps = {
  html: string;
  onSizeChange?: (event: {
    nativeEvent: { width: number; height: number };
  }) => void;
  style: ViewStyle;
};

const ComponentName = 'HtmlTextView';

export const HtmlTextView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<HtmlTextProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
