import * as React from 'react';
import { useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import HtmlTextView from 'react-native-html-text';

export default function App() {
  const [html, setHtml] = React.useState(
    `<strong
      style='color: red'
    >strong
    </strong>`
  );

  useEffect(() => {
    setTimeout(() => {
      setHtml(
        html +
          `<strong
          style='color: blue'
        >strong
        </strong>`
      );
    }, 1000);
  }, [html]);

  return (
    <View style={styles.container}>
      <HtmlTextView html={html} style={styles.box} />
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
    width: '100%',
    backgroundColor: 'lightgray',
    marginVertical: 20,
    fontSize: 50,
    textAlign: 'center',
  },
});
