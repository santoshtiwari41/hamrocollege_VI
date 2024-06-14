import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEvents } from '@/redux/eventSlice';
import { useNavigation } from '@react-navigation/native'; // Assuming you use React Navigation 5+
import { v4 as uuidv4 } from 'uuid';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sendCalendarEvent } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

const EventCreate = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [holiday, setHoliday] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const EventMutation = useMutation({
    mutationFn: sendCalendarEvent,
    onSuccess: async (data) => {
      console.log('Event sent', data);
    },
    onError: (error) => {
      console.log('Error occurred in sending event', error.message);
    },
  });

  const handleAddBatchEvent = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const events = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      events.push({
        id: uuidv4(),
        title,
        date: d.toISOString().split('T')[0],
        description,
        holiday,
      });
    }

    dispatch(addEvents(events));
    navigation.goBack();

    setTitle('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setHoliday(false);

     EventMutation.mutate({
      title,
      startTime:startDate,
      endTime:endDate,
      description,
      holiday,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new Event</Text>
      <InputField
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        placeholder="Start Date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <InputField
        placeholder="End Date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <TextInput
        style={styles.description}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Holiday:</Text>
        <Switch
          value={holiday}
          onValueChange={setHoliday}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={holiday ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity onPress={handleAddBatchEvent}>
        <Button title='Add Event' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    alignItems: 'center',
    paddingTop: hp('7%'),
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Nunito-ExtraBold',
  },
  description: {
    backgroundColor: '#E2E2E2',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    borderWidth: 1,
    width: wp('90%'),
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90%'),
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});

export default EventCreate;
