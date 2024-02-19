import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font';

const CustomButton = ({onPress, text, type}) => {
    const [isPressed, setIsPressed] = useState(false);
    const [fontsLoaded] = useFonts (
        {
             "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
             "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
    }
      );
  
      if (!fontsLoaded) {
          return undefined
      }

    return(
<TouchableOpacity
  onPress={onPress}
  onPressIn={() => setIsPressed(true)}
  onPressOut={() => setIsPressed(false)}
  style={[
    styles.container,
    styles[`container_${type}`],
    isPressed && styles[`container_${type}_pressed`],
  ]}
>
  <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
</TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        marginVertical: 5,

        alignItems: "center",
        // borderWidth: 2,


    },

    container_PRIMARY: {
        width: "100%",
        padding: 15,
        marginVertical: 5,

        alignItems: "center",
        borderRadius: 5,
        // borderColor: "black",
        // borderWidth: 2,
        backgroundColor: "#F25987",
        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },


    container_TERTIARY: {
        width: "50%",
        padding: 5,
        margin: 5,

        alignItems: "center",
        borderRadius: 5,
        // borderColor: "black",
        // borderWidth: 2,
        backgroundColor: "#F25987",
        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,

    },

    text_TERTIARY:{
        color: "#FAF4E6",
        fontFamily: "Poppins",
    },

    text: {
        // fontWeight: "bold",
        color: "#FAF4E6",
        fontFamily: "Poppins",
        fontSize: 18,

    }
})

export default CustomButton