import React from "react";
import {View, Text} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from '../screens/SignUpScreen';
import Landing from "../screens/Landing";
import Todo from "../screens/Todo"
import Tutorial from "../screens/Tutorial";
const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Landing" component={Landing}/>
                <Stack.Screen name="Todo" component={Todo}/>
                <Stack.Screen name="Tutorial" component={Tutorial}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}


export default Navigation