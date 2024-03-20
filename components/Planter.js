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


const Planter = () =>  {
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
    const getSocketId = async () => {
      try {
        // Replace 'your-backend-url' with the actual URL of your backend server
        const token = await _getToken();
        const response = await fetch(`${backendURL}/planter/getSocketId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({"RPI_ID":"10000000fa14f7fb"}), // Pass userId as an object with a single property
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

    //Need to pass the socketId to the backend so that it can send the pump value to the RPi
    const onPumpPressed = async () => {
        try {
            // Data to send in the POST request
            getSocketId()
            socket.emit('pump_command', socketId);
        
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error('Update error: ', error);
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Server error: ', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server', error.response.data);
            } else {
                // Something happened in setting up the request
                console.error('Request setup error: ', error.response.data);
            }
        }
    }


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


    useEffect(() => {
      // Fetch posts when the component mounts
      fetchPlanters();
    }, []);


    const renderItem = ({ item }) => {
      return (
        <View style={styles.container}>
        <View style={styles.pump}>
        <Text style={styles.text}>triogro 1</Text>
        <Image source={{ uri: `data:image/jpeg;base64,${item.imageStream}` }} style={{ width: 200, height: 200 }} />
        <CustomButton text = "Pump" onPress={handleSubmit(onPumpPressed)} type="TERTIARY" style={styles.button} ></CustomButton>
        </View>
        <View style={styles.sensors}>
        <LinearGauge label="Nitrogen" value={item.nitrogen} maxValue={100} />
        <LinearGauge label="Phosphorus" value={item.phosphorus} maxValue={100} />
        <LinearGauge label="Potassium" value={item.potassium} maxValue={100} />
        <Text style={styles.text}>Water Level</Text>
        <Text style={{ color: item.waterLevel === "high" ? "green" : item.waterLevel === "low" ? "red" : "black" }}>
          {capitalizeFirstLetter(item.waterLevel)}
        </Text>

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
    // onRefresh={async () => {
    //   // Fetch posts again when refreshing
    //   await fetchPosts();
    //   onRefresh();
    // }}
  />

  );
    }

  

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAF4E6',
    borderRadius: 15,
    padding: 10,
    width:"100%",
    flexDirection:"row",

  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Header",
    color: "#4B2209",
  },
  image: {
    width:50,
    height:50,
    tintColor: "#4B2209",
    

  },
  pump: {
    marginRight: 10, // Add margin to separate pump and sensor views
  },
  sensors: {
  },
  button:{
    flex: 1,
    width: "30%"
  }
});
export default Planter;