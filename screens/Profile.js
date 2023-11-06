import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form'
import CustomButton from '../components/CustomButton';

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
    <Text style={styles.header}>Profile</Text>
    <View style={styles.signout}>
    <CustomButton text="Sign Out" onPress={handleSubmit(signOut)} type="PRIMARY"></CustomButton>
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
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    top: 55,
  },
  signout: {
    top: 83,
  },
  
});