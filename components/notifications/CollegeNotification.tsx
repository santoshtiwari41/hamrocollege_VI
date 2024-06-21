import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useQuery } from '@tanstack/react-query';
import { getNotificationByStudent } from '@/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';

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

const CollegeNotification: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const {departmentId, userId } = useSelector((state: RootState) => state.profile);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['allNotification',userId],
    queryFn: () => getNotificationByStudent(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      console.log('Notification Data from college:', data);
      setNotifications(data);
    }
  }, [data]);

  const handlePress = (item: Notification) => {
    console.log('this is from department notification', departmentId);
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
        <Text style={styles.errorText}>Error fetching notifications</Text>
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

export default CollegeNotification;

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
