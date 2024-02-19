import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import DeviceModal from '../DeviceConnectionModal';
import { useState } from 'react';
import useBLE from '../useBLE';
import {useForm, Controller} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';

export default function AddPlanter() {
  const { requestPermissions, scanForPeripherals, allDevices, connectToDevice, connectedDevice } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}, watch} = useForm();

  const openModal = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals(); // Scan for devices after getting permissions
      setIsModalVisible(true);
    }
  };

  const home = () => navigation.navigate("Profile");

  return (
    <View style={styles.container}>
      <CustomButton text="Back" onPress={handleSubmit(home)}></CustomButton>
      <CustomButton text="Scan for Bluetooth Devices" onPress={openModal} />
      <DeviceModal
        closeModal={() => setIsModalVisible(false)}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});