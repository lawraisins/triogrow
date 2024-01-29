import React from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform} from 'react-native';

const Task = ({ task }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.text}>{task.name}</Text>
        <Text style={styles.text}>{task.details}</Text>
        <Text style={styles.text}>{task.completeBy}</Text>
      </View>
    );
  };
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
    text: {
        fontFamily: "Poppins"
    }

});
export default Task;