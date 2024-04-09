import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
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
    <YoutubePlayer
      height={300}
      play={playing}
      videoId={"IRdP04ClG_k"}
      onChangeState={onStateChange}
    />
  </View>
);
}
export default Tutorial2
