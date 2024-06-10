// NotificationList.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const notifications = [
  {
    id: '1',
    title: 'Notification 1',
    description: 'This is the first notification.',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    title: 'Notification 2',
    description: 'This is the second notification.',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    title: 'Notification 3',
    description: 'This is the third notification.',
    imageUrl: 'https://via.placeholder.com/50',
  },
];

const NotificationList = () => {
  const router = useRouter();

  const handlePress = (item: { id: string, title: string, description: string, imageUrl: string }) => {
    router.push({
      pathname: `/notification/${item.id}`,
      params: { title: item.title, description: item.description, imageUrl: item.imageUrl },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={() => handlePress(item)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
           
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E2E2E2',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
   paddingRight:0,
  
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    
  },
  description:{
    fontFamily: 'Nunito-MediumItalic',
  }
});

export default NotificationList;
