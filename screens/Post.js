import React,{useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Image, Alert, PermissionsAndroid} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from "../components/CustomInput"
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import camera from '../assets/images/camera.png'
import gallery from '../assets/images/image-gallery.png'
import LocationPicker from '../components/locationPicker';


const Post = () => {
    const { control, handleSubmit, setValue, formState: { errors } } = useForm();

    const _getToken = async () => {
        try {
          const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
          return storedToken;
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
      };

    const formData = new FormData()
    const [showCaptionInput, setShowCaptionInput] = useState(false);
    const [showPostButton, setShowPostButton] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const onPostPressed = async (data) => {
        try {
            formData.append("contents", data.contents)
            formData.append("location", selectedLocation); // Include the selected location
            formData.append("image", {
              uri:image.uri,
              type:"image/jpeg",
              name:`${Date.now()}.jpg`,
            })
            
            const token = await _getToken();
            const response = await axios.post(`${backendURL}/posts/uploadPost`,formData, {
                headers: {
                  Authorization: `${token}`, // Access the token from the headers
                  "Content-Type": "multipart/form-data",
                }
              });

            setValue("contents", "")
            setImage(null)
            setShowCaptionInput(false);
            setShowPostButton(false);
            setShowLocationPicker(false);
            Alert.alert("Post Successful!")
        
        } catch (error) {
            console.error('Posting error: ', error.response.data);
            if (error.response) {
                console.error('Server error: ', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server', error);
            } else {
                console.error('Request setup error: ', error);
            }
        }

    }

    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the camera');
        } else {
          // console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    

    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);

    const pickCamera = async () => {
      await requestCameraPermission();
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0]);
        setShowCaptionInput(true);
        setShowPostButton(true);
        setShowLocationPicker(true);
      }
    };

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0]);
        setShowCaptionInput(true);
        setShowPostButton(true);
        setShowLocationPicker(true);
      }
    };

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Post</Text>
            <View style={styles.tasklist}>
            <View style={styles.picker}>
            <TouchableOpacity onPress={pickCamera}>
            <Image source={camera} style={styles.image}></Image>
            <Text style={styles.subheader}>Use Camera</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.picker}>
            <TouchableOpacity onPress={pickImage}>
            <Image source={gallery} style={styles.image}></Image>
            <Text style={styles.subheader}>Choose From Gallery</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 100, width:"90%", alignSelf:"center"}}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ height: 200, width:200, alignSelf:"center"}}
            />
          )}
         {showLocationPicker && ( <LocationPicker onLocationChange={setSelectedLocation} />)}
          {showCaptionInput && (
            <CustomInput
              name="contents"
              placeholder="Insert caption here!"
              control={control}
              style={styles.input}/>
          )}
          {showPostButton && (
            <CustomButton text="Post" onPress={handleSubmit(onPostPressed)} type="PRIMARY" style={styles.button}></CustomButton>
          )}
          </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FAF4E6',
      padding: 20,
    },
    header: {
      fontSize: 42,
      fontFamily: "Arial-Rounded",
      color:"#004F18",
    },
    subheader: {
      fontSize: 20,
      fontFamily: "Arial-Rounded",
      marginTop: 5,
      textAlign:"center",
      color: "#4B2209"
    },
    tasklist: {
      top: 83,
      justifyContent:"center",
      flexDirection:"row",
    },
    picker:{
      alignItems: 'center',
      padding: 20,
    },
    button:{
      width: '100%',
      height: 50,
      marginTop: 100,
      justifyContent: 'center',
    },
    input: {
      width: '100%',
      height: 50,
      marginTop: 20,
      paddingHorizontal: 10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
    }, 
    image: {
      width: 100,
      height: 100,
      alignSelf: "center",
      tintColor: "#F25987",
    }
});

export default Post;
