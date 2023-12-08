import React,{useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from "../components/CustomInput"
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();

    const _getToken = async () => {
        try {
          const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
          return storedToken;
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
      };


    const onPostPressed = async (data) => {
        console.log(data)
        postcaption = data.contents

        try {
            // Remember to change the backend server URL accordingly!!

            // Data to send in the POST request
            // const postData = {
            //     contents: postcaption,
            // };
            
            // for debugging
            console.log('Uploading Post...');
            console.log('Request URL: ', `${backendURL}/posts/uploadPost`);
            // console.log('Data to be sent: ', postData);
            const token = await _getToken();
            // console.log("token: ", token)

            // Make a POST request to upload posts
            // ERROR  Registration error:  [AxiosError: Network Error]
            // probably happening on this line
            const response = await axios.post(`${backendURL}/posts/uploadPost`, 
                {
                    contents: postcaption,
                }, {
                headers: {
                  Authorization: `${token}`, // Access the token from the headers
                }
              });
            // Assuming the response contains a token field
            // Parse the JWT token to get user information
            // const decodedToken = jwtDecode(response.data.accessToken);

            // Handle the response, e.g. show a success message or navigate to a new screen
            console.log('Post successful: ', response.data);
        
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

    return(
        <View style={styles.container}>
            <Text style = {styles.header}>Post</Text>
        <CustomInput
            name="contents"
            placeholder="Insert your contents."
            control={control}
        />
    
          <CustomButton text="Post" onPress={handleSubmit(onPostPressed)} type="PRIMARY"></CustomButton>
          </View>
    )



    };


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
      
    
    export default Post;