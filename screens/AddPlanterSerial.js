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
  const ssids = [{"ssid": "eduroam", "authentication": "WPA2", "password": ""}, {"ssid": "SUTD_Guest", "authentication": "", "password": ""}, {"ssid": "SUTD_Wifi", "authentication": "WPA2", "password": ""}, {"ssid": "SUTD_Wifi", "authentication": "WPA2", "password": ""}]

  

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
    const interval = setInterval(async () => {
      await scanForDevices();
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []
);

const removeDuplicates = (objects) => {
  const uniqueSet = new Set(objects.flatMap(obj => obj.ssid));
  console.log(uniqueSet)
  const uniqueArray = Array.from(uniqueSet);
  console.log(uniqueArray)
  return uniqueArray;
};

const uniqueSSIDs = removeDuplicates(ssids)
console.log("Original:",ssids)
console.log("Filtered:", uniqueSSIDs)



  const scanForDevices = async () => {
    try {
      const unpairedDevices = await BluetoothSerial.discoverUnpairedDevices();
      console.log(unpairedDevices)
      const discoveredDevices = await BluetoothSerial.list();
      console.log(discoveredDevices)
      // const triogrows = filterByValue(unpairedDevices, "triogrow")
      const unpairedDevicesWithTriogrow = unpairedDevices.filter(device => (device.name === "raspberrypi" || device.name === "Triogrow"));
      const devicesWithTriogrow = discoveredDevices.filter(device => device.name === "raspberrypi");
      console.log(unpairedDevices);
      setUpDevices(unpairedDevicesWithTriogrow)
      console.log(devicesWithTriogrow);
      setDevices(devicesWithTriogrow);
    } catch (error) {
      console.log('Error scanning for devices:', error);
    }
  };

  const connectToSelectedDevice = async (deviceId) => {
    console.log("connecting")
    setShowWifiModal(true);
    try {
      await BluetoothSerial.connect(deviceId);
      console.log('Connected to device with ID:', deviceId);
      Alert.alert("Connected to device!")
      setSelectedDeviceId(deviceId);
    } catch (error) {
      console.log('Error connecting to device with ID:', deviceId, error);
      Alert.alert('Error connecting to device!')     
    }
    try{
    //Modal should pop up if there's no error
    await BluetoothSerial.write('comms check');
    console.log("Gonna read")
    const data = await BluetoothSerial.readFromDevice(deviceId)
    console.log(data)
  } catch (error) {
    console.log('Error reading data',  error);     
  }

  };
  
  // BluetoothSerial.on('data', (data) => {
  //   if (selectedDeviceId && data.includes('ssids')) {
  //     const startIndex = data.indexOf('ssids:') + 'ssids:'.length;
  //     const endIndex = data.indexOf('end_ssids');
  //     const ssidsString = data.slice(startIndex, endIndex);
  //     const parsedSsids = JSON.parse(ssidsString);
  //     receiveSsids(parsedSsids);
  //   }
  // });

  const connectToWifi = async (ssid, password) => {
    try {
      console.log("Connecting to:", ssid, "Password:", password)
      await BluetoothSerial.write(password);
      console.log('Connected to WiFi network:', ssid);
    } catch (error) {
      console.log('Error connecting to WiFi network:', ssid, error);
    }
  };

  return (
    <View>
      <Text style={styles.text}>Paired devices:</Text>
      <ScrollView style={styles.scanlist}>
        {devices.map((device) => (
          <View key={device.id} style={styles.device}>
          <CustomButton
            text={device.name || 'Unknown'}
            onPress={() => connectToSelectedDevice(device.id)}
            type="PRIMARY"
          />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.text}>Unpaired devices:</Text>
      <ScrollView style={styles.scanlist}>
        {upDevices.map((device) => (
          <View key={device.id} style={styles.device}>
          <CustomButton
            text={device.name || 'Unknown'}
            onPress={() => connectToSelectedDevice(device.id)}
            type="PRIMARY"
          />
          </View>
        ))}
      </ScrollView>
          {showWifiModal && (
      <ModalWifi
        ssids={uniqueSSIDs}
        connectToWifi={connectToWifi}
        onClose={() => setShowWifiModal(false)}
      />
    )}
      {/* {selectedDeviceId && (
        <View>
          <Text>Select WiFi network:</Text>
          <ScrollView>
            {ssids.map((ssid) => (
              <Button 
                key={ssid}
                title={ssid}
                onPress={() => connectToWifi(ssid, password)}
              />
            ))}
          </ScrollView>
          <TextInput
            placeholder="WiFi password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      )} */}
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
  }
});