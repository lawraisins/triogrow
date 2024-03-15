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
import PersonalFeed from '../components/personalfeed';
import FullFeed from '../components/fullfeed';
import CommunityFeed from '../components/communityfeed';

const _getToken = async () => {
  try {
    const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
    return storedToken;
  } catch (error) {
    console.error('Error fetching token from AsyncStorage:', error);
  }
};

const ViewPosts = ({route}) => {
  const { community } = route.params;
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

  console.log(community)

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefresh();
  }, [onRefresh]);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts in {community}</Text>
      <FullFeed refreshing={refreshing} onRefresh={onRefresh} community={community} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#FAF4E6',
    padding: 20,
  },
  User: {
    top: 15,
    width: "100%",
  },
  signout: {
    top: 25,
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

export default ViewPosts