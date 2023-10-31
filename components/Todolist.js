import React,{useState} from 'react';
import {KeyboardAvoidingView, TextInput } from 'react-native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Task from './Task';

const Form = () =>  {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const handleAddTask = () => {
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}></View>
     <Text style = {styles.sectionHeader}>To-do List</Text>
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
