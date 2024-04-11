import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';


export default function FAQ() {
  navigation = useNavigation();

  const FAQ = [
    {
      id: 1,
      title: '01 | What is Triogro ?',
      onPress: () => {
        navigation.navigate('content1');
      },
    },
    {
      id: 2,
      title: '02 | How does Triogro work ?',
      onPress: () => {
        navigation.navigate('content2');
      },
    },
    {
      id: 3,
      title: '03 | Recommended plants for Triogro ?',
      onPress: () => {
        navigation.navigate('content3'); // Assuming content3 exists
      },
    },
  ];

  const tutorials = [
    {
      id: 4,
      title: '01 | Triogro Assembly Guide',
      onPress: () => {
        navigation.navigate('content4');
      },
    },
    {
      id: 5,
      title: '02 | Video 1: Composting for Beginners: The Compost Tube',
      onPress: () => {
        navigation.navigate('Tutorial');
      },
    },
    {
      id: 6,
      title: '03 | Video 2: Triogrow App Soil Building Test Video',
      onPress: () => {
        navigation.navigate('Tutorial2');
      },
    },
    
    // ... other tutorial items
  ];

  // const video = [
  //   {
  //     id: 5,
  //     title: '01 | Video 1',
  //     onPress: () => {
  //       navigation.navigate('Tutorial');
  //     },
  //   },
  //   {
  //     id: 6,
  //     title: '02 | Video 2',
  //     onPress: () => {
  //       navigation.navigate('Tutorial');
  //     },
  //   },
  //   {
  //     id: 7,
  //     title: '03 | Video 3',
  //     onPress: () => {
  //       navigation.navigate('Tutorial');
  //     },
  //   },
  //   // ... other video items
  // ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Learn</Text>
      <View style={styles.headingBox}>
        <Text style={styles.heading}>Frequently Asked Questions</Text>
      </View>
      <View style={styles.greenBox}>
        {FAQ.map((faqItem) => (
          <TouchableOpacity key={faqItem.id} onPress={faqItem.onPress}>
            <View style={styles.tutorialBox}>
              <Text style={styles.tutorialTitle}>{faqItem.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.headingBox}>
        <Text style={styles.heading}>Tutorials</Text>
      </View>

      <View style={styles.greenBox}>
        {tutorials.map((tutorialItem) => (
          <TouchableOpacity key={tutorialItem.id} onPress={tutorialItem.onPress}>
            <View style={styles.tutorialBox}>
              <Text style={styles.tutorialTitle}>{tutorialItem.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF4E6",
    padding: 20,
    // justifyContent: "center"
  },
  headingBox: {
    // paddingVertical: 10,
    borderRadius: 10,
    // marginBottom: 10,

  },
  heading: {
    fontSize: 20,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
  },
  tutorialBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    marginBottom: 16,
  },
  tutorialTitle: {
    fontSize: 14,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
    marginBottom: 0,
  },
  greenBox: {
    backgroundColor: '#A0D29F',
    padding: 20,
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  tutorialContentBox: {
    // marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  header: {
    fontSize: 35,
    fontFamily: "Arial-Rounded",
    color:"#004F18",

  },
});
