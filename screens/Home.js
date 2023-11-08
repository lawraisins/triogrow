import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import Planter from '../components/Planter';

export default function Home() {
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts (
    {
         "Poppins-Header": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
         "Poppins": require("../assets/fonts/Poppins/Poppins-Regular.ttf")
  }
  );
  
  if (!fontsLoaded) {
      return undefined
  }

const viewTaskList = () =>  navigation.navigate("Todo")
  return (
    <ScrollView style={styles.container}>

        <Text style={styles.header}>Hello, Farmer!</Text>
        <View style={styles.tasklist}>
        <Text style={styles.subheader}>Today's Tasks:</Text>
        <CustomButton text="View Outstanding Tasks" onPress={handleSubmit(viewTaskList)} type="PRIMARY" ></CustomButton>
        </View>
        <View style={styles.trackers}>
        <Text style={styles.subheader}>Your Trackers:</Text>
        <Planter></Planter>
        </View>
        <View style={styles.communities}>
        <Text style={styles.subheader}>Communities for You:</Text>
        </View>

    </ScrollView>
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
  tasklist: {
    top: 83,
  },
  trackers: {
    top: 103,
  },
  communities: {
    top: 143,
  },
  
});
