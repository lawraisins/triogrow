import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import backendURL from '../components/backendURL';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

export default function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null)
  const navigation = useNavigation();

  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };
  const _getUserId = async () => {
    try {
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      console.log(userId)
      setId(userId)
      console.log("User ID",id)
    } catch (error) {
      console.error('Error fetching token from AsyncStorage:', error);
    }
  };

  const fetchUsers = async (searchTerm) => {
    const token = await _getToken();
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/users/search?q=${searchTerm}`,{
        headers: {
          Authorization: `${token}`, // Access the token from the headers
        }
      });
      const data = await response.json();
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      fetchUsers(searchTerm);
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    _getUserId();
  }, []);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const renderUser = ({ item }) => {
    const navigateToProfile = () => {
      if (item.userId === id) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('OtherProfile', { userId: item.userId });
      }
    };

    return (
      <TouchableOpacity style={styles.userContainer} onPress={navigateToProfile}>
        <View>
          <Text style={styles.username}>{JSON.stringify(item.Username).replace(/['"]+/g, '')}</Text>
          <Text style={styles.name}>{JSON.stringify(item.Name).replace(/['"]+/g, '')}</Text>
        </View>
      </TouchableOpacity>
    );
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for users..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        data={users}
        renderItem={renderUser}
        // keyExtractor={(item) => item.userId.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found.</Text>
          </View>
        }
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF4E6',
    padding: 20,
  },
  header: {
    fontSize: 42,
    fontFamily: "Arial-Rounded",
    color: "#004F18",
    top: 15,
  },
  searchInput: {
    height: 40,
    // borderColor: 'black',
    // borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Arial-Rounded',
    color:"#4B2209",
    backgroundColor: 'white',
    
  },
  userContainer: {
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
  },
  name: {
    fontSize: 16,
    fontFamily: 'Arial-Rounded',
    color:"#4B2209",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
  },
  searchBar: {
    top: 35,
    

  }
});