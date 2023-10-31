import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            placeholder="Username"
            value = {username}
            setValue = {setUsername}
             />
             
            <CustomInput
            placeholder = "Password"
            value = {password}
            setValue = {setPassword}
            secureTextEntry={true}/>

            <CustomButton text="Sign In" onPress={onSignInPressed} type="PRIMARY"/>
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