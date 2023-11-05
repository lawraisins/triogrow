import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { useFonts } from 'expo-font';


const SignInScreen = () => {    
    const {control, handleSubmit, formState: {errors},} = useForm();
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = (data) => {
        navigation.navigate('Landing')
        console.log(data)
        password = data.password
        username = data.username
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
            {/* <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/> */}
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