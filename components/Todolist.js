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
      console.log(taskItems.length)
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
    const newTaskItems = [...taskItems, task]
    setTaskItems(newTaskItems)
    AsyncStorage.setItem("storedTodo", JSON.stringify(newTaskItems)).then(() => {
      setTask(taskItems);
    }).catch(error => console.log(error));
    console.log(taskItems.length + 1)
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
  addText: {},
});
export default Form;
