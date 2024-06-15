import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image,ActivityIndicator } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { Asset } from 'expo-asset';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/api';
import { setUserId, setBatchId, setDepartmentId, setProfile } from '@/redux/profileSlice';

import { getUserId } from '@/services/asyncStorage';
import { useDispatch } from 'react-redux';
const { width: viewportWidth } = Dimensions.get('window');

const images = [
  Asset.fromModule(require('../../../assets/images/ncit2.jpg')).uri,
  Asset.fromModule(require('../../../assets/images/ncit3.jpg')).uri,
  Asset.fromModule(require('../../../assets/images/ncit4.jpg')).uri,
  Asset.fromModule(require('../../../assets/images/ncit5.jpeg')).uri,
];

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
    image: { uri: images[5] },
  },
];

const collegeLocation = {
  latitude: 27.67141,
  longitude: 85.33913,
};

const HomeScreen: React.FC = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const dispatch=useDispatch()
  useEffect(() => {
    const fetchUserId = async () => {
      const data = await getUserId();
      const { id } = JSON.parse(data);
      console.log('userid: ' + id);
      setUserID(id);
      dispatch(setUserId(id));
    };

    fetchUserId();
  }, []);
  const { isLoading, isError, data } = useQuery({
    queryKey: ['profile', userID],
    queryFn: () => getProfile(userID),
    enabled: !!userID,
  });

  useEffect(() => {
    if (data) {
      console.log('Profile Data:', data);
      dispatch(setProfile(data));
      dispatch(setBatchId(data.batch ? data.batch.id : null));
     dispatch( setDepartmentId(data.batch && data.batch.department ? data.batch.department.id : null));
    }
  }, [data]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center',padding:10,margin:hp('1%'),fontSize:20,fontFamily:'Nunito-ExtraBold'}}>Welcome to Hamro College</Text>
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
      <View style={styles.mapContainer}>
        <Text style={styles.mapTitle}>Our College Location</Text>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={location.coords}
              title="Your Location"
              description="You are here"
            />
            <Marker
              coordinate={collegeLocation}
              title="Our College"
              description="Welcome to our college"
            />
            <MapViewDirections
              origin={location.coords}
              destination={collegeLocation}
              apikey={'YOUR_API_KEY'}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        )}
        {!location && (
          <Text style={styles.loadingText}>
            {errorMsg ? errorMsg : 'Loading location...'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    paddingTop: 40,
   
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
    marginBottom:40,
    backgroundColor:'#FFFFFF'
  },
  map: {
    width: wp('95%'),
    height: 300,
    borderRadius: 10,
  },
  mapTitle: {
    fontSize: 16,
   
    marginBottom: 10,
    fontFamily:'Nunito-Bold'
  },
  loadingText: {
    fontSize: 16,
    color: 'grey',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HomeScreen;
