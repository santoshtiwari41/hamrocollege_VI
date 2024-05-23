import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { events } from '@/data/event';
import { Ionicons } from '@expo/vector-icons';

const deviceWidth = Dimensions.get('window').width;

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

const EventList: React.FC = () => {
  const router = useRouter();

  const handlePress = (event: Event) => {
    const { id, date, title, description } = event;
    router.push({
      pathname: `/calendar/${id}`,
      params: { date, title, description }
    });
  };

  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={styles.ocontainer}
    >
      <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Upcoming Events</Text>
      {events.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handlePress(item)}>
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => handlePress(item)}>
              <Text style={{ color: '#98B113', marginRight: 8 }}>View More</Text>
              <Ionicons name="arrow-forward" size={16} color="#98B113" />
            </Pressable>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#C2D8E3',
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ocontainer: {
    padding: 16,
    width: deviceWidth,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 5,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#1A162B',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

export default EventList;
