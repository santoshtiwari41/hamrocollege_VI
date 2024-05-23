import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { StyleSheet, Dimensions,Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import SelectDay from './selectDay';

const deviceWidth = Dimensions.get('window').width;

interface MarkedDates {
  [date: string]: { marked: boolean; selected?: boolean; selectedColor?: string };
}

interface DemoCalendarProps {
  dayData: (date: string) => void;
}

const CalendarComponent: React.FC<DemoCalendarProps> = ({ dayData }) => {
  const [selected, setSelected] = useState('');

  const passData = () => {
    dayData(selected);
  };

  return (
    <>
    <Calendar
      style={styles.calendar}
      theme={{
        calendarBackground: Colors.button,
        textSectionTitleColor: 'green',
        selectedDayBackgroundColor: 'green',
        selectedDayTextColor: 'red',
        textDisabledColor: '#2d4150',
        dotColor: '#00adf5',
        dayTextColor: '#ffffff',
        todayTextColor: '#ffffff',
        todayBackgroundColor: '#4503fc',
        selectedDotColor: '#ffffff',
        arrowColor: 'white',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: '#ffffff',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 20,
        textMonthFontSize: 20,
        textDayHeaderFontSize: 17,
      }}
      onDayPress={day => {
        // console.log(day);
        setSelected(day.dateString);
        dayData(day.dateString); 
       
      }}
      markedDates={{
        '2024-05-01': { selected: true, marked: true, selectedColor: 'blue' },
        '2024-05-20': { marked: true },
        '2024-05-03': { selected: true, marked: true, selectedColor: 'blue' }
      }}
    />
   
   <SelectDay date={selected}/>
    </>
    
  );
};

const styles = StyleSheet.create({
  calendar: {
    paddingTop: 30,
    marginBottom: 10,
    width: deviceWidth,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 3,
  },
});

export default CalendarComponent;
