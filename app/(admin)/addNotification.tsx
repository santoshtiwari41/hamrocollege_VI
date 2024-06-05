import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addScheduledNotification } from '@/redux/notificationSlice'; 
import { useNavigation } from 'expo-router'; 
import { v4 as uuidv4 } from 'uuid'; 

interface ScheduledNotification {
  id: string;
  title: string;
  description: string;
  scheduledDate: string; 
}

const AddNotificationScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledDate, setScheduledDate] = useState<string>(new Date().toISOString());
  const [image, setImage] = useState<string>(''); 

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addNotification = () => {
    const newNotification: ScheduledNotification = {
      id: uuidv4(),
      title,
      description,
      scheduledDate,
    };
    
    dispatch(addScheduledNotification(newNotification));
    navigation.goBack(); 

    setTitle('');
    setDescription('');
    setScheduledDate(new Date().toISOString());
    setImage(''); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Notification</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Schedule Date (YYYY-MM-DDTHH:MM:SS)"
        value={scheduledDate}
        onChangeText={setScheduledDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity onPress={addNotification}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Notification</Text>
        </View>
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
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
  },
});

export default AddNotificationScreen;
