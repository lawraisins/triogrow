import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


export default function FAQ() {
  navigation = useNavigation();


  const FAQ = [
    {
      id: 1,
      title: '01 | What is TrioGrow ?',
      onPress: () => {
        navigation.navigate('content1');
      },
    },
    {
      id: 2,
      title: '02 | How does TrioGrow work ?',
      onPress: () => {
        navigation.navigate('content2');
      },
    },
    {
      id: 3,
      title: '03 | Recommended plants for TrioGrow ?',
      onPress: () => {
        navigation.navigate('content3'); // Assuming content3 exists
      },
    },
  ];

  const tutorials = [
    {
      id: 4,
      title: '01 | 5 Easy to Grow Low Maintenance Perennials ?',
      onPress: () => {
        navigation.navigate('content4');
      },
    },
    {
      id: 5,
      title: '02 | How to build your own soil ?',
      onPress: () => {
        navigation.navigate('content5');
      },
    },
    // ... other tutorial items
  ];

  const video = [
    {
      id: 7,
      title: '01 | Video 1',
    },
    {
      id: 8,
      title: '02 | Video 2',
    },
    {
      id: 9,
      title: '03 | Video 3',
    },
    // ... other video items
  ];

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.headingBox}>
        <Text style={styles.heading}>Video Tutorials</Text>
      </View>

      <View style={styles.greenBox}>
        {video.map((videoItem) => (
          <TouchableOpacity key={videoItem.id} onPress={() => {/* Navigation for video */}}>
            <View style={styles.tutorialBox}>
              <Text style={styles.tutorialTitle}>{videoItem.title}</Text>
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
  },
  headingBox: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    top: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'Poppins-Header',
  },
  tutorialBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  tutorialTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 0,
  },
  greenBox: {
    backgroundColor: '#A0D29F',
    padding: 20,
    borderRadius: 10,
    marginBottom: -20,
  },
  tutorialContentBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
});
