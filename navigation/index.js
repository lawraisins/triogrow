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
import ViewPosts from "../screens/ViewCommunityPost";
import FAQ from "../screens/FAQ";
import Content1 from "../screens/content1";
import Content2 from "../screens/content2";
import Content3 from "../screens/content3";
import Content4 from "../screens/content4";
import Content5 from "../screens/content5";


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
                <Stack.Screen name="ViewPosts" component={ViewPosts}/>
                <Stack.Screen name="FAQ" component={FAQ}/>
                <Stack.Screen name="content1" component={Content1}/>
                <Stack.Screen name="content2" component={Content2}/>
                <Stack.Screen name="content3" component={Content3}/>
                <Stack.Screen name="content4" component={Content4}/>
                <Stack.Screen name="content5" component={Content5}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}


export default Navigation