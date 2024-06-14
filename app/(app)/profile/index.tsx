import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import { Title, Caption, Divider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { removeData } from '@/services/asyncStorage';
import { getUserId } from '@/services/asyncStorage';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/api';

const ProfileScreen: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const data = await getUserId();
      const { id } = JSON.parse(data);
      console.log('userid: ' + id);
      setUserId(id);
    };

    fetchUserId();
  }, []);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [imageUri, setImageUri] = useState<string>("");

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleLogout = async () => {
    await removeData();
    router.replace('/(auth)/login');
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
      <View style={styles.header}>
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image key={new Date().getTime()} source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <FontAwesome name="camera" size={40} color="#FFF" />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Title style={styles.title}>{data?.name || 'Loading...'}</Title>
        <Caption style={styles.caption}>{'@' + (data?.email.split('@')[0] || 'username')}</Caption>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.profileInfoSection}>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Student ROLL:</Text>
          <Text style={styles.value}>{data?.crn || 'Loading...'}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data?.email || 'Loading...'}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>Computer</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{data?.batch?.startYear} - {data?.batch?.endYear}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{data?.phone || 'Loading...'}</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.buttonSection}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Edit Profile')}
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => router.push('/profile/settings')}
        >
          Settings
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={handleLogout}
        >
          Log Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    color: '#888',
  },
  divider: {
    marginVertical: 20, 
    width: '100%', 
    height: 2,
  },
  profileInfoSection: {
    marginBottom: 20,
  },
  profileInfoRow: {
    flexDirection: 'row',
    marginBottom: 15, 
  },
  label: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    color: '#555',
  },
  buttonSection: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    backgroundColor: 'grey',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  placeholderText: {
    color: '#FFF',
    marginTop: 5,
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

export default ProfileScreen;
