import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import DeviceModal from '../DeviceConnectionModal';
import { useState } from 'react';
import BluetoothSerial from 'react-native-bluetooth-serial'
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';

export default function AddPlanterS() {
  // const { requestPermissions, scanForPeripherals, allDevices, connectToDevice, connectedDevice } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}, watch} = useForm();
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [ssids, setSsids] = useState([]);
  const [password, setPassword] = useState('');

  useEffect(() => {
    scanForDevices();
  }, []);

  const scanForDevices = async () => {
    try {
      await BluetoothSerial.requestPermission();
      const discoveredDevices = await BluetoothSerial.list();
      setDevices(discoveredDevices);
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
      await BluetoothSerial.write(`connect_wifi:${ssid}:${password}`);
      console.log('Connected to WiFi network:', ssid);
    } catch (error) {
      console.log('Error connecting to WiFi network:', ssid, error);
    }
  };

  return (
    <View>
      <Text>Available devices:</Text>
      <ScrollView>
        {devices.map((device) => (
          <Button
            key={device.id}
            title={device.name}
            onPress={() => connectToSelectedDevice(device.id)}
          />
        ))}
      </ScrollView>
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
});