import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import DeviceModal from '../DeviceConnectionModal';
import { useState, useEffect } from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial-next'
import {useForm, Controller} from 'react-hook-form'
import useBLE from '../useBLE';
import { useNavigation } from '@react-navigation/native';
import ModalWifi from '../components/modalWifi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import backendURL from '../components/backendURL';

export default function AddPlanterS() {
  const { requestPermissions } = useBLE(); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [upDevices, setUpDevices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  // const [ssids, setSsids] = useState([]);
  const [password, setPassword] = useState('');
  const [showWifiModal, setShowWifiModal] = useState(false);
  const [ssids, setSsids] = useState(null) 
  const [rpiId, setRpiId] = useState("")

  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    console.log('rpiId:', rpiId);
  }, [rpiId]); // Will trigger whenever rpiId changes

  useEffect(() => {
    const sendRpiIdToBackend = async () => {
      if (rpiId !== "") { // Ensure rpiId is not empty
        console.log("Sending RPI_ID to backend:", rpiId);
        await addPlanter(rpiId);
      }
    };
  
    sendRpiIdToBackend();
  }, [rpiId]); // Run whenever rpiId changes
  

  const addPlanter = async (RPI_ID) => {
    try {        
        const token = await _getToken();
        const response = await axios.post(`${backendURL}/planter/addPlanter`,{RPI_ID}, {
            headers: {
              Authorization: `${token}`, // Access the token from the headers
            }
          });
        console.log("RPI_ID to be sent:", RPI_ID);
        Alert.alert("Planter Added Successfully!")
    
    } catch (error) {
        console.error('Posting error: ', error.response.data);
        if (error.response) {
            console.error('Server error: ', error.response.data);
        } else if (error.request) {
            console.error('No response received from the server', error);
        } else {
            console.error('Request setup error: ', error);
        }
    }

}

  

  useEffect(() => {
    const fetchDevices = async () => {
      const isPermissionsEnabled = await requestPermissions();
      if (isPermissionsEnabled) {
        try {
        await scanForDevices()
        } catch (error) {
          console.log('Error scanning for devices:', error);
        }
      }
    };
    fetchDevices();
    // const interval = setInterval(async () => {
    //   await scanForDevices();
    // }, 5000);

    // Clean up interval on component unmount
    // return () => clearInterval(interval);
  }, []
);

// const removeDuplicates = (objects) => {
//   // Create a Set using a custom comparison key (SSID + Authentication)
//   const uniqueSet = new Set(objects.map(obj => JSON.stringify({ ssid: obj.ssid, authentication: obj.authentication })));
  
//   // Convert the Set back to an array of objects
//   const uniqueArray = Array.from(uniqueSet, str => JSON.parse(str));
  
//   return uniqueArray;
// };





  const scanForDevices = async () => {
    try {
      console.log("Scanning for device...")
      const unpairedDevices = await BluetoothSerial.discoverUnpairedDevices();
      console.log(unpairedDevices)
      const discoveredDevices = await BluetoothSerial.list();
      console.log(discoveredDevices)
      const unpairedDevicesWithTriogrow = unpairedDevices
      const devicesWithTriogrow = discoveredDevices
      console.log(unpairedDevices);
      setUpDevices(unpairedDevicesWithTriogrow)
      console.log(devicesWithTriogrow);
      setDevices(devicesWithTriogrow);
    } catch (error) {
      console.log('Error scanning for devices:', error);
    }
  };

  const connectToSelectedDevice = async (deviceId) => {
    console.log("connecting");
    try {
      await BluetoothSerial.connect(deviceId);
      //Need to send byte to pair

      console.log('Connected to device with ID:', deviceId);
      Alert.alert("Connected to device!");
      setSelectedDeviceId(deviceId);
      await BluetoothSerial.write("0");
      let retries = 3; // Number of retries
      let data = null;
    
      while (retries > 0) {
        try {
          console.log("Gonna read");
          await new Promise(resolve => setTimeout(resolve, 5000));
          console.log("Waited 5 seconds")
          //1 second delay?
          data = await BluetoothSerial.readFromDevice(selectedDeviceId);
          if (data !== null) {
            await new Promise(resolve => setTimeout(resolve, 5000));
            console.log("Waited 5 seconds")
            console.log("Data:", data)
            setSsids(JSON.parse(data));
            console.log("SSIDs:", ssids);
            setShowWifiModal(true)
            break; // Exit the loop if data is not null
          } else {
            retries--; // Decrement retries if data is null
            console.log("Data is null, retrying...");
          }
        } catch (error) {
          console.log('Error reading data', error);
          retries--; // Decrement retries if reading data fails
          console.log('Retrying...');
        }
      } 
      if (retries === 0) {
        console.log('Maximum retries reached. Unable to read data from the device.');
        // Handle the case where maximum retries are reached
        // You can display an error message or take appropriate action here
      }
    } catch (error) {
      console.error('Error connecting to device with ID:', deviceId, error);
      Alert.alert('Error connecting to device!');     
      return; // Exit the function if connection fails
    }
  
  };
  
  


  const connectToWifi = async (ssid, authentication, password) => {
    try {
      console.log("Sending '0' to initiate connection...");
      await BluetoothSerial.write("0");  
      await new Promise(resolve => setTimeout(resolve, 1000));
      await BluetoothSerial.write(JSON.stringify({"ssid": ssid, "authentication": authentication, "password": password}));
      await BluetoothSerial.write("\n");  
      console.log('Sent WiFi network credentials:', ssid, password );
  
      let retries = 5; // Number of retries
      let data = null;
      
      while (retries > 0) {
        try {
          console.log("Waiting for response from device...");
          await new Promise(resolve => setTimeout(resolve, 3000));
          data = await BluetoothSerial.readFromDevice(selectedDeviceId);
          if (data == "ACK") {
            console.log("Received ACK from device:", data);
            await new Promise(resolve => setTimeout(resolve, 20000));
            //Next message after ACK should be RPI ID
            data = await BluetoothSerial.readFromDevice(selectedDeviceId);
            if (data !== undefined) {
              let setRpiIdSuccess = false;
              let rpiIdRetryCount = 3; // Number of retries for setting rpiId
              while (rpiIdRetryCount > 0 && !setRpiIdSuccess) {
                try {
                  console.log("Setting RPI ID:", data);
                  setRpiId(data);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  setRpiIdSuccess = true; // Mark success to exit loop

                } catch (error) {
                  console.log("Error setting RPI ID. Retrying...");
                  rpiIdRetryCount--; // Decrement retry count
                  await new Promise(resolve => setTimeout(resolve, 3000)); // Wait before retry
                }
              }
              if (!setRpiIdSuccess) {
                console.log("Maximum retries reached. Unable to set RPI ID.");
                // Handle the case where maximum retries are reached
                // You can display an error message or take appropriate action here
                break; // Exit the loop if unable to set RPI ID
              }
            }
            break; // Exit the loop if data is received
          } else {
            retries--; // Decrement retries if data is null
            console.log("Data is null, retrying...");
          }
        } catch (error) {
          console.log('Error reading data', error);
          retries--; // Decrement retries if reading data fails
          console.log('Retrying...');
        }
      } 
      if (retries === 0) {
        console.log('Maximum retries reached. Unable to receive response from the device.');
        // Handle the case where maximum retries are reached
        // You can display an error message or take appropriate action here
      }
    } catch (error) {
      console.log('Error connecting to WiFi network:', ssid, error);
    }
  };
  
  

  return (
    <View>
      <Text style={styles.text}>Paired devices:</Text>
      <ScrollView style={styles.scanlist}>
      {devices.filter(device => device.name).map((device) => (
      <View key={device.id} style={styles.device}>
        <CustomButton
          text={device.name}
          onPress={() => connectToSelectedDevice(device.id)}
          type="PRIMARY"
        />
      </View>
    ))}

      </ScrollView>
      <Text style={styles.text}>Unpaired devices:</Text>
      <ScrollView style={styles.scanlist}>
      {upDevices.filter(device => device.name).map((device) => (
        <View key={device.id} style={styles.device}>
          <CustomButton
            text={device.name}
            onPress={() => connectToSelectedDevice(device.id)}
            type="PRIMARY"
          />
        </View>
      ))}
      </ScrollView>
          {showWifiModal && (
      <ModalWifi
        ssids={ssids}
        connectToWifi={connectToWifi}
        onClose={() => setShowWifiModal(false)}
      />
    )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily:"Poppins",
    color: "#4B2209",
    fontSize: 22,

  },
  device: {
    width: "80%",
    padding: 10,
    alignSelf:"center",
  },
  scanlist: {
    paddingBottom: 20,
  }
});

