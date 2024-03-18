import React,{useState} from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"
import Triogro from '../assets/images/Triogro.jpg';
import Plants from '../assets/images/Plants.png';

export default function Content3() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Plants</Text>
      <Image source={Plants} style={{width:400, height:450}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
});