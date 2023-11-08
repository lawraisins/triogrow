import React from "react";
import {View, Text, StyleSheet, Pressable, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font';

const CustomButton = ({onPress, text, type}) => {
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
        <TouchableOpacity onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
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
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 2,


    },

    container_PRIMARY: {
        backgroundColor: "#FDF76A",
        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },


    container_TERTIARY: {},

    text_TERTIARY:{
        color: "black",
        fontFamily: "Poppins",
    },

    text: {
        fontWeight: "bold",
        color: "black",
        fontFamily: "Poppins",

    }
})

export default CustomButton