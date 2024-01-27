import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form'
import CustomButton from '../components/CustomButton';
import User from '../components/user';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const _getToken = async () => {
  try {
    const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
    return storedToken;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
};


export default function Profile() {
  const [refreshing, setRefreshing] = useState(false);
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const navigation = useNavigation();
  const [username, setUsername] = useState("DefaultUsername");
  const [handle, setHandle] = useState("farmer");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefresh();
  }, [onRefresh]);

  useEffect(() => {
    fetchProfile();
  }, [refreshing, onRefresh]);

  const fetchProfile = async () => {
    try {
      const token = await _getToken();
      const response = await fetch(`${backendURL}/profile/view`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        try {
          const name = data.userProfile[0].name;
          console.log(name)
          const username = data.userProfile[0].username;
          console.log(username)
          const bio = data.userProfile[0].bio;
          console.log(bio)
          setUsername(name);
          setHandle(username);
          setBio(bio);
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving profile data from AsyncStorage:", error);
        }
      } else {
        console.error('Failed to retrieve profile:', data.error);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  };

  const signOut = () =>  navigation.navigate("SignIn")
  const editProfile= async () => {
          navigation.navigate('EditProfile');
      }

  return (
    <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    <View style={styles.User}><User onRefresh={handleRefresh}></User></View>
    <View style={styles.signout}>
    <View style={styles.edit}>
      <CustomButton text="Edit Profile" onPress={handleSubmit(editProfile)} type="TERTIARY"></CustomButton>
    <CustomButton text="Sign Out" onPress={handleSubmit(signOut)} type="TERTIARY"></CustomButton></View>
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
  User: {
    top: 55,
  },
  signout: {
    top: 83,
  },
  edit:{
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button:{
    padding: 10,
    flexDirection:'row',
  }
  
});