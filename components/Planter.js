import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, Alert, FlatList } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './CustomButton';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import backendURL from './backendURL';
import io from 'socket.io-client'
import LinearGauge from './linearGauge';
import Droplet from '../assets/images/greendroplet.png'


const Planter = ({refreshing, onRefresh }) =>  {
  const [socketId, setSocketId] = useState("");
  const [planters, setPlanters] = useState([]);

  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };
    const {control, handleSubmit, formState: {errors},} = useForm();

  const capitalizeFirstLetter = (str) => {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  };



  // Get the socketId from the DB
  const getSocketId = async (id) => {
    try {
      // Replace 'your-backend-url' with the actual URL of your backend server
      const token = await _getToken();
      const response = await fetch(`${backendURL}/planter/getSocketId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({"RPI_ID":id}), // Pass userId as an object with a single property
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state with the retrieved posts
        setSocketId(data.socketId)
        console.log(socketId)
      } else {
        console.error('Failed to retrieve posts:', data.error);
      }
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

    
  const socket = io('http://124.155.214.143:5000');
  // Listen for 'connect' event
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });
  


  // Need to pass the socketId to the backend so that it can send the pump value to the RPi
  const onPumpPressed = async (rpi_id) => {
    try {
      await getSocketId(rpi_id);
      const socket = io('http://124.155.214.143:5000');
      socket.on('connect', () => {
        console.log('Connected to socket server');
      });
      // await socket.emit('pump_command', "SlR7g2hxgElZTSIQAAAP");
      await socket.emit('pump_command', socketId);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const fetchPlanters = async () => {
    try {
      // Replace 'your-backend-url' with the actual URL of your backend server
      const token = await _getToken();
      const response = await fetch(`${backendURL}/planter/getPlanterData`,{
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        }
      });
      const data = await response.json();
      if (response.ok) {
        // Update the state with the retrieved posts
        setPlanters(data.content)            
      } else {
        console.error('Failed to retrieve planters:', data.error);
      }
    } catch (error) {
      console.error('Error fetching planters:', error.message);
    }
  };
;

    useEffect(() => {
      // Fetch posts when the component mounts
      fetchPlanters();
    }, []);
    useEffect(() => {
      if (refreshing) {
        fetchPlanters();
      }
    }, [refreshing]);


    const renderItem = ({ item }) => {
      const dropletCount =
        item.waterLevel === "high" ? 3 :
        item.waterLevel === "low" ? 1 : 0;
    
      const dropletIcons = Array.from({ length: dropletCount }).map((_, index) => (
        <Image key={index} source={Droplet} style={styles.image} />
      ));
    
      return (
        <View style={styles.container}>
          <View style={styles.pump}>
            <Image source={{ uri: `data:image/jpeg;base64,${item.imageStream}` }} style={{ width: 150, height: 150, borderRadius: 20 }} />
            <CustomButton text="Pump" onPress={handleSubmit(onPumpPressed(item.id))} type="PRIMARY" style={styles.button} />
          </View>
          <View style={styles.sensors}>
            <LinearGauge label="Nitrogen" value={item.nitrogen} maxValue={100} />
            <LinearGauge label="Phosphorus" value={item.phosphorus} maxValue={100} />
            <LinearGauge label="Potassium" value={item.potassium} maxValue={100} />
            <Text style={styles.text}>Water Level</Text>
            <View style={styles.dropletContainer}>
              {dropletIcons}
            </View>
          </View>     
        </View>
      );
    };
    

  return (
    <FlatList
    data={planters}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    horizontal
    refreshing={refreshing}
    onRefresh={async () => {
      // Fetch posts again when refreshing
      await fetchPlanters();
      onRefresh();
    }}
    style={styles.planters}
  />

  );
    }

  

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF4E6',
    borderRadius: 15,
    padding: 5,
    marginRight: 10,
    flexDirection:"row",
    alignContent:"center",

  },
  text: {
    fontSize: 16,
    fontFamily: "Arial-Rounded",
    color: "#4B2209",
  },
  image: {
    width:30,
    height:30,
    marginRight: 5,
    resizeMode: "contain",
    // tintColor: "#4B2209",
    

  },
  pump: {
    marginRight: 10, // Add margin to separate pump and sensor views
  },
  sensors: {
    // width: "80%"
  },
  button:{
    flex: 1,
    width: "30%"
  },
  dropletContainer:{
    flexDirection: "row",
    alignItems: "center",
  }
});
export default Planter;