import React,{useEffect, useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import Planter from '../components/Planter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const navigation = useNavigation();
  const [username, setUsername] = useState("DefaultUsername");

  const getUsername = async () => {
    try {
      const name = await AsyncStorage.getItem('Name');
      if (name) {
        setUsername(name);
      }
    } catch (error) {
      console.error("Error retrieving username from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // Fetch the username when the component mounts
    getUsername();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const viewTaskList = () => navigation.navigate("Todo");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hello, {username}!</Text>
      <View style={styles.tasklist}>
        <Text style={styles.subheader}>Today's Tasks:</Text>
        <CustomButton text="View Outstanding Tasks" onPress={handleSubmit(viewTaskList)} type="PRIMARY" />
      </View>
      <View style={styles.trackers}>
        <Text style={styles.subheader}>Your Trackers:</Text>
        <CustomButton text="+ Add Planter" onPress={navigation.navigate("AddPlanter")} type="PRIMARY"></CustomButton>
        {/* Include your Planter component here */}
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
