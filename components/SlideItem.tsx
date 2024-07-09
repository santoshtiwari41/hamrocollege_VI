import React, { useRef, useState } from 'react';
import { View, FlatList, Animated, StyleSheet, Text, Image, Dimensions, Easing } from 'react-native';
import { Asset } from 'expo-asset';

const { width, height } = Dimensions.get('screen');

const images = [
  Asset.fromModule(require('../assets/images/carousel1.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel2.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel3.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel4.jpeg')).uri,
];

const Slides = [
  {
    id: 1,
    img: images[0],
    title: 'Apple Watch Series 7',
    description: 'The future of health is on your wrist',
    price: '$399',
  },
  {
    id: 2,
    img: images[1],
    title: 'AirPods Pro',
    description: 'Active noise cancellation for immersive sound',
    price: '$249',
  },
  {
    id: 3,
    img: images[2],
    title: 'AirPods Max',
    description: 'Effortless AirPods experience',
    price: '$549',
  },
  {
    id: 4,
    img: images[3],
    title: 'Charger',
    description: "It's not magic, it's just science",
    price: '$49',
  },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      setIndex(viewableItems[0]?.index || 0);
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const translateYImage = useRef(new Animated.Value(40)).current;

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <FlatList
        data={Slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Animated.Image
              source={item.img}
              resizeMode="contain"
              style={[
                styles.image,
                {
                  transform: [
                    {
                      translateY: translateYImage,
                    },
                  ],
                },
              ]}
            />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default Slider;
