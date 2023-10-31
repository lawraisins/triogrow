import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
const SignInScreen = () => {
    const {control, handleSubmit} = useForm();
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        console.warn("Sign in")
        navigation.navigate('Home')
    }
    const onForgotPasswordPressed = () => {
        console.warn("Oops")
    }

    const onSignUpPressed = () => {
        console.warn("New Account")
        navigation.navigate("SignUp")
    }

    return (
        <View style={styles.root}>
            <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode = "contain" />
            <CustomInput
                name="username"
                placeholder="Username"
                control={control}
            />

            <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                secureTextEntry
            />


            <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} type="PRIMARY"/>
            <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
            <CustomButton text="Create a New Account" onPress={onSignUpPressed} type="TERTIARY"/>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    }, 
    logo: {
        width: '70%',
        maxWidth: 300,
    }
})

export default SignInScreen;