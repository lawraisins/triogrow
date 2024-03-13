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
import Logo from '../assets/images/Untitled.png';
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
  // console.log(userId);
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("DefaultUsername");
  const [handle, setHandle] = useState("farmer");
  const [bio, setBio] = useState("");
  const [imageStream, setImageStream] = useState("")
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [fetchInterval, setFetchInterval] = useState(null);

  useEffect(() => {
    fetchProfile();
    fetchFollowingCount();
    fetchFollowerCount();
  }, [fetchProfile, fetchFollowingCount, fetchFollowerCount]);

  // const updateProfile = React.useCallback(() => {
  //   setFetchInterval(setInterval(() => {
  //     fetchProfile();
  //     fetchFollowingCount();
  //     fetchFollowerCount();
  //   }, 5000)); // fetch every 5 seconds
  // }, [fetchProfile, fetchFollowingCount, fetchFollowerCount]);

  // useEffect(() => {
  //   updateProfile();
  
  //   return () => {
  //     clearInterval(fetchInterval);
  //   };
  // }, [fetchProfile, updateProfile]);
  useEffect(() => {
    fetchProfile();
  }, [refreshing, onRefresh]);



  const fetchProfile = React.useCallback(async () => {
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
      // console.log(data);
      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          const name = data.userProfile[0].name;
          // console.log(name)
          const username = data.userProfile[0].username;
          // console.log(username)
          const bio = data.userProfile[0].bio;
          const imageStream = data.userProfile[0].imageStream;
          // console.log(bio)
          setUsername(name);
          setHandle(username);
          setBio(bio);
          setImageStream(imageStream);
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving profile data from AsyncStorage:", error);
        }
      } else {
        console.error('Failed to retrieve profile:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  }, []);


  const fetchFollowingCount = React.useCallback(async () => {
    try {
      const token = await _getToken();
      const response = await fetch(`${backendURL}/users/otherFollowingCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          // console.log(data.results[0]['COUNT(*)'])
          setFollowing(data.results[0]['COUNT(*)'])
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving following count:", error);
        }
      } else {
        console.error('Failed to retrieve following count:', data.error);
      }
    } catch (error) {
      console.error('Error fetching following count:', error.message);
    }
  }, []);


  const fetchFollowerCount = React.useCallback(async () => {
    try {
      const token = await _getToken();
      const response = await fetch(`${backendURL}/users/otherFollowerCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          // console.log(data.results[0]['COUNT(*)'])
          setFollowers(data.results[0]['COUNT(*)'])
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving follower count:", error);
        }
      } else {
        console.error('Failed to retrieve follower count:', data.error);
      }
    } catch (error) {
      console.error('Error fetching follower count:', error.message);
    }
  }, []);

  // Need to fetch bio from Users Table using axios, populate bio section
  // Create an edit user section that can save the changes
  // Allow users to use camera along with uploading from gallery
  // Resolve FTP connection issues, make sure can post to and retrieve from FTP server

  return (
    <View style={styles.container}>
      {imageStream ? (
        <Image source={{ uri: `data:image/jpeg;base64,${imageStream}` }} style={styles.dp} />
      ) : (
        <Image source={Logo} style={styles.dp} />
      )}
      <View style={styles.info}>
        <Text style={styles.header}>{username}</Text>
        <Text style={styles.subheader}>@{handle}</Text>
        <Text style={styles.subheader}>{bio}</Text>
        <Text style={styles.follow}>Followers: {followers}</Text>
        <Text style={styles.follow}>Following: {following}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF4E6',
    flexDirection:"row",
    alignItems:"flex-start",

  },
  header: {
    fontSize: 40,
    fontFamily: "Poppins-Header",
    textAlign: 'right',
    color: "#004F18",
  },
  subheader: {
    fontSize: 25,
    fontFamily: "Poppins",
    textAlign: 'right',
    color:"#4B2209",
  },
  dp:{
    borderRadius:60,
    backgroundColor: "white",
    width: 120,
    height: 120,

  },
  info:{
    marginRight:10,
  },
  follow:{
    fontFamily: "Poppins",
    textAlign: "right",
    color:"#4B2209",
  },
  
});

export default OtherUser