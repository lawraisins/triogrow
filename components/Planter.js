import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, Alert } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from './CustomButton';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import backendURL from './backendURL';


const Planter = () =>  {
    const {control, handleSubmit, formState: {errors},} = useForm();
    // const navigation = useNavigation();
    const [pump, setPump] = useState(0);
    const onPumpPressed = async () => {
        if (pump == 0) {
            setPump(1)
            Alert.alert("Pump has been turned off!")
        } else {
            setPump(0)
            Alert.alert("Pump has been turned on!")
        }
        console.log("Current pump value", pump)

        try {
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
                console.error('No response received from the server', error.response.data);
            } else {
                // Something happened in setting up the request
                console.error('Request setup error: ', error.response.data);
            }
        }
    }

    





  return (
    <View style={styles.container}>
        <Text style={styles.text}>Potato Plant</Text>
        <View style={styles.pump}>
        <Image source={require("../assets/images/potato.jpeg")} style={styles.image}></Image>
        <CustomButton text = "Pump" onPress={handleSubmit(onPumpPressed)} type="TERTIARY" style={styles.button} ></CustomButton>
        </View>
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
  pump:{
    flexDirection:'row',
    alignItems:'flex-start'
  },
  button:{
    margin: 10,
  }
});
export default Planter;