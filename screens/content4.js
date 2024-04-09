import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import Triogro from '../assets/images/Triogro.jpg';
import manual1 from '../assets/images/manual/manual1.png';
import manual2 from '../assets/images/manual/manual2.png';
import manual3 from '../assets/images/manual/manual3.png';
import manual4 from '../assets/images/manual/manual4.png';
import manual5 from '../assets/images/manual/manual5.png';
import manual6 from '../assets/images/manual/manual6.png';
import manual7 from '../assets/images/manual/manual7.png';
import manual8 from '../assets/images/manual/manual8.png';

export default function Content4() {
  const images = [manual1, manual2, manual3, manual4, manual5, manual6, manual7, manual8];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
    >
      {images.map((image, index) => (
        <Image key={index} source={image} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 600,
    marginHorizontal: 10,
  },
});
