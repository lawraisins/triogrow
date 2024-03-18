import React,{useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, Image,  FlatList, Pressable, Alert} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import heart from '../assets/images/heart.png'
import like from '../assets/images/like.png'
import comment from '../assets/images/bubble-chat.png'
import backendURL from './backendURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalComments from './modalcomments';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const CommunityFeed = ( {refreshing, onRefresh }) => {
    const [rectangleVisible, setRectangleVisible] = useState(false);
    const [isLiked, setLiked] = useState(false);
    const { control, handleSubmit, formState: { errors }, watch } = useForm();
    const [likedPosts, setLikedPosts] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [likedPostsStorage, setLikedPostsStorage] = useState([]);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [following, setFollowing] = useState(null);
    const navigation = useNavigation();
    


    const _getToken = async () => {
        try {
          const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
          return storedToken;
        } catch (error) {
          console.error('Error fetching token from AsyncStorage:', error);
        }
      };

    const [posts, setPosts] = useState([]);

    const communities = [
      "North",
      "South",
      "East",
      "West",
      "Central"
    ];
    

      useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts();
      }, []);

      useEffect(() => {
        // Fetch posts when the component mounts
        fetchFollowing();
      }, []);

      const fetchFollowing = async () => {
        try {
          // Replace 'your-backend-url' with the actual URL of your backend server
          const token = await _getToken();
          const response = await fetch(`${backendURL}/users/following`, {
            headers: {
              Authorization: `${token}`, // Access the token from the headers
            }
          });
          const data = await response.json();
          if (response.ok) {
            // Update the state with the retrieved posts         
            const followingIds = data.results.map(result => result.followingId);
            setFollowing(followingIds);
            console.log("Following:", following);
          } else {
            console.error('Failed to retrieve following list:', data.error);
          }
        } catch (error) {
          console.error('Error fetching following list:', error.message);
        }
      };
      

    
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
          if (response.ok) {
            // Update the state with the retrieved posts
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
    setSelectedPost(post);
    setShowCommentModal(true)
  }

  const navigateToViewCommunityPost = (community) => {
    navigation.navigate('ViewPosts', { community: community });
  };

  const anyPostFromFollowing = posts.some(post => following.includes(post.userId));



  
    
  const renderItem = ({ item }) => {
    const isLiked = likedPostsStorage.some((likedPost) => likedPost.postId === item.postId);
    const imagesource = isLiked ? like : heart;
    const timeDifference = moment().diff(moment(item.uploadDateTime), 'seconds');
    const timeAgo =
    timeDifference <= 1
      ? 'just now'
      : moment(item.uploadDateTime).fromNow();
    
    // Check if the user is following the author of the post
    const isFollowingAuthor = following && following.includes(item.userId);

    // Render the post only if the user is following the author
    if (!isFollowingAuthor) {
      return null;
    }
  
    return (
      <TouchableOpacity>
        <View style={styles.postContainer}>
          <Text style={styles.text}>@{item.username}</Text>
          <Text style={styles.text}>{timeAgo}</Text>
          {/* <Image source={{uri: `http://124.155.214.143/${item.imagePath}`}} style={{ width: 200, height: 200 }}></Image> */}
          <Image source={{ uri: `data:image/jpeg;base64,${item.imageStream}` }} style={{ width: 200, height: 200 }} />
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

  const renderCommunity = ({ item }) => {
    // Filter posts based on the current community
    const postsInCommunity = posts.filter(post => post.location === item);
  
    // Find the most recent post in the community
    const mostRecentPost = postsInCommunity.reduce((prev, current) =>
    !prev || moment(prev.uploadDateTime).isBefore(moment(current.uploadDateTime)) ? current : prev
  , null);
  
    // Render the most recent post in the community
    return (
      <TouchableOpacity onPress={()=> navigateToViewCommunityPost(item)}>
        <View style={styles.postContainer}>
          {mostRecentPost && (
            <>
              <Image source={{ uri: `data:image/jpeg;base64,${mostRecentPost.imageStream}` }} style={{ width: 200, height: 200 }} />
              <Text style={styles.communitytext}>{item}</Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  
    
    
  return (
    <>
      {(posts.length === 0 || !anyPostFromFollowing) && (
        <Text style={styles.emptyFeedText}>No updates from those you follow</Text>
      )}
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
      {selectedPost && (
        <ModalComments
          postId={selectedPost.postId}
          onClose={() => {setSelectedPost(null);
            setShowCommentModal(false);}}
          
        />
      )}
      <FlatList
        data={communities}
        renderItem={renderCommunity}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        refreshing={refreshing}
        onRefresh={async () => {
          // Fetch posts again when refreshing
          await fetchPosts();
          onRefresh();
        }}
      />
    </>
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
        emptyFeedText:{
          fontFamily: "Poppins",
          color: "#4B2209",
          alignSelf:"center",
          fontSize: 18,
          marginTop: 10,
      },
        communitytext:{
          fontFamily: "Poppins-Header",
          color: "#F25987",
          alignSelf:"center",
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