import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form'
import CustomButton from '../components/CustomButton';
import User from '../components/user';


export default function Profile() {
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts (
    {
         "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
         "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
  }
  );
  
  if (!fontsLoaded) {
      return undefined
  }
  const signOut = () =>  navigation.navigate("SignIn")
  return (
    <ScrollView style={styles.container}>
    <View style={styles.User}><User></User></View>
    <View style={styles.signout}>
    <View style={styles.edit}>
      <CustomButton text="Edit Profile" type="TERTIARY"></CustomButton>
    <CustomButton text="Sign Out" onPress={handleSubmit(signOut)} type="TERTIARY"></CustomButton></View>
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  User: {
    top: 55,
  },
  signout: {
    top: 83,
  },
  edit:{
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button:{
    padding: 10,
    flexDirection:'row',
  }
  
});