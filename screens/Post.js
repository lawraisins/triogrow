import React,{useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Image} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from "../components/CustomInput"
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

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
        console.log(image)
        

        try {
            // Remember to change the backend server URL accordingly!!

            // Data to send in the POST request
            const postData = {
                contents: data,
                imagePath: image
            };
            
            // for debugging
            console.log('Uploading Post...');
            console.log('Request URL: ', `${backendURL}/posts/uploadPost`);
            console.log('Data to be sent: ', postData);
            const token = await _getToken();
            // console.log("token: ", token)

            // Make a POST request to upload posts
            // ERROR  Registration error:  [AxiosError: Network Error]
            // probably happening on this line
            const response = await axios.post(`${backendURL}/posts/uploadPost`,postData, {
                headers: {
                  Authorization: `${token}`, // Access the token from the headers
                }
              });
              console.log(postData)
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

    const [image, setImage] = useState(null);

    useEffect(() => {
      console.log(image);
    }, [image]);


    const pickCamera = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const imageFileLocalPath = result.assets[0].uri
        setImage(imageFileLocalPath);
    
      }
    };

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        const imageFileLocalPath = result.assets[0].uri
        setImage(imageFileLocalPath);
    
      }
    };

    return(
        <ScrollView style={styles.container}>
            <Text style = {styles.header}>Post</Text>
            <View style={styles.tasklist}>
            <CustomButton name="imagePath" text="Use Camera" type="PRIMARY" onPress={handleSubmit(pickCamera)} control={control}></CustomButton>
            <CustomButton name="imagePath" text="Choose Image" type="PRIMARY" onPress={handleSubmit(pickImage)} control={control}></CustomButton>
            <CustomInput
            name="contents"
            placeholder="Insert caption here!"
            control={control}
        />
          <CustomButton text="Post" onPress={handleSubmit(onPostPressed)} type="PRIMARY"></CustomButton>
          </View>
          </ScrollView>
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

        
      });
      
    
    export default Post;