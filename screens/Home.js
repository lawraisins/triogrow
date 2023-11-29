import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import Planter from '../components/Planter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  // let getUsername = () => {
  //   try {
  //     // Use await to wait for the AsyncStorage.getItem() to complete
  //     const name = AsyncStorage.getItem('Name');
      
  //     // Now you can use the 'name' variable in your code
  //     console.log(name);
  
  //     // You might want to return the value or use it in some way
  //     return name;
  //   } catch (error) {
  //     // Handle errors, e.g., AsyncStorage errors
  //     console.error("Error retrieving username from AsyncStorage:", error);
  //     // You might want to throw the error or return a default value here
  //     throw error;
  //   }
  // };
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();
  const getUsername = () => {
    return AsyncStorage.getItem('Name')
      .then(name => {
        // Use the name, or provide a default if it's null or undefined
        const username = JSON.parse(name) || "DefaultUsername";
        console.log("Username:", username);
        // Continue with code that depends on the username
        return username;
      })
      .catch(error => {
        console.error("Error retrieving username from AsyncStorage:", error);
        throw error;
      });
  };
  
  // Example usage
  getUsername()
    .then(username => {
      // Continue with code that depends on the username
    })
    .catch(error => {
      // Handle errors from getUsername() function
      console.error("Error in getUsername function:", error);
    });


const viewTaskList = async() =>  navigation.navigate("Todo")
  return (
    <ScrollView style={styles.container}>

        <Text style={styles.header}>Hello, {username}!</Text>
        <View style={styles.tasklist}>
        <Text style={styles.subheader}>Today's Tasks:</Text>
        <CustomButton text="View Outstanding Tasks" onPress={handleSubmit(viewTaskList)} type="PRIMARY" ></CustomButton>
        </View>
        <View style={styles.trackers}>
        <Text style={styles.subheader}>Your Trackers:</Text>
        <Planter></Planter>
        </View>
        <View style={styles.communities}>
        <Text style={styles.subheader}>Communities for You:</Text>
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
  subheader: {
    fontSize: 25,
    fontFamily: "Poppins",
  },
  tasklist: {
    top: 83,
  },
  trackers: {
    top: 103,
  },
  communities: {
    top: 143,
  },
  
});
