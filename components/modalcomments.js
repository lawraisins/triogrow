import React, { useState, useEffect } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Form from './Todolist';
import Todolist from './Todolist';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import {useForm, Controller} from 'react-hook-form';
import send from "../assets/images/send.png"
import backendURL from './backendURL';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalComments = ({ postId, showCommentModal, onClose }) => {
  const {control, handleSubmit, formState: {errors},} = useForm();
  const [modalVisible, setModalVisible] = useState(true);
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);



  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };


  const handleCloseModal = () => {
    setModalVisible(false);
    onClose();
  };

  const uploadPostId = postId


  const onPostCommentPressed = async (data) => {
    console.log(data);
    const contents = data.Comment;
  
    try {
      // Remember to change the backend server URL accordingly!!
  
      // Data to send in the POST request
      const userData = {
        postId: uploadPostId,
        contents: contents,
      };
  
      // for debugging
      console.log('Sending a POST request to save add new task...');
      console.log('Request URL: ', `${backendURL}/posts/commentPost`);
      const token = await _getToken();
      console.log('Data to be sent: ', userData);
  
      // Make a POST request to update user profile
      const response = await axios.post(`${backendURL}/posts/commentPost`, userData, {
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        },
      });
  
      // Assuming the response contains a token field
      // Parse the JWT token to get user information
      // const decodedToken = jwtDecode(response.data.accessToken);
  
      // Handle the response, e.g. show a success message or navigate to a new screen
      console.log('Comment Posted: ', response.data);
      // Go to Landing
      fetchComments();
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


    //Loads cached to-do list information whenever the page is
  // Fetch posts when the component mounts
  const fetchComments = async () => {
    try {
      // Replace 'your-backend-url' with the actual URL of your backend server
      const token = await _getToken();
      const response = await fetch(`${backendURL}/posts/viewComments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ uploadPostId }),
      });
      const data = await response.json();
      console.log(data.comments)
      const updatedComments = data.comments.map(item => ({ ...item}));
      setComments(updatedComments || []);

      if (response.ok) {
        // Update the state with the retrieved profile data
        try {
          console.log("Can fetch comments")
          // You can use the username and bio values here as needed
        } catch (error) {
          console.error("Error retrieving comments", error);
        }
      } else {
        console.error('Failed to retrieve comments:', data.error);
      }
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  //Fetch Tasks when component is mounted
  useEffect(() => {
    fetchComments();
  }, []);

  const refreshComments = async () => {
    setRefreshing(true);
    await fetchComments();
    setRefreshing(false);
  };


  const renderItem = ({ item }) => {
    const timeDifference = moment().diff(moment(item.commentDateTime), 'seconds');
    const timeAgo =
    timeDifference <= 1
      ? 'just now'
      : moment(item.commentDateTime).fromNow();
    return (
      <View style={styles.commentContainer}>
      <View style={styles.timeAgoUsernameContainer}>
      <Text style={styles.username}>@{item.username}</Text>
        <Text style={styles.timeAgo}>{timeAgo}</Text>
      </View>
        <Text style={styles.comment}>{item.contents}</Text>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showCommentModal}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.heading}>
          <Text style={styles.header}>Comments</Text>
          </View>
          <FlatList 
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item) => item.contents.toString()}
        style={{ height: '50%', width: '100%' }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshComments}
          />
        }>
        </FlatList>
          <View style={styles.input}>
            <CustomInput name="Comment" control={control}></CustomInput>
            <TouchableOpacity onPress={handleSubmit(onPostCommentPressed)}>
              <Image source={send} style={styles.icon}></Image>
            </TouchableOpacity>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleCloseModal}
          >
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
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
    height: '95%',
    width: '95%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
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
  input: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon:{
    height: 30,
    width: 30,
    marginLeft: 15,
    tintColor: "#F25987",

  },
  comment:{
    justifyContent:'flex-start',
    fontFamily: "Poppins",
    fontSize: 15,
  },
  heading:{
    alignItems:'center',
  },
  timeAgoUsernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeAgo: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
    fontFamily: 'Poppins',
  },
  username: {
    fontSize: 14,
    fontFamily: 'Poppins-Header',
  },
  commentContainer:{
    marginVertical: 5,
  }
});

export default ModalComments;