import React,{useState} from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import whatisTriogro from '../assets/images/WhatisTriogro.png';

export default function Content1() {
  return (
    <View style={styles.container}>
      <Image source={whatisTriogro} style={{width:400, height:550}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: "#FAF4E6",
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