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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${fillPercentage}%`, backgroundColor: fillColor }]} />
      </View>
      <Text style={styles.value}>{value}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Poppins-Header',
    color: "#4B2209",
  },
  bar: {
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: 'green', // Change color based on value
  },
  value: {
    marginTop: 5,
    fontSize: 14,
    color: "#4B2209",
  },
});

export default LinearGauge;
