import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import backendURL from '../components/backendURL';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

export default function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchUsers = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await fetch(`${backendURL}/users/search?q=${searchTerm}`);
      const data = await response.json();
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
    <TouchableOpacity style={styles.userContainer} onPress={() => navigation.navigate('Profile', { userId: item.userId })}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const [fontsLoaded] = useFonts({
    'Poppins-Header': require('../assets/fonts/Poppins-Header.ttf'),
    'Poppins': require('../assets/fonts/Poppins.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search users..."
        onChangeText={handleSearch}
        value={searchTerm}
      />
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.userId.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEE4FF',
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'Poppins',
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
});