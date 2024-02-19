import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image,  FlatList, Pressable} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from "./CustomInput"
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import heart from '../assets/images/heart.png'
import comment from '../assets/images/bubble-chat.png'
import backendURL from './backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtherFeed = ( {userId, refreshing, onRefresh }) => {
  const id = userId;
  console.log(userId);
    const [rectangleVisible, setRectangleVisible] = useState(false);


    const _getToken = async () => {
        try {
          const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
          return storedToken;
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
      };

    const [posts, setPosts] = useState([]);

      useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts();
      }, []);
    
      const fetchPosts = async () => {
        try {
          // Replace 'your-backend-url' with the actual URL of your backend server
          const token = await _getToken();
          const response = await fetch(`${backendURL}/posts/getOtherPosts`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`,
            },
            body: JSON.stringify({ id }),
          });
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            // Update the state with the retrieved posts
            console.log(data)
            setPosts(data.content)
          } else {
            console.error('Failed to retrieve posts:', data.error);
          }
        } catch (error) {
          console.error('Error fetching posts:', error.message);
        }
      };

      useEffect(() => {
        if (refreshing) {
          fetchPosts();
        }
      }, [refreshing]);
    
      const renderItem = ({ item }) => (
        <View style={styles.postContainer}>
          <Text style={styles.text}>@{item.username}</Text>
           <Text style={styles.text}>{item.caption}</Text>
           <View style={styles.reactions}>
          <TouchableOpacity><Image source={heart} style={styles.icon}></Image></TouchableOpacity>
          <TouchableOpacity><Image source={comment} style={styles.icon}></Image></TouchableOpacity>
        </View>
        </View>
      );
    
      return (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={refreshing}
          onRefresh={async () => {
            // Fetch posts again when refreshing
            await fetchPosts();
            onRefresh();
          }}
        />
      );
    };
    const styles = StyleSheet.create({
        postContainer: {
          padding: 30,
          backgroundColor: 'white',
          // borderRadius: 5,
          // borderWidth: 2,
          // borderColor: 'black',
          borderStyle: "solid",
          shadowOpacity: 1,
          elevation: 0,
          shadowRadius: 0,
          shadowColor: "black",
          shadowOffset: {
              width: 4,
              height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          margin:10,

        },
        text:{
            fontFamily: "Poppins",
        },
        icon:{
          height: 20,
          width: 20,
          marginRight: 5,

        },
        reactions:{
          margin: 5,
          flexDirection: 'row'
        }
      
      }
      );
    








export default OtherFeed