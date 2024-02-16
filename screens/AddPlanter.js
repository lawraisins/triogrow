import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import DeviceModal from '../DeviceConnectionModal';
import { useState } from 'react';
import useBLE from '../useBLE';

export default function AddPlanter() {
  const { requestPermissions, scanForPeripherals, allDevices } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals(); // Scan for devices after getting permissions
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton text="Scan for Bluetooth Devices" onPress={openModal} />
      <DeviceModal
        closeModal={() => setIsModalVisible(false)}
        visible={isModalVisible}
        connectToPeripheral={(device) => {}}
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