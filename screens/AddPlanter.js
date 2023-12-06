import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import backendURL from '../components/backendURL';
import Planter from '../components/Planter';
import BleManager from 'react-native-ble-manager';
import BleManagerInstance from '../components/BleManagerInstance';

const AddPlanter = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const navigation = useNavigation();
  const [raspberryPiId, setRaspberryPiId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const manager = BleManagerInstance;

  useEffect(() => {
    manager.startDeviceScan(null, null, (error, scanResult) => {
      if (!error) {
        console.log('Scan Result:', scanResult);

        const raspberryPiDevice = scanResult.devices.find(
          device => device.name === 'Raspberry Pi'
        );

        if (raspberryPiDevice) {
          manager.stopDeviceScan();

          manager
            .connect(raspberryPiDevice.id)
            .then(() => {
              setIsConnected(true);

              // Listen for incoming data from the Raspberry Pi
              raspberryPiDevice.onData((data) => {
                const receivedRaspberryPiId = data.toString();
                setRaspberryPiId(receivedRaspberryPiId);
              });
            })
            .catch(error => {
              console.error('Failed to connect to Raspberry Pi:', error);
            });
        }
      }
    });
  }, []);

  const handlePostData = async () => {
    const userId = 1; // Replace with the actual logged-in user's ID
    const request = {
      raspberryPiId: raspberryPiId,
      userId: userId
    };

    try {
      const response = await fetch('https://your-mysql-database-endpoint/post-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      const responseData = await response.json();
      console.log('Data posted successfully:', responseData);
    } catch (error) {
      console.error('Failed to post data:', error);
    }
  };

  return (
    <View>
      <Text>Raspberry Pi ID: {raspberryPiId}</Text>
      <Button title="Post Data" onPress={handlePostData} disabled={!isConnected} />
    </View>
  );
};

export default AddPlanter;