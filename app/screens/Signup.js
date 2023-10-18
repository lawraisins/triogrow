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
import { TouchableOpacity, View, Modal, Button } from "react-native";

// Colors
const {brand, darkLight, primary} = Colors;

// DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

// function that creates login area
// StatusBar style='dark' only works on android
const Signup = () => {
    
    // KEEP TRACK OF YOUR STATES
    // create state to monitor when to hide/show password which will determine which eye icon to show
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false); // controls appearance of DateTimePicker
    const [date, setDate]  = useState(new Date(2000, 0, 1));
    // Actual DOB to be submitted
    const [dob, setDob] = useState();

    // This function runs whenever the date on the DatePicker changes
    const onChange = (event, selectedDate) => {
        // if value changes, set current date to most current changed value
        // if value no change,  set to the initial date
        const currentDate = selectedDate || date;
        setShow(false); // hide dateTimePicker after picking DOB
        setDate(currentDate); // set the date to the current date (not to be displayed in dob field)
        setDob(currentDate); // set the dob to the current date
    }

    // Sets 'show' state to true
    const showDatePicker = () => {
        setShow(true);
    }

    // Uncomment if using modal for DateTimePicker
    // const closeDatePicker = () => {
    //     setShow(false);
    // }

    return (
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                {/* <PageLogo resizeMode='cover' source={require('./../assets/img/img1.png')}/> */}
                <PageTitle>Flower Crib</PageTitle>
                <SubTitle>Account Signup</SubTitle>

                {/* Displays DateTimePicker */}
                {/* Downside: DateTimePicker hides after changing just the day, the month, or the year. */}
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                    />
                )}
                
                {/* This was an attempt to stop DateTimePicker from hiding after changing just */}
                {/* the day, the month, or the year. */}
                {/* {show && (
                    <Modal
                        visible={showDatePicker}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={closeDatePicker}
                    >
                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View>
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="spinner" // Set display to 'spinner' for iOS
                                onChange={onChange}
                                />
                                <Button title="Close" onPress={closeDatePicker} />
                            </View>
                        </View>
                  </Modal>
                )} */}

                <Formik
                    initialValues={
                        {
                            fullName: '',
                            dateOfBirth: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }
                    }
                    onSubmit={(values) => {console.log(values);}}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        <MyTextInput
                            label="Full Name"
                            icon="person"
                            placeholder="Momo Papa"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullName')} // when Formik initialValue 'fullName' changes
                            onBlur={handleBlur('fullName')} // when Formik initialValue 'fullName' changes
                            value={values.fullName} // taken from Formik initialValues
                        />

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
                            label="Date of Birth"
                            icon="calendar"
                            placeholder="YYYY/MM/DD"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('dateOfBirth')} // when Formik initialValue 'dateOfBirth' changes
                            onBlur={handleBlur('dateOfBirth')} // when Formik initialValue 'dateOfBirth' changes
                            value={dob ? dob.toDateString() : ''} // if dob is set, convert date to string. else, leave as empty string 
                            isDate={true}
                            editable={false} // input will be controlled by datePicker
                            showDatePicker={showDatePicker}
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

                        <MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            placeholder="********"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmPassword')} // when Formik initialValue 'password' changes
                            onBlur={handleBlur('confirmPassword')} // when Formik initialValue 'password' changes
                            value={values.confirmPassword} // taken from Formik initialValues
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
                        {/* <StyledButton google={true} onPress={handleSubmit}>
                            <Fontisto name="google" color={primary} size={25} />
                            <ButtonText google={true}>Sign In with Google</ButtonText>
                        </StyledButton> */}
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink>
                                <TextLinkContent>Login</TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}
                </Formik>
            </InnerContainer>
        </StyledContainer>
    );
}

 // function that creates input fields
 const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {/* If the field IS NOT dob, display rest of fields as per normal */}
            {!isDate && <StyledTextInput {...props} />}
            {/* If the field IS dob, show the date picker */}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
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

export default Signup;