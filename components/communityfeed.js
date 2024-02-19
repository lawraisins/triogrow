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

const CommunityFeed = ( {refreshing, onRefresh }) => {
    const [rectangleVisible, setRectangleVisible] = useState(false);
    const [isLiked, setLiked] = useState(false);


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
          const response = await fetch(`${backendURL}/posts/getPosts`,{
            headers: {
              Authorization: `${token}`, // Access the token from the headers
            }
          });
          const data = await response.json();
          console.log(data)
          if (response.ok) {
            // Update the state with the retrieved posts
            console.log(data.content)
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

        //Check completion
    const toggleHeart = (name) => {
      setTaskItems(
        taskItems.map((item) =>
          item.name === name ? { ...item, isLiked: !item.isLiked } : item
        )
      );
    };
    
      const renderItem = ({ item }) => (
        <TouchableOpacity>
        <View style={styles.postContainer}>
          <Text style={styles.text}>@{item.username}</Text>
           <Text style={styles.text}>{item.caption}</Text>
           <View style={styles.reactions}>
          <TouchableOpacity><Image source={heart} style={styles.icon}></Image></TouchableOpacity>
          <TouchableOpacity><Image source={comment} style={styles.icon}></Image></TouchableOpacity>
        </View>
        </View>

        </TouchableOpacity>
      );
    
      return (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
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
          backgroundColor: '#FAF4E6',
          borderRadius: 5,
          shadowOpacity: 1,
          shadowRadius: 0,
          shadowColor: "black",
          shadowOffset: {
              width: 4,
              height: 4,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          marginRight:10,

        },
        text:{
            fontFamily: "Poppins",
            color: "#F25987"
        },
        icon:{
          height: 20,
          width: 20,
          marginRight: 5,
          tintColor: "#F25987",

        },
        reactions:{
          margin: 5,
          flexDirection: 'row'
        }
      }
      );
    








export default CommunityFeed