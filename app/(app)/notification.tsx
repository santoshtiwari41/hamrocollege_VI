import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';

import EventList from '@/components/eventList';

import Animated, { FadeInLeft,FadeInDown } from 'react-native-reanimated';
import CalendarComponent from '@/components/CalendarComponent';
const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDate = (date: string) => {
    console.log(date);
    setSelectedDate(date); 
  };

  return (
    <Animated.View sharedTransitionTag="sharedTag">
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
    <CalendarComponent dayData={handleDate} />
       <EventList />
  </ScrollView>
  </Animated.View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
   backgroundColor:'#1A162B'
  },
});

export default CustomCalendar;
