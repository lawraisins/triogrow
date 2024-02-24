import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import DeviceModal from '../DeviceConnectionModal';
import { useState, useEffect } from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial-next'
import {useForm, Controller} from 'react-hook-form'
import useBLE from '../useBLE';
import { useNavigation } from '@react-navigation/native';

export default function AddPlanterS() {
  const { requestPermissions } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [ssids, setSsids] = useState([]);
  const [password, setPassword] = useState('');

  

  useEffect(async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
    scanForDevices();
    }
  }, []);

//   function filterByValue(array, string) {
//     return array.filter(o =>
//         Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
// }



  const scanForDevices = async () => {
    try {
      const unpairedDevices = await BluetoothSerial.discoverUnpairedDevices();

      console.log(unpairedDevices)
      const discoveredDevices = await BluetoothSerial.list();
      console.log(discoveredDevices)
      // const triogrows = filterByValue(unpairedDevices, "triogrow")
      const devicesWithTriogrow = discoveredDevices.filter(device => device.name === "raspberrypi");
      console.log(devicesWithTriogrow)
      setDevices(devicesWithTriogrow);
    } catch (error) {
      console.log('Error scanning for devices:', error);
    }
  };

  const connectToSelectedDevice = async (deviceId) => {
    try {
      await BluetoothSerial.connect(deviceId);
      console.log('Connected to device with ID:', deviceId);
      setSelectedDeviceId(deviceId);
      await BluetoothSerial.write('get_ssids');
    } catch (error) {
      console.log('Error connecting to device with ID:', deviceId, error);     
    }
    try{
    console.log("Gonna read")
    // BluetoothSerial.read((data, subscription) => {
    //   console.log("Reading", data)
    // }, "\r\n");
    const data = await BluetoothSerial.readFromDevice(deviceId)
    console.log(data)
  } catch (error) {
    console.log('Error reading data',  error);     
  }

  };

  const receiveSsids = (ssids) => {
    setSsids(ssids);
  };
  
  BluetoothSerial.on('data', (data) => {
    if (selectedDeviceId && data.includes('ssids')) {
      const startIndex = data.indexOf('ssids:') + 'ssids:'.length;
      const endIndex = data.indexOf('end_ssids');
      const ssidsString = data.slice(startIndex, endIndex);
      const parsedSsids = JSON.parse(ssidsString);
      receiveSsids(parsedSsids);
    }
  });

  const connectToWifi = async (ssid, password) => {
    try {
      await BluetoothSerial.write(`bless`);
      console.log('Connected to WiFi network:', ssid);
    } catch (error) {
      console.log('Error connecting to WiFi network:', ssid, error);
    }
  };

  return (
    <View>
      <Text>Available devices:</Text>
      <ScrollView style={styles.scanlist}>
        {devices.map((device) => (
          <Button
            key={device.id}
            title={device.name || 'Unknown'}
            onPress={() => connectToSelectedDevice(device.id)}
          />
        ))}
      </ScrollView>
      {selectedDeviceId && (
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
  scanlist: {
    height: "100%",
  }
});