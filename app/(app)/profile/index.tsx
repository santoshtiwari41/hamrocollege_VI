import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Title, Caption, Divider, Button } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from '@expo/vector-icons'; 
import { useRouter } from 'expo-router';

const studentProfile = {
  username: '@santosh.201341',
  name: 'santosh tiwari',
  roll: '201341',
  batch: '2020',
  email: 'santosh.201341@ncit.edu.np',
  department: 'computer'
};

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [imageUri, setImageUri] = useState<string>("");
  const [rerender, setRerender] = useState<number>(0); 

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
      setImageUri(result.assets[0].uri);
    }
  };

  return ( 
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={selectImage}>
          <View style={styles.imageContainer}>
            {imageUri ? (
              <Image key={rerender} source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <FontAwesome name="camera" size={40} color="#FFF" />
                <Text style={styles.placeholderText}>Select Image</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Title style={styles.title}>{studentProfile.name}</Title>
        <Caption style={styles.caption}>{studentProfile.username}</Caption>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.profileInfoSection}>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Student ROLL:</Text>
          <Text style={styles.value}>{studentProfile.roll}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{studentProfile.email}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Department:</Text>
          <Text style={styles.value}>{studentProfile.department}</Text>
        </View>
        <View style={styles.profileInfoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{studentProfile.batch}</Text>
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
          onPress={() => router.push('./profile/setting')}
        >
          Settings
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => console.log('log out')}
        >
          log out
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
    height:2
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
});

export default ProfileScreen;
