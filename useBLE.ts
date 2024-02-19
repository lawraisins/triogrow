import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform, BackHandler } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

import * as ExpoDevice from "expo-device";

interface BluetoothLowEnergyApi {
    // 2 methods:
    requestPermissions(): Promise<boolean>;
    scanForPeripherals(): void;
    allDevices: Device[];
    connectToDevice: (deviceId: Device) => Promise<void>;
    connectedDevice: Device | null;
}

//delay function
const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
};

function useBLE(): BluetoothLowEnergyApi {
    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState<Device[]>([]);
    const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

    const checkBluetoothState = async () => {
        const isBluetoothEnabled = await BluetoothStateManager.getState();
        // console.log(isBluetoothEnabled);
        if (isBluetoothEnabled == "PoweredOff") {
          BluetoothStateManager.requestToEnable();
        };
        // ADD DELAY HERE
        
        if (isBluetoothEnabled == "PoweredOff") {
            BackHandler.exitApp()
        };
    };

    // For Android 31 and newer
    const requestAndroid31Permissions = async() => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Scan Permission",
                message: "App requires Bluetooth scanning",
                buttonPositive: "OK",
            }
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Scan Permission",
                message: "App requires Bluetooth connecting",
                buttonPositive: "OK",
            }
        );
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Scan Permission",
                message: "App requires fine location",
                buttonPositive: "OK",
            }
        );

        return (
            bluetoothScanPermission === "granted" &&
            bluetoothConnectPermission === "granted" &&
            bluetoothFineLocationPermission === "granted"
        )
    };

    const requestPermissions = async () => {
        if(Platform.OS === "android") {
            if((ExpoDevice.platformApiLevel ?? - 1) < 31) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission", 
                        message: "Bluetooth requires location",
                        buttonPositive: "OK"
                    }
                );

                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
                return isAndroid31PermissionsGranted
            }
        } else {
            return true;
        }
    };
    
    // Check for duplicates by looping through the device array
    // & check if device is equal to the one you found
    const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    // Scan for surrounding devices
   // After switching on bluetooth through app, DOESN'T SCAN
    const scanForPeripherals = async() => {
        checkBluetoothState();
        //console.log(await BluetoothStateManager.getState());
        while(await BluetoothStateManager.getState() == "PoweredOff")
        {
            await delay(500);
        }
        //Timeout
        await delay(2000);
        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("On Press", error);
            }
            // if a device is found
            //if (device && device.name?.includes("triogrow")) {
            if (device.name) {
                console.log("Found")
                setAllDevices((prevState) => {
                    if (!isDuplicateDevice(prevState, device)) {
                        return [...prevState, device];
                    }
                    return prevState;
                });
            }
        });

    };

    const connectToDevice = async(device: Device) => {
        try {
            delay(500)
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            console.log("Connection established")
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan()
        } catch(e) {
            console.log("ERROR IN CONNECTION", )
        }
    }

    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice,
        connectedDevice,
    };
};

export default useBLE;