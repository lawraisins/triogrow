import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar'; 
import { Formik } from "formik"; // Formik
import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons"; // icons

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    Colors,
    MessageBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent
} from './../components/styles'
import { View } from "react-native";

// Colors
const {brand, darkLight, primary} = Colors;

// function that creates login area
// StatusBar style='dark' only works on android
const Login = () => {
    // create state to monitor when to hide/show password which will determine which eye icon to show
    const [hidePassword, setHidePassword] = useState(true);

    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode='cover' source={require('./../assets/img/img1.png')}/>
                <PageTitle>Flower Crib</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values) => {console.log(values);}}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        <MyTextInput 
                            label="Email Address"
                            icon="mail"
                            placeholder="100XXXX@mymail.sutd.edu.sg"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')} // when Formik initialValue 'email' changes
                            onBlur={handleBlur('email')} // when Formik initialValue 'email' changes
                            value={values.email} // taken from Formik initialValues
                            keyboardType="email-address"
                        />

                        <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')} // when Formik initialValue 'password' changes
                            onBlur={handleBlur('password')} // when Formik initialValue 'password' changes
                            value={values.password} // taken from Formik initialValues
                            secureTextEntry={hidePassword} // censors password
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MessageBox>...</MessageBox>
                        {/* When button pressed, call handleSubmit */}
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>
                        <Line />
                        {/* add property 'google' to style button differently in style.js */}
                        <StyledButton google={true} onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={25} />
                            <ButtonText google={true}>Sign In with Google</ButtonText>
                        </StyledButton>
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink>
                                <TextLinkContent>Sign up</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

 // function that creates input fields
 const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {/* Check if field is password field + display eye icon ONLY IN password field  */}
            {isPassword && ( 
                // Clicking the eye icon toggles password visibility + eye icon  
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    {/* depending on hidePassword state, the eye icon will change accordingly */}
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}/>
                </RightIcon>
            )} 
        </View>
    )
 }

export default Login;