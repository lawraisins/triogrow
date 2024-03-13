import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image,  FlatList, Pressable, Alert, ScrollView} from 'react-native';
import CustomButton from './CustomButton';
import CustomInput from "./CustomInput"
import {useForm, Controller} from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import heart from '../assets/images/heart.png'
import like from '../assets/images/like.png'
import comment from '../assets/images/bubble-chat.png'
import backendURL from './backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateLikedPostsStorage } from './likePost';
import ModalComments from './modalcomments';

const CommunityFeed = ( {refreshing, onRefresh }) => {
    const [rectangleVisible, setRectangleVisible] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const [likedPosts, setLikedPosts] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [likedPostsStorage, setLikedPostsStorage] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    


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
          const response = await fetch(`${backendURL}/posts/getOwnPosts`,{
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

      useEffect(() => {
        const fetchLikedPosts = async () => {
          try {
            const storedLikedPosts = await AsyncStorage.getItem('likedPosts');
            if (storedLikedPosts) {
              setLikedPostsStorage(JSON.parse(storedLikedPosts));
            }
          } catch (error) {
            console.error('Error fetching liked posts from AsyncStorage:', error);
          }
        };
        fetchLikedPosts();
      }, []);

      const likePost = async (postId) => {
        try {
          console.log("PostId", postId);
          const likeData = {
            postId: postId,
          };
          const token = await _getToken();
          const response = await axios.post(`${backendURL}/posts/likePost`, likeData, {
            headers: {
              Authorization: `${token}`,
            },
          });
          if (response.data.message === "Successfully liked post") {
            console.log("Post liked successfully:", response.data);
            setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.some((lp) => lp.postId === postId)
              ? prevLikedPosts
              : [...prevLikedPosts, { postId: postId }]
          );
          setLikedPostsStorage((prevLikedPostsStorage) =>
            prevLikedPostsStorage.some((lp) => lp.postId === postId)
              ? prevLikedPostsStorage
              : [...prevLikedPostsStorage, { postId: postId }]
          );
            setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount - 1 : prevLikeCount + 1));
            setLiked((prevLiked) => !prevLiked);
          } else if (response.data.message === "Successfully unliked post") {
            console.log("Post unliked successfully:", response.data);
            setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((lp) => lp.postId !== postId)
          );
          setLikedPostsStorage((prevLikedPostsStorage) =>
            prevLikedPostsStorage.filter((lp) => lp.postId !== postId)
          );
            setLikeCount((prevLikeCount) => (isLiked ? prevLikeCount + 1 : prevLikeCount - 1));
            setLiked(false);
            await AsyncStorage.setItem('likedPosts', JSON.stringify([...likedPostsStorage, { postId: postId }]));
          } else {
            console.error("Failed to like post:", response.data);
          }
          fetchPosts();

        } catch (error) {
          console.error("Error liking post:", error);
        }
      };

  const showcomments = (post) => {
    console.log("Opening comments for post", post.postId)
    setSelectedPost(post);
    setShowCommentModal(true)
  }
  
    
  const renderItem = ({ item }) => {
    const isLiked = likedPostsStorage.some((likedPost) => likedPost.postId === item.postId);
    const imagesource = isLiked ? like : heart;
    // console.log("http://124.155.214.143:3000"+item.imagePath)
  
    return (
      <TouchableOpacity>
        <View style={styles.postContainer}>
          <Text style={styles.text}>@{item.username}</Text>
          {/* <Image source={{uri: `http://124.155.214.143/${item.imagePath}`}} style={{ width: 200, height: 200 }}></Image> */}
          <Image source={{ uri: `data:image/jpeg;base64,${item.imageStream}` }} style={{ width: 100, height: 100 }} />
          {/* {item.imagePath && (
            <Image source={item.imagePath} style={{ width: 100, height: 100 }} />
          )
          } */}
          <Text style={styles.text}>{item.caption}</Text>
          <View style={styles.reactions}>
            <TouchableOpacity onPress={async () => likePost(item.postId)}>
              <Image source={imagesource} style={styles.icon}></Image>
              <Text>{item.likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showcomments(item)}><Image source={comment} style={styles.icon}></Image></TouchableOpacity>
            {selectedPost && selectedPost.postId === item.postId && (
              <ModalComments
                postId={item.postId}
                showCommentModal={showCommentModal}
                onClose={() => {
                  setSelectedPost(null);
                  setShowCommentModal(false);
                }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
    
  return (
    <ScrollView>
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
      {selectedPost && (
        <ModalComments
          postId={selectedPost.postId}
          onClose={() => {setSelectedPost(null);
            setShowCommentModal(false);}}
          
        />
      )}
    </ScrollView>
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