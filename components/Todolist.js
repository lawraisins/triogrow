import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, Modal, Pressable } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios';
import backendURL from '../components/backendURL';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


const Form = () =>  {

  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date())
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const {control, handleSubmit, formState: {errors}, watch} = useForm();


  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };
  
  //Loads cached to-do list information whenever the page is
  useEffect(() => {
    // Fetch posts when the component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Replace 'your-backend-url' with the actual URL of your backend server
      const token = await _getToken();
      const response = await fetch(`${backendURL}/task/view`, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          console.log("Can fetch tasks")
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving tasks:", error);
        }
      } else {
        console.error('Failed to retrieve tasks:', data.error);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    }
  };



  const onAddTaskPressed = async (data) => {
    console.log(data);
    const rname = data.Name;
    const rdetails = data.Details;
    const rcompleteBy= moment(date).format('YYYY-MM-DD HH:mm:ss');
  
    try {
      // Remember to change the backend server URL accordingly!!
  
      // Data to send in the POST request
      const userData = {
        name: rname,
        details: rdetails,
        completeBy: rcompleteBy,
      };
  
      // for debugging
      console.log('Sending a POST request to save add new task...');
      console.log('Request URL: ', `${backendURL}/task/upload`);
      const token = await _getToken();
      console.log('Data to be sent: ', userData);
  
      // Make a POST request to update user profile
      const response = await axios.post(`${backendURL}/task/upload`, userData, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
  
      // Assuming the response contains a token field
      // Parse the JWT token to get user information
      // const decodedToken = jwtDecode(response.data.accessToken);
  
      // Handle the response, e.g. show a success message or navigate to a new screen
      console.log('Task Added: ', response.data);
      // Go to Landing
      Alert.alert("New task has been added!");
      setModalVisible(!modalVisible);
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error('Update error: ', error);
      if (error.response) {
        // The request was made, but the server responded with an error
        console.error('Server error: ', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server', error);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error: ', error);
      }
    }
  };

      


  const handleAddTask =  async() => {
    console.log(data)

    try {
        // Remember to change the backend server URL accordingly!!

        // Data to send in the POST request
        // const postData = {
        //     contents: postcaption,
        // };
        
        // for debugging
        console.log('Adding Task...');
        console.log('Request URL: ', `${backendURL}/task/upload`);
        // console.log('Data to be sent: ', postData);
        const token = await _getToken();
        // console.log("token: ", token)

        // Make a POST request to upload posts
        // ERROR  Registration error:  [AxiosError: Network Error]
        // probably happening on this line
        const response = await axios.post(`${backendURL}/task/upload`, 
            {
                contents: postcaption,
            }, {
            headers: {
              Authorization: `${token}`, // Access the token from the headers
            }
          });
        // Assuming the response contains a token field
        // Parse the JWT token to get user information
        // const decodedToken = jwtDecode(response.data.accessToken);

        // Handle the response, e.g. show a success message or navigate to a new screen
        console.log('Task added successfully: ', response.data);
    
    } catch (error) {
        // Handle any errors that occur during the registration process
        console.error('Upload error: ', error.response.data);
        if (error.response) {
            // The request was made, but the server responded with an error
            console.error('Server error: ', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server', error);
        } else {
            // Something happened in setting up the request
            console.error('Request setup error: ', error);
        }
    }
  }
  


  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem("storedTodo", JSON.stringify(itemsCopy)).then(() => {
      setTask(itemsCopy);
    }).catch(error => console.log(error));
    console.log(itemsCopy.length)
  }




  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}></View>
     <Text style = {styles.header}>My Tasks</Text>
     <View style = {styles.items}>
            {/* To-do List */}
            {
        taskItems.map((item, index) => {
        return <TouchableOpacity key={index} onPress={() => completeTask(index)}>

          <Task text={item}/>
         </TouchableOpacity>
        }
      
        )

      }

      </View>   
      <View style={styles.bottomView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subheader}>Task</Text>
            <CustomInput name="Name" control={control}></CustomInput>
            <Text style={styles.subheader}>Notes</Text>
            <CustomInput name="Details" control={control}></CustomInput>
            <Text style={styles.subheader}>Complete By</Text>
            <Controller control={control} name="CompleteBy" render={({ field: { onChange, value } }) => ( <DateTimePicker value={value} date={value} onDateChange={onChange} mode="date" is24Hour={true} display="default" /> )} />
              <CustomButton text="Confirm" type="TERTIARY"
        onPress={handleSubmit(onAddTaskPressed)}>
      </CustomButton>
      <CustomButton text="Cancel" type="TERTIARY"
        onPress={() => setModalVisible(!modalVisible)}>
      </CustomButton>
          </View>
        </View>
      </Modal>
     <CustomButton text="Add Task" type="PRIMARY"
        onPress={() => setModalVisible(true)}>
      </CustomButton>
    </View>

            {/* <TextInput style={styles.input} placeholder={'Write a task'} value = {task} onChangeText={text => setTask(text)}></TextInput>
            <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                    <Image source={require("../assets/images/plus.png")} style={{width: 25, height:25 }} /> */}
                {/* </View>
            </TouchableOpacity> */}
        
    </View>
  );
    }

  

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: '#BEE4FF',

  },
  tasksWrapper: {
    paddingHorizontal: 20
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    top: 55,
  },
  items: {
    top: 55,
  },  
  writeTaskWrapper: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "#FDF76A",
    borderWidth: 2,
    width: 280,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FDF76A",
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,



  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding:10,
    // alignItems: 'center',

  },
  bottomView: {
    flex: 1,
    justifyContent: 'center',
    justifyContent: 'flex-end',
    marginBottom: 10,

  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
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
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    fontFamily: "Poppins",
  },
});
export default Form;
