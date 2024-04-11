import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, Text, StyleSheet } from "react-native";
// import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";


// const COMPOST_TUBE = "https://youtu.be/CT4YeCWeST4?si=xkhPKMnuo2LCusgg?"
//const SOIL_BUILDING = "https://youtu.be/IRdP04ClG_k?si=NcUk-EQqAWyNLxmA"

const Tutorial2 = () =>   {
const [playing, setPlaying] = useState(false);

const onStateChange = useCallback((state) => {
  if (state === "ended") {
    setPlaying(false);
    Alert.alert("video has finished playing!");
  }
}, []);

const togglePlaying = useCallback(() => {
  setPlaying((prev) => !prev);
}, []);

return (
  <View>
        <Text style={styles.header}>Triogro App Soil Building Test</Text>
    <YoutubePlayer
      height={500}
      play={playing}
      videoId={"IRdP04ClG_k"}
      onChangeState={onStateChange}
    />
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4E6",
    padding: 20,
    // justifyContent: "center"
  },
  headingBox: {
    // paddingVertical: 10,
    borderRadius: 10,
    // marginBottom: 10,

  },
  heading: {
    fontSize: 20,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
  },
  tutorialBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    marginBottom: 16,
  },
  tutorialTitle: {
    fontSize: 14,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
    marginBottom: 0,
  },
  greenBox: {
    backgroundColor: '#A0D29F',
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  tutorialContentBox: {
    // marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  header: {
    fontSize: 35,
    fontFamily: "Arial-Rounded",
    color:"#004F18",

  },
});

export default Tutorial2
