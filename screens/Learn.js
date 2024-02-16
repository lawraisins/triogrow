import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';


const COMPOST_TUBE = "https://youtu.be/CT4YeCWeST4?si=xkhPKMnuo2LCusgg"
const SOIL_BUILDING = "https://youtu.be/IRdP04ClG_k?si=NcUk-EQqAWyNLxmA"



export default function Learn() {
  const {control, handleSubmit, formState: {errors}, watch} = useForm()
  const navigation = useNavigation()
  const [fontsLoaded] = useFonts (
    {
         "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
         "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
  }
  );
  
  if (!fontsLoaded) {
      return undefined
  }

  const viewTutorial = () =>  navigation.navigate("Tutorial")
  const viewTutorial2 = () =>  navigation.navigate("Tutorial2")
  return (
<View style={styles.container}>
        <Text style={styles.header}>Let's Learn!</Text>
        <View style={styles.videos}>
        <Text style={styles.subheader}>Video Tutorials</Text>
        <CustomButton text="Tutorial 1: Compost Tube" onPress={handleSubmit(viewTutorial)} type="PRIMARY"></CustomButton>
        <CustomButton text="Tutorial 2: Soil Building" onPress={handleSubmit(viewTutorial2)} type="PRIMARY"></CustomButton>
        </View>
       
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    top: 55,
  },
  subheader: {
    fontSize: 25,
    fontFamily: "Poppins",
  },
  videos: {
    top: 83,
  },
  
});