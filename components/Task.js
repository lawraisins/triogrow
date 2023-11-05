import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform} from 'react-native';

const Task = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
            <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>

    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FDF76A",
        padding: 15,
        borderRadius: 10,
        borderColor:"black",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#FDF76A",
        opacity: 0.4,
        marginRight: 15,
    },
    text: {
        fontFamily: "Poppins"
    }

});
export default Task;