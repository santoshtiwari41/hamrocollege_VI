import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { Title, Caption, Divider, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { removeData } from '@/services/asyncStorage';

import { RootState } from '@/redux/store';
const ProfileScreen: React.FC = () => {
  
  const {  batchId, departmentId,profile,userId} = useSelector((state: RootState) => state.profile);
  
  const [imageUri, setImageUri] = useState<string>("");

  const router = useRouter();
  
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

 

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <Title style={styles.title}>{profile?.name || 'Loading...'}</Title>
        <Caption style={styles.caption}>{'@' + (profile?.email.split('@')[0] || 'username')}</Caption>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.profileInfoSection}>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Student ROLL:</Text>
          <Text style={styles.value}>{profile?.crn || 'Loading...'}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile?.email || 'Loading...'}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>{profile?.batch?.department?.name || 'Loading...'}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{profile?.batch?.startYear} - {profile?.batch?.endYear}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{profile?.phone || 'Loading...'}</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.buttonSection}>
        <Button
         mode="outlined"
         
          style={[styles.button, { borderColor: '#4e247d' }]}
          onPress={() => router.push('/(app)/profile/changePassword')}
        >
          change Password
        </Button>
        <Button
          mode="outlined"
          labelStyle={{ color: '#8b41e0' }}
          style={[styles.button, { borderColor: '#8b41e0' }]}
          onPress={() => router.push('/profile/setting')}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E2E2E2',
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
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
    marginVertical: 10, 
    width: '100%', 
    height: 2,
  },
  profileInfoSection: {
    marginBottom: 10,
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
});

export default ProfileScreen;
