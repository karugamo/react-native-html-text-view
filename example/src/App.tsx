import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import HtmlTextView from 'react-native-html-text';

export default function App() {
  const html = `<h1>Testing some html</h1>
  <p>This is a paragraph</p>
  <strong>Strong text</strong>
  <em>Italic text</em>
  <strong>10px</strong><strong style="font-size: 20px">20px</strong>`;

  return (
    <View style={styles.container}>
      <HtmlTextView
        html={html}
        style={{
          width: '100%',
          flex: 0,
          backgroundColor: 'lightgray',
          fontFamily: 'Courier-Bold',
          fontSize: 18,
          fontStyle: 'italic',
          color: 'red',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
