import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, Modal, Pressable, FlatList} from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form'
import axios from 'axios';
import backendURL from '../components/backendURL';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Collapsible from 'react-native-collapsible';
import Checkbox from 'expo-checkbox';


const Form = () =>  {

  const [task, setTask] = useState();
  const [date, setDate] = useState(new Date());
  const [taskItems, setTaskItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isChecked, setChecked] = useState(false);

  //Get security token
  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };

  //Toggle expansion of individual items
  const toggleExpand = (name) => {
    setTaskItems(
      taskItems.map((item) =>
        item.name === name ? { ...item, collapsed: !item.collapsed } : item
      )
    );
  };
  
  const {control, handleSubmit, formState: {errors}, watch} = useForm();

  //Check completion
  const toggleCheckBox = (name) => {
    setTaskItems(
      taskItems.map((item) =>
        item.name === name ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };



  
  //Loads cached to-do list information whenever the page is
  // Fetch posts when the component mounts
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
      console.log(data.tasks)

      // Add collapsed property to each item
      const updatedTasks = data.tasks.map(item => ({ ...item, collapsed: true }));
      setTaskItems(updatedTasks || []);

      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          console.log("Can fetch tasks")
          console.log("taskItems", taskItems)
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

  //Fetch Tasks when component is mounted
  useEffect(() => {
    fetchTasks();
  }, []);

const onChange = (e, selectedDate) => {
  console.log(selectedDate)
  setDate(selectedDate)


}



const renderItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => toggleExpand(item.name)}>
      <View style={styles.itemWrapper}>
      <Checkbox style={styles.checkbox} value={item.isChecked} onValueChange={() => toggleCheckBox(item.name)} color='black' ></Checkbox>
      <View style={styles.item}>
        <Text style={styles.taskheader}>{item.name}</Text>
        <Text>Complete By: {new Date(item.completeBy).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        <Collapsible collapsed={item.collapsed}>
          <View style={styles.details}>
            <Text style={styles.subheader}>Details:</Text>
            <Text>{item.details}</Text>
          </View>
        </Collapsible>
        {!item.collapsed && <CustomButton text="Delete" onPress={() => onDeleteTaskPressed(item.taskId)}></CustomButton>}
      </View>
      </View>
    </TouchableOpacity>
  );
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
      fetchTasks();
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



  const onDeleteTaskPressed = async (data) => {
    console.log(data);
    const rid = data;

  
    try {
      // Remember to change the backend server URL accordingly!!
  
      // Data to send in the POST request
      const userData = {
        taskId: rid,
      };
  
      // for debugging
      console.log('Sending a POST request to delete task...');
      console.log('Request URL: ', `${backendURL}/task/delete`);
      const token = await _getToken();
      console.log('Data to be sent: ', userData);
  
      // Make a POST request to update user profile
      const response = await axios.post(`${backendURL}/task/delete`, userData, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
  
      // Assuming the response contains a token field
      // Parse the JWT token to get user information
      // const decodedToken = jwtDecode(response.data.accessToken);
  
      // Handle the response, e.g. show a success message or navigate to a new screen
      console.log('Task Deleted: ', response.data);
      Alert.alert("Task deleted !");
      fetchTasks();
    } catch (error) {
      // Handle any errors that occur during the registration process
      console.error('Delete error: ', error);
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


  return (

    <View style={styles.container}>
      <View style={styles.tasksWrapper}></View>
     <Text style = {styles.header}>My Tasks</Text>
     <View style = {styles.items}>
      <FlatList 
        data={taskItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.name.toString()}
        style={{ paddingBottom: 20, height: '80%' }}>
        </FlatList>

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
            <DateTimePicker display="calendar" value={date} is24Hour={true} onChange={onChange} />
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
  taskheader: {
    fontSize: 22,
    fontFamily: "Poppins-Header",
  },
  subheader: {
    fontSize: 18,
    fontFamily: "Poppins",
  },
  item: {
    backgroundColor: "#FDF76A",
    padding: 15,
    borderRadius: 10,
    borderColor:"black",
    borderWidth: 2,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
    shadowColor: "black",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flex: 1,
    
},
text: {
    fontFamily: "Poppins"
},
itemWrapper: {
  flexDirection:'row',
  alignItems:'center',
  alignSelf:'center',
},
details: {
  backgroundColor:'white',
  alignItems:'center',
  justifyContent:'space-between',
  padding: 5,
  flex: 1,
},
checkbox: {
  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  margin: 8,
}
});
export default Form;
