import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/Colors';
import SelectDay from './selectDay';

const deviceWidth = Dimensions.get('window').width;

interface MarkedDates {
  [date: string]: { marked?: boolean; selected?: boolean; selectedColor?: string; textColor?: string };
}

interface DemoCalendarProps {
  dayData: (date: string) => void;
}


const getAllSaturdays = (year: number): string[] => {
  const saturdays: string[] = [];
  let date = new Date(Date.UTC(year, 0, 1)); // Start from January 1st of the given year

  // Set the date to the first Saturday of the year
  while (date.getUTCDay() !== 6) {
    date.setUTCDate(date.getUTCDate() + 1);
  }

  // Add all Saturdays of the year to the array
  while (date.getUTCFullYear() === year) {
    const formattedDate = date.toISOString().split('T')[0];
    saturdays.push(formattedDate);
    date.setUTCDate(date.getUTCDate() + 7);
  }

  return saturdays;
};


const CalendarComponent: React.FC<DemoCalendarProps> = ({ dayData }) => {
  const [selected, setSelected] = useState<string>('');
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    const saturdays = getAllSaturdays(new Date().getFullYear());
    const newMarkedDates: MarkedDates = saturdays.reduce((acc, date) => {
      acc[date] = { selected:true, marked: true, textColor:'green' };
      return acc;
    }, {} as MarkedDates);
    setMarkedDates(newMarkedDates);
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    setSelected(day.dateString);
    dayData(day.dateString); 
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
          todayTextColor: 'orange',
          selectedDotColor: '#ffffff',
          arrowColor: 'white',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#ffffff',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: '500',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 20,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 17,
        }}
        onDayPress={handleDayPress}
        markingType={'custom'}
        markedDates={{
          ...markedDates,
          [selected]: { selected: true, selectedColor: 'blue' }
        }}
      />
      <SelectDay date={selected} />
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
