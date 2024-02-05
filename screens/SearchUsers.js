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
  const navigation = useNavigation();

  const _getToken = async () => {
    try {
      const storedToken = JSON.parse(await AsyncStorage.getItem('token'));
      return storedToken;
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
    if (searchTerm.length > 2) {
      fetchUsers(searchTerm);
    } else {
      setUsers([]);
    }
  }, [searchTerm]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('OtherProfile', { userId: item.userId })}>
      <View>
      <Text style={styles.username}>{JSON.stringify(item.Username).replace(/['"]+/g, '')}</Text>
      <Text style={styles.name}>{JSON.stringify(item.Name).replace(/['"]+/g, '')}</Text>
      {/* <Text style={styles.name}>{item.userProfile[0].name}</Text> */}
      </View>
    </TouchableOpacity>
  );



  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  header: {
    fontSize: 42,
    fontFamily: "Poppins-Header",
    top: 55,
  },
  searchInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Poppins',
    backgroundColor: 'white',
    
  },
  userContainer: {
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Poppins-Header',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  searchBar: {
    top: 83,
    

  }
});