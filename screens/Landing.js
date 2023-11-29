import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Tabs from '../components/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Landing( {route}) {
  const { username } = route.params;
  _storeName = async () => {
    try {
      await AsyncStorage.setItem(
        'Name',
        username,
      );
    } catch (error) {
      // Error saving data
    }
  };

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
