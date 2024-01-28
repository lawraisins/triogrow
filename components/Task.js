import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform} from 'react-native';

const Task = (name, details, completeBy) => {
    return(
        <View style={styles.item}>
            <Text style={styles.text}>{name}</Text>
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
        shadowColor: "black",
        shadowOffset: {
            width: 4,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    text: {
        fontFamily: "Poppins"
    }

});
export default Task;