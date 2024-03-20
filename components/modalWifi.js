import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList } from 'react-native';
import Form from './Todolist';
import Todolist from './Todolist';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import {useForm, Controller} from 'react-hook-form';

const ModalWifi = ({ ssids, connectToWifi }) => {
  const {control, handleSubmit, formState: {errors},} = useForm();
  const [modalVisible, setModalVisible] = useState(true);
  const [inputVisible, setInputVisible] = useState(false)
  const [selectedSSID, setSelectedSSID] = useState('');
  const [selectedAuthentication, setSelectedAuthentication] = useState('')

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSSIDPress = (ssid, authentication) => {
    setSelectedSSID(ssid);
    setSelectedAuthentication(authentication);
    setInputVisible(true);
  };

  const handleInputClose = (ssid) => {
    setInputVisible(false);
  };

  const onConnectPressed = async(data) => {
    console.log(data.password)
    console.log("SSID", selectedSSID)
    console.log("Authentication", selectedAuthentication)
    setInputVisible(false)
    const password = data.password;
    connectToWifi(selectedSSID, selectedAuthentication, password);
  }

  console.log("SSIDS:", ssids)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Flatlist of detected Wifi by RPi */}
          <Text style={styles.header}>Wifi Available</Text>
          <FlatList
            data={ssids}
            renderItem={({ item }) => (
              <CustomButton
                key={item}
                text={item.ssid}
                onPress={() => handleSSIDPress(item.ssid, item.authentication)}
                type="PRIMARY"
              />
            )}
            keyExtractor={item => item.ssid}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleCloseModal}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
      {inputVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={inputVisible}
          onRequestClose={() => setInputVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.inputModalView}>
              <Text style={styles.subheader}>Enter Password</Text>
              <CustomInput
                name="password"
                placeholder="Password"
                control={control}
                secureTextEntry
                rules={{required: "Password is required. "}}
            />
            <CustomButton
              text="Connect"
              type="TERTIARY"
              onPress={handleSubmit(onConnectPressed)}
            ></CustomButton>
              <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleInputClose}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>

            </View>
          </View>
        </Modal>
      )}
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    // Adjusting the View Outstanding Tasks
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    height: '30%',
  },
  modalView: {
    // Adjusting the Size of the Pop up
    backgroundColor: '#FAF4E6',
    borderRadius: 20,
    height: '85%',
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputModalView: {
    // Adjusting the Size of the Pop up
    backgroundColor: '#FAF4E6',
    borderRadius: 20,
    height: '30%',
    width: '75%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding:20,
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    color:"#004F18",
  },
  subheader: {
    fontSize: 22,
    fontFamily: "Poppins-Header",
    color:"#004F18",
  },
  button: {
    borderRadius: 20,
    padding: 0,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    height: '100%',
    width: '90%',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    position: 'absolute',
    top: 10,
    right: 10,
    height: 30,
    width: 50,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 10,
  },
});

export default ModalWifi;