import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

const COMPOST_TUBE = "https://youtu.be/CT4YeCWeST4?si=xkhPKMnuo2LCusgg?"

const Tutorial = () => {
    console.log("Tutorial 1 launched")
    return (
        <View>
        <View style={{width: "100%", height: "100%"}}>
            <VideoPlayer
                sourcelink = {COMPOST_TUBE}
            ></VideoPlayer>
        </View>
        <StatusBar style = "auto" />
        </View>
    )




}

export default Tutorial
