import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";

const CustomButton = ({onPress, text, type}) => {
    return(
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
        </Pressable>
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
    },

    text: {
        fontWeight: "bold",
        color: "black",

    }
})

export default CustomButton