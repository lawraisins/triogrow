import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"


export default function ToDo() {
  return (
    <View style={styles.container}>
        <Form></Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  
});