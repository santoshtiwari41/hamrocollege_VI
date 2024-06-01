import {StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import EventList from '@/components/eventList';
import Calendar from '@/components/CalendarComponent'; 
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomCalendar = () => {
 
  return (
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
       <Calendar/>
       <EventList />
  </ScrollView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
   backgroundColor:'#E2E2E2',
   paddingTop:hp('5.5%')
  },
});

export default CustomCalendar;
