import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers,User } from '@/services/api';
import { ScheduledNotification } from '@/redux/notificationSlice';

const NotificationScreen: React.FC = () => {
  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  console.log(data)
  const router = useRouter();
  const scheduledNotifications = useSelector((state: RootState) => state.notifications.scheduledNotifications);

  const renderNotificationItem = ({ item }: { item: ScheduledNotification }) => (
    <View style={styles.notificationItem}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.notificationImage} resizeMode="contain" />
      ) : null}
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
      <Text style={styles.notificationDate}>{new Date(item.scheduledDate).toLocaleString()}</Text>
    </View>
  );
  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error instanceof Error) return <Text>Error: {error.message}</Text>;
 
  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Scheduled Notifications</Text>
      <FlatList
        data={scheduledNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/notification/AddNotification')}>
        <Ionicons name="add-circle" size={40} color="#007bff" />
        <Text style={styles.addButtonText}>Add Notification</Text>
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
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  notificationImage: {
    width: '100%',
    height: 200,  
    borderRadius: 10,
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito-Bold',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito-Regular',
  },
  notificationDate: {
    fontSize: 14,
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

export default NotificationScreen;
