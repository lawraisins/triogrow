import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"
import CustomButton from './CustomButton';
import { useFonts } from 'expo-font';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';


const Planter = () =>  {
    const {control, handleSubmit, formState: {errors},} = useForm();
    // const navigation = useNavigation();
    const [pump, setPump] = useState(0);
    const onPumpPressed = async () => {
        if (pump == 0) {
            setPump(1)
        } else {
            setPump(0)
        }
        console.log("Current pump value", pump)

        try {
            // Remember to change the backend server URL accordingly!!
            const backendURL = 'http://172.20.10.2:3000';

            // Data to send in the POST request
            const pumpData = 
                {"newPumpNumber": pump}
            ;
            

            // for debugging
            console.log('Sending a POST request to change pump value...');
            console.log('Request URL: ', `${backendURL}/updatePump`);
            console.log('Data to be sent: ', pumpData);

            // Make a POST request to register the user
            // ERROR  Registration error:  [AxiosError: Network Error]
            // probably happening on this line
            const response = await axios.post(`${backendURL}/updatePump`, pumpData);

            // Handle the response, e.g. show a success message or navigate to a new screen
            console.log('Pump Value Updated: ', response.data);
        
        } catch (error) {
            // Handle any errors that occur during the registration process
            console.error('Update error: ', error);
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Server error: ', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from the server', error);
            } else {
                // Something happened in setting up the request
                console.error('Request setup error: ', error);
            }
        }
    }

    





  return (
    <View style={styles.container}>
        <Text style={styles.text}>Potato Plant</Text>
        <Image source={require("../assets/images/potato.jpeg")} style={styles.image}></Image>
        <CustomButton text = "Pump" onPress={handleSubmit(onPumpPressed)} type="PRIMARY" style={styles.pump}></CustomButton>
  
    </View>
  );
    }

  

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    backgroundColor: "white",

  },
  tasksWrapper: {
    paddingHorizontal: 20
  },
  text: {
    fontSize: 16,
    fontFamily: "Poppins-Header",
  },
  items: {
    top: 55,
  },  
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#FDF76A",
    borderWidth: 2,
    width: 280,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FDF76A",
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,



  },
  image: {
    width:100,
    height:100,
    borderColor:"black",
    borderWidth: 2,
    borderRadius:15,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    

  },
});
export default Planter;