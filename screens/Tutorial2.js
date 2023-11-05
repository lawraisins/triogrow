import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

const SOIL_BUILDING = "https://youtu.be/IRdP04ClG_k?si=NcUk-EQqAWyNLxmA"

const Tutorial = () => {
    console.log("Tutorial 2 launched")
    return (
        <View>
        <View style={{width: "100%", height: "100%"}}>
            <VideoPlayer
                sourcelink = {SOIL_BUILDING}
            ></VideoPlayer>
        </View>
        <StatusBar style = "auto" />
        </View>
    )




}

export default Tutorial
