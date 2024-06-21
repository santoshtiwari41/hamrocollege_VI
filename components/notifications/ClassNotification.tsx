// NotificationList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getNotificationByBatch } from '@/services/api';
import { ActivityIndicator } from 'react-native-paper';

interface Notification {
  id: number;
  title: string;
  body: string;
  image: string | null;
  batchId: number | null;
  departmentId: number | null;
  createdAt: string;
  scheduledTime: string;
  studentId: number | null;
  teacherId: number | null;
  type: string;
  updatedAt: string;
}




const NotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();
  const {  batchId} = useSelector((state: RootState) => state.profile);  
  const { isLoading, isError, data } = useQuery({
    queryKey: ['classNotification',batchId],
    queryFn: () => getNotificationByBatch(batchId),
    enabled: !!batchId,
  });
  useEffect(() => {
    if (data) {
      setNotifications(data);
    }
  }, [data]);

  const handlePress = (item: Notification) => {
    router.push({
      pathname: `/notification/${item.id}`,
      params: { title: item.title, description: item.body, imageUrl: item.image },
    });
  };
  
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
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={() => handlePress(item)}
        >
          <Image source={{ uri: item.image ? item.image : 'https://via.placeholder.com/50' }} style={styles.image} />
          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.body}</Text>
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
  description: {
    fontFamily: 'Nunito-MediumItalic',
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
export default NotificationList;
