import React,{useEffect, useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, RefreshControl } from 'react-native';
import Form from '../components/Todolist'
import { NavigationContainer } from '@react-navigation/native';
import backendURL from '../components/backendURL';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { useFonts } from 'expo-font';
import Planter from '../components/Planter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunityFeed from '../components/communityfeed';
import Modalform from '../components/modalform';


export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const navigation = useNavigation();
  const [username, setUsername] = useState("DefaultUsername");

  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    // Fetch profile when the component mounts
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      // Replace 'your-backend-url' with the actual URL of your backend server
      const token = await _getToken();
      const response = await fetch(`${backendURL}/profile/view`, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          const name = data.userProfile[0].name;
          setUsername(name);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  const addPlanter = () => navigation.navigate("AddPlanterS");

  return (
    <ScrollView style={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    } >
      <Text style={styles.header}>{username}'s farm</Text>
      <View style={styles.tasklist}>
        <Text style={styles.subheader}>to-dos</Text>
        <Modalform></Modalform>
        {/* <CustomButton text="View Outstanding Tasks" onPress={handleSubmit(viewTaskList)} type="PRIMARY" /> */}
      </View>
      <View style={styles.trackers}>
        <View style={styles.addPlanter}>
        <Text style={styles.subheader}>my triogros</Text>
        <CustomButton text="+ Add Planter" type="TERTIARY" onPress={handleSubmit(addPlanter)}></CustomButton>
        </View>
        {/* Include your Planter component here */}
      <View style={styles.planter}>
        <Planter refreshing={refreshing} onRefresh={onRefresh}></Planter>
      </View>
      </View>
      <View style={styles.communities}>
        <Text style={styles.subheader}>community</Text>
        <CommunityFeed refreshing={refreshing} onRefresh={onRefresh} ></CommunityFeed>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    padding: 10,
    backgroundColor: '#FAF4E6',
    height:"100%"
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    color:"#004F18",
    top: 15,
  },
  subheader: {
    fontSize: 25,
    fontFamily: "Poppins-Header",
    color:"#FAF4E6",
  },
  tasklist: {
    backgroundColor: "#004F18",
    padding: 10,
  },
  trackers: {
    top: 10,
    backgroundColor:"#4B2209",
    padding: 10,
  },
  communities: {
    top: 20,
    backgroundColor: "#D9839D",
    padding: 10,
    paddingBottom: 300,
    height: "80%"
  },
  addPlanter: {
    flexDirection:"row",
    justifyContent: 'space-between',
  },
  planter:{
    // alignItems:"center",
    padding: 30,
  }
  
});
