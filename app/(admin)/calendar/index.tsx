import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  holiday: boolean;
}

const CalendarScreen: React.FC = () => {
  const router = useRouter();
  const events = useSelector((state: RootState) => state.events.events);
  
  const renderEventItem = ({ item }: { item: CalendarEvent }) => (
    <View style={[styles.eventItem, item.holiday && styles.holidayItem]}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Events</Text>
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/calendar/createEvent')}>
        <Ionicons name="add-circle" size={40} color="#007bff" />
        <Text style={styles.addButtonText}>Add  Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Nunito-ExtraBold',
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  holidayItem: {
    backgroundColor: '#FFD700',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito-Bold',
  },
  eventDate: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito-Regular',
  },
  eventDescription: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Nunito-Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#E2E2E2',
    borderRadius: 10,
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 18,
    color: '#007bff',
    marginLeft: 10,
    fontFamily: 'Nunito-Bold',
  },
});

export default CalendarScreen;
