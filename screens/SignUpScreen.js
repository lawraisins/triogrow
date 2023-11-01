import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../assets/images/squirtle.png';
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
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
    const onRegisterPressed = (data) => {
        navigation.navigate("SignIn")
        console.log(data)
        rname = data.name
        rusername = data.username
        remail = data.email
        rpassword = data.password
    }

    const onSignUpPressed = () => {
        navigation.navigate("SignIn")
    }

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

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
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,

    },
    link: {
        color: "#FDF76A",

    }
})

export default SignUpScreen;