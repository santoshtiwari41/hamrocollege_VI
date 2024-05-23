import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';

import EventList from '@/components/eventList';
import Calendar from '@/components/calendar'; 
import { Colors } from '@/constants/Colors';

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDate = (date: string) => {
    console.log(date);
    setSelectedDate(date); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Calendar dayData={handleDate} />
      <EventList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.button,
  },
});

export default CustomCalendar;
