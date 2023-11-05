import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';


const COMPOST_TUBE = "https://youtu.be/CT4YeCWeST4?si=xkhPKMnuo2LCusgg"



export default function Learn() {
  const {control, handleSubmit, formState: {errors}, watch} = useForm()
  const navigation = useNavigation()
  const viewTutorial = () =>  navigation.navigate("Tutorial")
  return (
<View style={styles.container}>
        <CustomButton text="Tutorial 1: Compost Tube" onPress={handleSubmit(viewTutorial)} type="PRIMARY"></CustomButton>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FDF76A',
    borderColor: "black",
    borderRadius: 2,
    padding: 10,
  },
  
});