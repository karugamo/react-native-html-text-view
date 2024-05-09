import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { HtmlTextView } from 'react-native-html-text';

export default function App() {
  const [height, setHeight] = useState(0);

  return (
    <View style={styles.container}>
      <HtmlTextView
        onSizeChange={onSizeChange}
        html="<strong>strong</strong> boy buhsdjf lkjsdf lkjsdf  lskdfj sldfk ;lk ;lsdfk;lsm fsdlmf sdlkf msdf   ;lsdfkl;sdkf sdlfk sf<br/> what <br /> how wow <h1>yes</h1>hi!!<p>wow</p><p>Wow</p>"
        style={{
          ...styles.box,
          height: height,
        }}
      />
    </View>
  );

  function onSizeChange(event: {
    nativeEvent: { width: number; height: number };
  }) {
    setHeight(event.nativeEvent.height);
    console.log(event.nativeEvent.height);
  }
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
