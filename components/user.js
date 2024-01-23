import React,{useEffect, useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import Planter from '../components/Planter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import CommunityFeed from '../components/communityfeed';
import Logo from '../assets/images/squirtle.png';

const User = () => {
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [username, setUsername] = useState("DefaultUsername");

  const getUsername = async () => {
    try {
      const name = JSON.parse(await AsyncStorage.getItem('Name'));
      if (name) {
        setUsername(name);
      }
    } catch (error) {
      console.error("Error retrieving username from AsyncStorage:", error);
    }
  };

  const [handle, setHandle] = useState("farmer");

  const getHandle = async () => {
    try {
      const hand = JSON.parse(await AsyncStorage.getItem('Handle'));
      if (hand) {
        setHandle(hand);
      }
    } catch (error) {
      console.error("Error retrieving handle from AsyncStorage:", error);
    }
  };
  

  useEffect(() => {
    // Fetch the username when the component mounts
    getUsername();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    // Fetch the handle when the component mounts
    getHandle();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  //Need to fetch bio from Users Table using axios, populate bio section
  //Create an edit user section that can save the changes
  //Allow users to use camera along with uploading from gallery
  //Resolve FTP connection issues, make sure can post to and retrieve from FTP server


  // const [image, setImage] = useState(null);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };



  return (
    <View style={styles.container}>
    <Image style={styles.dp} source={Logo}></Image>
      <View style={styles.info}>
      <Text style={styles.header}>{username}</Text>
      <Text style={styles.subheader}>@{handle}</Text>
      <Text style={styles.subheader}>Bio</Text>
      </View>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BEE4FF',
    flexDirection:"row",
    alignItems:"flex-start",

  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    textAlign: 'right',
  },
  subheader: {
    fontSize: 25,
    fontFamily: "Poppins",
    textAlign: 'right',
  },
  dp:{
    borderRadius:60,
    backgroundColor: "white",
    width: 120,
    height: 120,

  },
  info:{
    marginLeft:30,

  }
  
});

export default User