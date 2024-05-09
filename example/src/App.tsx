import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { HtmlTextView } from 'react-native-html-text';

export default function App() {
  return (
    <View style={styles.container}>
      <HtmlTextView html="<strong>strong</strong> boy" style={styles.box} />
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
  box: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});
