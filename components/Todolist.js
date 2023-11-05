import React,{useState, useEffect} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"
import { useFonts } from 'expo-font';


const Form = () =>  {

  
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [ready, setReady] = useState(false);

  
  //Loads cached to-do list information whenever the page is
  
  const displayData = async () => {
      await AsyncStorage.getItem("storedTodo").then(data => {
        if (data !== null) {
          setTaskItems(JSON.parse(data))
        }
      }).catch((error) => console.log(error))
      }
  // Loads to-do list while screen loads
      if (!ready) {
        return (
          <AppLoading
            startAsync={displayData}
            onFinish={() => setReady(true)}
            onError={console.warn} />
        )
      }
  const handleAddTask =  () => {
    setTaskItems([...taskItems, task])
    setTask()
    AsyncStorage.setItem("storedTodo", JSON.stringify(taskItems)).then(() => {
      setTask(taskItems);
    }).catch(error => console.log(error));
  }
  

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem("storedTodo", JSON.stringify(itemsCopy)).then(() => {
      setTask(itemsCopy);
    }).catch(error => console.log(error));
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
      <KeyboardAvoidingView
            style={styles.writeTaskWrapper}>
            <TextInput style={styles.input} placeholder={'Write a task'} value = {task} onChangeText={text => setTask(text)}></TextInput>
            <TouchableOpacity onPress={() => handleAddTask()}>
                <View style={styles.addWrapper}>
                    <Image source={require("../assets/images/plus.png")} style={{width: 25, height:25 }} />
                </View>
            </TouchableOpacity>
        
        </KeyboardAvoidingView> 
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
    borderWidth: 1,
    width: 280,
  },
  addWrapper: {
    width: 60,
    height: 60,
    left:10,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#FDF76A",
    borderWidth: 1,



  },
  addText: {},
});
export default Form;
