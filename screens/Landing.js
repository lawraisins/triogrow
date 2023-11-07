import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Tabs from '../components/tabs';

export default function Landing() {

  return (
    <Tabs></Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
  },
  
});
