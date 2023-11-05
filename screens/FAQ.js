import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';


export default function FAQ() {
  const [fontsLoaded] = useFonts (
    {
         "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
         "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
  }
  );
  
  if (!fontsLoaded) {
      return undefined
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>FAQ</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    top: 55,
  },
  
});