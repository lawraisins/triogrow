
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import Form from './Todolist';
import Todolist from  "./Todolist";
import CustomButton from './CustomButton';

const Modalform = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Include Todolist component here */}
            <Todolist />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <CustomButton onPress={() => setModalVisible(true)} text='View Outstanding Tasks' type='PRIMARY'></CustomButton>  
    </View>
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
    backgroundColor: '#FDF76A',
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
  button: {
    borderRadius: 20,
    padding: 10,
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


export default Modalform;