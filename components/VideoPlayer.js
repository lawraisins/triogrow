// Load the module
import React from "react"
import { StatusBar } from "expo-status-bar";
import { useRef,useState } from "react";
import { StyleSheet, Button, View } from 'react-native';
import WebView from "react-native-webview";

const COMPOST_TUBE = "https://www.youtube.com/watch?v=CT4YeCWeST4"

const VideoPlayer = ({sourcelink}) => {
 return (
<View>
<WebView
source={{uri: sourcelink}}
    onLoad={console.log("Starting")}>
        

</WebView>
<StatusBar style = "auto"></StatusBar>
</View>
 )
}

// Later on in your styles..
var styles = StyleSheet.create({
  Video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoPlayer