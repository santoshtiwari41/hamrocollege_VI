import { Asset } from 'expo-asset';

const images = [
  Asset.fromModule(require('../assets/images/carousel1.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel2.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel3.jpeg')).uri,
  Asset.fromModule(require('../assets/images/carousel4.jpeg')).uri,
];

export const Slides = [
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
