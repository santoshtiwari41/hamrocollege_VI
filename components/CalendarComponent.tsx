import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalendarPicker, { DateChangedCallback } from "react-native-calendar-picker";
import moment from "moment";
import  selectDay from '@/components/selectDay'
import SelectDay from "@/components/selectDay";
const events = [
  {
    id: 1,
    title: 'sports week ',
    date: '2024-05-26',
    description: 'sports week ',
    holiday: true
  },
  {
    id: 2,
    title: 'quiz ',
    date: '2024-05-21',
    description: 'quiz competition',
    holiday: true
  },
  {
    id: 3,
    title: 'farewell ',
    date: '2024-05-01',
    description: 'farewell competition',
    holiday: true
  },
  {
    id: 4,
    title: 'welcome ',
    date: '2024-05-11',
    description: 'welcome competition',
    holiday: false
  }
];

const Notification = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [customDatesStyles, setCustomDatesStyles] = useState<any[]>([]);

  const onDateChange: DateChangedCallback = (date: Date) => {
    setSelectedStartDate(date);
    console.log(date);
  };

  useEffect(() => {
    generateCustomDatesStyles();
  }, []);

  const generateCustomDatesStyles = () => {
    const customStyles = [];
    const startDate = moment().startOf('year'); // Start from the beginning of the year
    const endDate = moment().endOf('year'); // End at the end of the year

    let day = startDate.clone();

    while (day.isBefore(endDate)) {
      const event = events.find(event => moment(event.date).isSame(day, 'day'));
      const isHoliday = event ? event.holiday : false;

      customStyles.push({
        date: day.toDate(), // Convert moment date to JavaScript Date
        style: {},
        textStyle: {
          color: day.day() === 6 ? 'red' : (isHoliday ? 'red' : 'black'), // Red text for Saturdays, red for holiday dates, black for other days
          fontSize: 20, // Adjust font size
          fontWeight: isHoliday ? 'bold' : 'normal', // Bold font for holiday dates
        },
        containerStyle: [], 
        allowDisabled: true, 
      });
      day.add(1, 'day');
    }

    setCustomDatesStyles(customStyles);
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        customDatesStyles={customDatesStyles}
        previousTitleStyle={{ color: '#333' }} 
        nextTitleStyle={{ color: '#333' }} 
        selectedDayTextStyle={{ color: '#fff' }} 
        selectedDayStyle={{ backgroundColor: '#007bff' }} 
        todayTextStyle={{ fontWeight: 'bold', color: 'yellow', fontSize: 20 }} 
        dayLabelsWrapper={{ backgroundColor: '#f2f2f2' }} 
        headerWrapperStyle={{ backgroundColor: '#007bff' }} 
      />

     
      <SelectDay date={selectedStartDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 100,
  },
  selectedDateText: {
    fontSize: 22, 
    fontWeight: 'bold',
    marginTop: 20,
  }
});

export default Notification;
