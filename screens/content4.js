import React, { useState } from 'react';
import { Text, View, TouchableOpacity, WebView } from 'react-native';
import { Button, StyleSheet } from 'react-native';
import Form from '../components/Todolist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";
import Triogro from '../assets/images/Triogro.jpg';
import pdf from '../assets/images/Growing.pdf';

export default function Content4() {
  const [isLoading, setIsLoading] = useState(true);
  
  if (isLoading) {
    return <AppLoading startAsync={() => {}} onFinish={() => setIsLoading(false)} />;
  }
  
  const openPdf = () => {
    const html = `
      <iframe
        src="${pdf}"
        style="width:100%; height:500px;"
        frameborder="0"
      >
      </iframe>
    `;
    this.webview.injectJavaScript(`document.documentElement.innerHTML = '${html}'`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>5 Easy to Grow Low Main</Text>
      <Image source={Triogro} style={{width:300, height:250}} />
      <TouchableOpacity onPress={openPdf}>
        <Text style={styles.buttonText}>Open Growing Guide</Text>
      </TouchableOpacity>
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ html: '' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});