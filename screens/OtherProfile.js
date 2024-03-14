import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import axios from 'axios';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form'
import CustomButton from '../components/CustomButton';
import OtherUser from '../components/otheruser';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtherFeed from '../components/otherfeed';

//This is to obtain the profile of other users
const _getToken = async () => {
  try {
    const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
    return storedToken;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
};


export default function OtherProfile({route}) {
    const id = route.params.userId;
  //  console.log(route.params)
  const [refreshing, setRefreshing] = useState(false);
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();
  const [username, setUsername] = useState("DefaultUsername");
  const [handle, setHandle] = useState("farmer");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    fetchProfile();
  }, [refreshing, onRefresh]);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const token = await _getToken();
        const response = await axios.get(`${backendURL}/users/${id}/isFollowing`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        // console.log(response.data)
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('Error checking if following: ', error);
      }
    };
    checkFollowing();
  }, []);

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
      // console.log(data);
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


  const onFollowPressed = async () => {
    try {
      // Remember to change the backend server URL accordingly!!
  
      // Data to send in the POST request
      const followData = {
        followingId: id,
      };
  
      // for debugging
      // console.log('Sending a POST request to follow user...');
      // console.log('Request URL: ', `${backendURL}/users/${id}/follow`);
      const token = await _getToken();
      // console.log('Data to be sent: ', followData);
  
      // Make a POST request to update user profile
      const response = await axios.post(`${backendURL}/users/${id}/follow`, followData, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
  
      // Handle the response, e.g. show a success message or navigate to a new screen
      // console.log('Following: ', response.data);
      setIsFollowing(!isFollowing); // Toggle the isFollowing state here
      Alert.alert(isFollowing ? "Unfollowed this user" : "Following this user");
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error('Update error: ', error);
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error('Server error: ', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server', error);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error: ', error);
      }
    }
  };

  return (
    <View style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } >
    <View style={styles.User}><OtherUser onRefresh={handleRefresh} userId={id}></OtherUser></View>
    <View>
    <TouchableOpacity onPress={onFollowPressed}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>{isFollowing ? "Following" : "Follow"}</Text>
    </View>
  </TouchableOpacity>

    <OtherFeed refreshing={refreshing} onRefresh={onRefresh} userId={id}></OtherFeed>
    </View>

  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: "#FAF4E6",
    padding: 20,
  },

  button: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: "#F25987",
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  
  buttonText:{
        color: "#FAF4E6",
        fontFamily: "Poppins",

  }
  
});