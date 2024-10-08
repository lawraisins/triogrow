import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer, useRoute } from '@react-navigation/native';
import Tabs from '../components/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function Landing( {route}) {
  const { username, id, token, handle } = route.params;
  // console.log(username, id, token);
  
  const _storeUserData = async () => {
    try {
      await AsyncStorage.setItem('Name', JSON.stringify(username));
      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('Handle', JSON.stringify(handle));
      await AsyncStorage.setItem('userId', JSON.stringify(id));
    } catch (error) {
      console.error('Error saving username to AsyncStorage:', error);
    }
  };


  useEffect(() => {
    _storeUserData();
  }, [username, token, handle, id]); // Add username to dependency array to ensure _storeName is called whenever username changes
  
  

  // console.log("Landing is receiving the username: ", username);

  return (
    <Tabs username={username} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
  },
  
});
