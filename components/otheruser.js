import React,{useEffect, useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import Form from './Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import { useFonts } from 'expo-font';
import Planter from './Planter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import CommunityFeed from './communityfeed';
import Logo from '../assets/images/squirtle.png';
import backendURL from './backendURL';

const _getToken = async () => {
  try {
    const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
    return storedToken;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
};

const OtherUser = ({ userId, refreshing, onRefresh }) => {
  const id = userId;
  console.log(userId);
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("DefaultUsername");
  const [handle, setHandle] = useState("farmer");
  const [bio, setBio] = useState("");
  useEffect(() => {
    fetchProfile();
  }, [refreshing, onRefresh]);

  const fetchProfile = async () => {
    try {
      const token = await _getToken();
      const response = await fetch(`${backendURL}/profile/viewOther`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        try {
          const name = data.userProfile[0].name;
          const username = data.userProfile[0].username;
          const bio = data.userProfile[0].bio;
          setUsername(name);
          setHandle(username);
          setBio(bio);
        } catch (error) {
          console.error("Error retrieving profile data from AsyncStorage:", error);
        }
      } else {
        console.error('Failed to retrieve profile:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  // Need to fetch bio from Users Table using axios, populate bio section
  // Create an edit user section that can save the changes
  // Allow users to use camera along with uploading from gallery
  // Resolve FTP connection issues, make sure can post to and retrieve from FTP server

  return (
    <View style={styles.container} onRefresh={onRefresh} refreshing={refreshing}>
      <Image style={styles.dp} source={Logo}></Image>
      <View style={styles.info}>
        <Text style={styles.header}>{username}</Text>
        <Text style={styles.subheader}>@{handle}</Text>
        <Text style={styles.subheader}>{bio}</Text>
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

export default OtherUser