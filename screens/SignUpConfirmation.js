import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtlegang.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { useFonts } from 'expo-font';
import axios from 'axios';


const SignUpConfirmationScreen = () => {    
    const {control, handleSubmit, formState: {errors},} = useForm();
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignUpConfirmationPressed = async () => {
            navigation.navigate('SignIn');
        }



    return (
        <View style={styles.root}>
            <Image source = {Logo} style = {[styles.logo, {height: height * 0.3}]} resizeMode = "contain" />
            <Text style = {styles.header}>Registration Successful!</Text>


            <View style={styles.button}>
            <CustomButton text="Sign In" onPress={handleSubmit(onSignUpConfirmationPressed)} type="PRIMARY" style={styles.button}/>
            </View>
            
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
        // height: 128,
        // width: 128
    },
    header: {
        fontSize: 36,
        fontFamily: "Poppins-Header",
        top: 100,
    },
    button: {
        top: 200
    }


})

export default SignUpConfirmationScreen;