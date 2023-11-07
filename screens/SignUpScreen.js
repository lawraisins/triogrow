import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { useFonts } from 'expo-font';
import axios from 'axios';

const SignUpScreen = () => {
    const {control, handleSubmit, formState: {errors}, watch} = useForm();
    const pwd = watch('password')
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setemail] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const onRegisterPressed = async (data) => { // changed this to async function
    
        // navigation.navigate("SignIn") // moved this to line 54
        // console.log(data)
        rname = data.name
        rusername = data.username
        remail = data.email
        rpassword = data.password

        // pass the sign up information to the backend
        try {
            // Remember to change the backend server URL accordingly!!
            const backendURL = 'http://192.168.50.89:3000';

            // Data to send in the POST request
            const userData = {
                name: rname,
                username: rusername,
                email: remail,
                password: rpassword,
            };

            const api = axios.create({
                baseURL: 'http://localhost',
            })
            

            // for debugging
            console.log('Sending a POST request to register a user...');
            console.log('Request URL: ', `${backendURL}/auth/register`);
            console.log('Data to be sent: ', userData);

            // Make a POST request to register the user
            // ERROR  Registration error:  [AxiosError: Network Error]
            // probably happening on this line
            const response = await axios.post(`${backendURL}/auth/register`, userData);

            // Handle the response, e.g. show a success message or navigate to a new screen
            console.log('Registration successful: ', response.data);
            navigation.navigate("SignIn");
        
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error('Registration error: ', error);
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Server error: ', error);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server', error.response);
            } else {
                // Something happened in setting up the request
                console.error('Request setup error: ', error.message);
            }
        }
        
    };

    const onSignUpPressed = () => {
        navigation.navigate("SignIn")
    }


    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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
            <Text style={styles.title}>Create an Account </Text>
            <CustomInput 
            name="name"
            control={control}
            placeholder="Name"
            rules={{required: "Name is required.", minLength: {value: 3, message: "Name should be at least 3 characters long.", maxLength: {value: 20, message: "Name cannot be longer than 20 characters long."}}}}
             />
            <CustomInput 
            name="username"
            control={control}
            placeholder="Username"
            rules={{required: "Username is required.", minLength: {value: 3, message: "Username should be at least 3 characters long.", maxLength: {value: 20, message: "Username cannot be longer than 20 characters long."}}}}
             />
            <CustomInput 
            name="email"
            placeholder="Email"
            control = {control}
            rules={{required: "Email is required.", pattern: {value: mailformat, message: "Email is invalid."}}}
             />
            <CustomInput
            name="password"
            placeholder = "Password"
            control = {control}
            secureTextEntry={true}
            rules={{required: "Password is required.", minLength: {value: 7, message: "Password should be at least 7 characters long."}}}/>

            <CustomInput
            name="confirmpassword"
            placeholder = "Confirm Password"
            control = {control}
            secureTextEntry={true}
            rules={{
                validate: value => value == pwd || "Passwords do not match.",
            }}/>

            <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} type="PRIMARY"/>

            <Text style={styles.text}>
                By registering, you confirm that you accept our {''} 
                <Text style={styles.link}>Terms of Use</Text>{' '} and {' '}
                <Text style={styles.link}>Privacy Policy</Text>.
            </Text>

            <CustomButton
            text="Have an account? Sign in"
            onPress={onSignUpPressed}
            type="PRIMARY"></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
        backgroundColor: '#BEE4FF',
        height: "100%"
    }, 
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 32,
        fontFamily: "Poppins-Header",
        color: "#051C60",
        margin: 10,
    },
    link: {
        color: "#FDF76A",

    }
})

export default SignUpScreen;