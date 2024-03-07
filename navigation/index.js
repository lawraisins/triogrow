import React from "react";
import {View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from '../screens/SignUpScreen';
import Landing from "../screens/Landing";
import Todo from "../screens/Todo"
import Home from "../screens/Home"
import Tutorial from "../screens/Tutorial";
import Tutorial2 from "../screens/Tutorial2";
import SignUpConfirmationScreen from "../screens/SignUpConfirmation";
import Post from "../screens/Post";
import EditProfile from "../screens/EditProfile";
import OtherProfile from "../screens/OtherProfile";
import AddPlanterS from "../screens/AddPlanterSerial";


const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="SignUpConfirmation" component={SignUpConfirmationScreen} />
                <Stack.Screen name="Landing" component={Landing}/>
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="Todo" component={Todo}/>
                <Stack.Screen name="Tutorial" component={Tutorial}/>
                <Stack.Screen name="Tutorial2" component={Tutorial2}/>
                <Stack.Screen name="Post" component={Post}/>
                <Stack.Screen name="EditProfile" component={EditProfile}/>
                <Stack.Screen name="OtherProfile" component={OtherProfile}/>
                <Stack.Screen name="AddPlanterS" component={AddPlanterS}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}


export default Navigation