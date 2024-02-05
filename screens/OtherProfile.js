import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form'
import CustomButton from '../components/CustomButton';
import OtherUser from '../components/otheruser';
import backendURL from '../components/backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonalFeed from '../components/personalfeed';
import OtherFeed from '../components/otherfeed';

//This is to obtain the profile of other users
const _getToken = async () => {
  try {
    const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
    return storedToken;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
};


export default function OtherProfile({route}) {
    const id = route.params.userId;
    console.log(route.params)
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
      const response = await fetch(`${backendURL}/profile/viewOther`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        try {
          const name = data.userProfile[0].name;
          const username = data.userProfile[0].username;
          const bio = data.userProfile[0].bio;
          setUsername(name);
          setHandle(username);
          setBio(bio);
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


//   const follow= async () => {
//           navigation.navigate('EditProfile');
//       }


  return (
    <ScrollView style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } >
    <View style={styles.User}><OtherUser onRefresh={handleRefresh} userId={id}></OtherUser></View>
    <View style={styles.signout}>
    <View style={styles.edit}>
      <CustomButton text="Follow" type="PRIMARY"></CustomButton>
    </View>
    <OtherFeed refreshing={refreshing} onRefresh={onRefresh} userId={id}></OtherFeed>
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