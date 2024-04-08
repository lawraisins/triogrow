import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LinearGauge = ({ label, value, maxValue }) => {
  const fillPercentage = (value / maxValue) * 100;
  let fillColor;

  if (fillPercentage >= 70) {
    fillColor = 'green';
  } else if (fillPercentage >= 40) {
    fillColor = 'yellow';
  } else {
    fillColor = 'red';
  }

  return (
    <View style={styles.labelContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${fillPercentage}%`, backgroundColor: fillColor }]} />
      </View>
      <Text style={styles.value}>{value}%</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: 'row', // Add this line
    alignItems: 'center', // Add this line
  },
  labelContainer: {
    marginRight: 10, // Add some margin between the label and the gauge
  },
  label: {
    fontSize: 16,
    fontFamily: 'Arial-Rounded',
    color: "#4B2209",
  },
  bar: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    width: 100,
    flex: 1, // Add this line
  },
  fill: {
    height: '100%',
    backgroundColor: 'green', // Change color based on value
  },
  value: {
    marginLeft: 10, // Add some margin between the gauge and the value
    fontSize: 14,
    color: "#4B2209",
  },
});

export default LinearGauge;