import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Asset } from 'expo-asset';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const images = [
  Asset.fromModule(require('../assets/images/carousel1.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel2.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel3.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel4.jpeg')).uri,
];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const carouselItems = [
  {
    title: "",
    text: "",
    image: { uri: images[0] },
  },
  {
    title: "Explore Our Campus",
    text: "Modern facilities and beautiful campus.",
    image: { uri: images[1] },
  },
  {
    title: "Join Us Today",
    text: "Apply for admission now and start your journey.",
    image: { uri: images[2] },
  },
  {
    title: "Join Us Today",
    text: "Apply for admission now and start your journey.",
    image: { uri: images[3] },
  },
];
const MyCarousel = () => {
  
  return (
    <View style={styles.container}>
     <Carousel
        loop
        width={viewportWidth}
        height={250}
        autoPlay={true}
        data={carouselItems}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
            <View style={styles.carouselTextContainer}>
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
  
    borderRadius: 8,
    height: hp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding:10,
    
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  carouselTextContainer: {
    position: 'absolute',
    padding: 20,
    
  },
  carouselTitle: {
    fontSize: 16,
   
    color: 'green',
    fontFamily:'Nunito-ExtraBold'
  },
  carouselText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
  },
  mapContainer: {
    padding:20,
    alignItems: 'center',
   
    backgroundColor:'#FFFFFF',

  },
  
});

export default MyCarousel;
