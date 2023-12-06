import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Tabs from '../components/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Landing( {route}) {
  const { username, id } = route.params;
  console.log(id)
 _storeName = () => {
    try {
      AsyncStorage.setItem(
        'Name',
        JSON.stringify(username),
        'id',
        JSON.stringify(id)
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
