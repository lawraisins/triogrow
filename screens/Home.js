import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();

const viewTaskList = () =>  navigation.navigate("Todo")
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit(viewTaskList)}>
        <Text>View Outstanding Tasks</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FDF76A',
    borderColor: "black",
    borderRadius: 2,
    padding: 10,
  },
  
});
