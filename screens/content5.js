import React,{useState} from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"
import Triogro from '../assets/images/Triogro.jpg';
import Soilbuilding from '../assets/images/Soilbuilding.jpg';

export default function Content5() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to build your own soil?</Text>
      <Image source={Soilbuilding} style={{width:400, height:450}} />
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
    fontSize: 26,
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