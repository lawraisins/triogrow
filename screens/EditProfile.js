import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Logo from '../assets/images/squirtle.png';
import CustomInput from '../components/CustomInput';

const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };

export default function EditProfile() {
    const [username, setUsername] = useState("DefaultUsername");
    const [handle, setHandle] = useState("farmer");
    const [bio, setBio] = useState("");
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const navigation = useNavigation();
    useEffect(() => {
        // Fetch profile when the component mounts
        fetchProfile();
      }, []);
    
      const fetchProfile = async () => {
        try {
          // Replace 'your-backend-url' with the actual URL of your backend server
          const token = await _getToken();
          const response = await fetch(`${backendURL}/profile/view`, {
            headers: {
              Authorization: `${token}`, // Access the token from the headers
            },
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            // Update the state with the retrieved profile data
            try {
              const name = data.userProfile[0].name;
              console.log(name)
              const username = data.userProfile[0].username;
              console.log(username)
              const bio = data.userProfile[0].bio;
              console.log(bio)
              setUsername(name);
              setHandle(username);
              setBio(bio);
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
      };
    
      //Need to fetch bio from Users Table using axios, populate bio section
      //Create an edit user section that can save the changes
      //Allow users to use camera along with uploading from gallery
      //Resolve FTP connection issues, make sure can post to and retrieve from FTP server

    const [image, setImage] = useState(null);
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    const cancel = () =>  navigation.navigate("Profile")

    const onPostPressed = async (data) => {
      console.log("data", data)
      console.log(image)
      

      try {
          // Remember to change the backend server URL accordingly!!

          // Data to send in the POST request
          formData.append("contents", data.contents)
          formData.append("image", {
            uri:image.uri,
            type:"image/jpeg",
            name:`${Date.now()}.jpg`,
          })
          
          
          // for debugging
          console.log('Uploading Post...');
          console.log('Request URL: ', `${backendURL}/posts/uploadPost`);
          console.log('Data to be sent: ', formData);
          const token = await _getToken();
          // console.log("token: ", token)

          // Make a POST request to upload posts
          // ERROR  Registration error:  [AxiosError: Network Error]
          // probably happening on this line
          const response = await axios.post(`${backendURL}/posts/uploadPost`,formData, {
              headers: {
                Authorization: `${token}`, // Access the token from the headers
                "Content-Type": "multipart/form-data",
              }
            });
            console.log(formData)
          // Assuming the response contains a token field
          // Parse the JWT token to get user information
          // const decodedToken = jwtDecode(response.data.accessToken);

          // Handle the response, e.g. show a success message or navigate to a new screen
          console.log('Post successful: ', response.data);
          Alert.alert("Post Successful!")
      
      } catch (error) {
          // Handle any errors that occur during the registration process
          console.error('Posting error: ', error.response.data);
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

  }


  const onSaveChangesPressed = async (data) => {
    console.log(data);
    const rusername = data.Name;
    const rhandle = data.Handle;
    const rbio = data.Bio;
    const image = image;
  
    try {
      // Remember to change the backend server URL accordingly!!
  
      // Create a FormData object to send the image and user data
      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        type: 'image/jpeg',
        name: `${Date.now()}.jpg`,
      });
      formData.append('name', rusername);
      formData.append('username', rhandle);
      formData.append('bio', rbio);
  
      // for debugging
      console.log('Sending a POST request to save profile changes...');
      console.log('Request URL: ', `${backendURL}/profile/update`);
      const token = await _getToken();
      console.log('Data to be sent: ', formData);
  
      // Make a POST request to update user profile
      const response = await axios.post(`${backendURL}/profile/update`, formData, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Assuming the response contains a token field
      // Parse the JWT token to get user information
      // const decodedToken = jwtDecode(response.data.accessToken);
  
      // Handle the response, e.g. show a success message or navigate to a new screen
      console.log('Profile Updated: ', response.data);
      // Go to Landing
      Alert.alert("Changes have been saved!");
      navigation.navigate('Profile');
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
      <ScrollView style={styles.container}>
      <View>
      <Text style={styles.header}>Edit Profile</Text>
      <View style={styles.profile}>
      <TouchableOpacity onPress={handleSubmit(pickImage)}><Image style={styles.dp} source={{uri: image}}></Image></TouchableOpacity>
      <View style={styles.input}>
        <Text style={styles.subheader}>Name</Text>
      <CustomInput name="Name" placeholder={username} control={control}></CustomInput>
        <Text style={styles.subheader}>Handle</Text>
      <CustomInput name="Handle" placeholder={handle} control={control}></CustomInput>
        <Text style={styles.subheader}>Bio</Text>
      <CustomInput name="Bio" placeholder={bio} control={control}></CustomInput>
      </View>
      <View style={styles.buttons}>
    <CustomButton text="Save Changes" type="TERTIARY" onPress={handleSubmit(onSaveChangesPressed)}></CustomButton>
      <CustomButton text="Cancel" onPress={handleSubmit(cancel)} type="TERTIARY"></CustomButton>
      </View>
      </View>
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
    buttons: {
        alignItems:'center'
    },
    edit:{
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    input:{
        padding:10,
    },
    button:{
      padding: 10,
      flexDirection:'row',
    },
    dp:{
        borderRadius:80,
        backgroundColor: "white",
        width: 140,
        height: 140,
        alignSelf:'center'
    
      },
      header: {
        fontSize: 42,
        fontFamily: "Poppins-Header",
        top: 15,
      },
      subheader: {
        fontSize: 18,
        fontFamily: "Poppins",
      },
    profile:{
    }
    
  });