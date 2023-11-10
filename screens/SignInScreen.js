import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { useFonts } from 'expo-font';
import axios from 'axios';
import backendURL from '../components/backendURL';


const SignInScreen = () => {    
    const {control, handleSubmit, formState: {errors},} = useForm();
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = async (data) => {
        console.log(data)
        rpassword = data.password
        rusername = data.username

        try {
            // Remember to change the backend server URL accordingly!!

            // Data to send in the POST request
            const userData = {
                username: rusername,
                password: rpassword,
            };
            

            // for debugging
            console.log('Sending a POST request to register a user...');
            console.log('Request URL: ', `${backendURL}/auth/login`);
            console.log('Data to be sent: ', userData);

            // Make a POST request to register the user
            // ERROR  Registration error:  [AxiosError: Network Error]
            // probably happening on this line
            const response = await axios.post(`${backendURL}/auth/login`, userData);

            // Handle the response, e.g. show a success message or navigate to a new screen
            console.log('Registration successful: ', response.data);
            navigation.navigate('Landing')
        
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error('Registration error: ', error);
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

    
    const onForgotPasswordPressed = () => {
    }

    const onSignUpPressed = () => {
        navigation.navigate("SignUp")
    }

    const [fontsLoaded] = useFonts (
        {
             "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
             "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
    }
      );
  
      if (!fontsLoaded) {
          return undefined
      }


    return (
        <View style={styles.root}>
            <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode = "contain" />
            <Text style = {styles.header}>Triogrow</Text>
            <CustomInput
                name="username"
                placeholder="Username"
                control={control}
                rules={{required: "Username is required."}}
            />

            <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                secureTextEntry
                rules={{required: "Password is required. "}}
            />


            <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} type="PRIMARY"/>
            {/* <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="PRIMARY"/> */}
            <CustomButton text="Create a New Account" onPress={onSignUpPressed} type="PRIMARY"/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#BEE4FF",
        height: "100%"
    }, 
    logo: {
        height: 128,
        width: 128
    },
    header: {
        fontSize: 36,
        fontFamily: "Poppins-Header",
    },

})

export default SignInScreen;