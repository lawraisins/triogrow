import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading"


const Form = () =>  {

  
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [ready, setReady] = useState(false);
  const displayData = async () => {
      AsyncStorage.getItem("storedTodo").then(data => {
        if (data !== null) {
          setTaskItems(JSON.parse(data))
        }
      }).catch((error) => console.log(error))
      }
  
      if (!ready) {
        return (
          <AppLoading
            startAsync={displayData}
            onFinish={() => setReady(true)}
            onError={console.warn} />
        )
      }
  const handleAddTask =  () => {
    const newtaskItems = setTaskItems([...taskItems, task])
    setTask(newtaskItems);
    AsyncStorage.setItem("storedTodo", JSON.stringify(newtaskItems)).then(() => {
      setTask(newtaskItems);
    }).catch(error => console.log(error));
  }

  const completeTask = async (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem("storedTodo", JSON.stringify(itemsCopy)).then(() => {
      setTask(itemsCopy);
      setModalVisible(false);
    }).catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}></View>
     <Text style = {styles.sectionHeader}>Tasks</Text>
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
                    <Text style={styles.addText}>
                        +
                    </Text>
                </View>
            </TouchableOpacity>
        
        </KeyboardAvoidingView> 
    </View>
  );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    backgroundColor: 'white',



  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 15,
  },
  items: {},  
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
    left: 10,
    backgroundColor: "white",
    borderRadius: 60,
    borderColor: "green",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    right: 10,
    backgroundColor: "white",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 1,



  },
  addText: {},
});
export default Form;
