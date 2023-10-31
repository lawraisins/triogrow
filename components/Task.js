import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform} from 'react-native';

const Task = (props) => {
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
            <Text>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>

    )
}
const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
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
        backgroundColor: "green",
        opacity: 0.4,
        marginRight: 15,

    },
    itemText: {
        maxWidth: "80%"
    },
    circular: {
        width: 12,
        height: 12,
        backgroundColor: "green",
        borderwidth: 2,
        borderRadius: 5,

    }, 
});
export default Task;