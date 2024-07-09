import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import CalendarPicker, {
  DateChangedCallback,
} from "react-native-calendar-picker";
import moment from "moment";
import SelectDay from "@/components/selectDay";

import {useQuery } from "@tanstack/react-query";
import { receiveCaledarEvent } from "@/services/api";
import { convertEvents } from "@/data/demoe";

const CalendarComponent = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["calendarkey"],
    queryFn: receiveCaledarEvent,
  });

  useEffect(() => {
    if (data) {
      setEvents(convertEvents(data.data));
    }
  }, [data]);

  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [customDatesStyles, setCustomDatesStyles] = useState<any[]>([]);

  const onDateChange: DateChangedCallback = (date: Date) => {
    setSelectedStartDate(date);
  };

  useEffect(() => {
    generateCustomDatesStyles();
  }, [events]); 

  const generateCustomDatesStyles = () => {
    const customStyles = [];
    const startDate = moment().startOf("year");
    const endDate = moment().endOf("year");

    let day = startDate.clone();

    while (day.isBefore(endDate)) {
      const event = events.find((event) =>
        moment(event.date).isSame(day, "day")
      );
      const isEventDay = !!event;
      const isHoliday = event ? event.holiday : false;
      const isSaturday = day.day() === 6;
      const isToday = moment().isSame(day, "day");
      let textStyle = {
        color: isSaturday
          ? "red"
          : isEventDay
          ? isHoliday
            ? "red"
            : "green"
          : "black",
        fontSize: 20,
        fontFamily: "Nunito-SemiBold",
      };

      if (isToday) {
        textStyle.color = "red";
      }

      customStyles.push({
        date: day.toDate(),
        style: {},
        textStyle: textStyle,
        containerStyle: [],
        allowDisabled: true,
      });
      day.add(1, "day");
    }

    setCustomDatesStyles(customStyles);
  };

  const formattedDate = selectedStartDate
    ? moment(selectedStartDate).format("YYYY-MM-DD")
    : "";

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.log(error);
    
    return <Text>An error occurred: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <CalendarPicker
        onDateChange={onDateChange}
        customDatesStyles={customDatesStyles}
        previousTitleStyle={{
          fontFamily: "Nunito-BoldItalic",
          color: "#1A162B",
        }}
        nextTitleStyle={{ fontFamily: "Nunito-BoldItalic", color: "#1A162B" }}
        selectedDayTextStyle={{
          color: "#fff",
          fontFamily: "Nunito-BoldItalic",
        }}
        selectedDayStyle={{ backgroundColor: "#1A162B" }}
        todayBackgroundColor={"#007bff"}
        dayLabelsWrapper={{
          backgroundColor: "#E2E2E2",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#1A162B",
        }}
        headerWrapperStyle={{ backgroundColor: "#E2E2E2" }}
        monthTitleStyle={{
          fontFamily: "Nunito-Bold",
          fontSize: 20,
          color: "#343434",
        }} // Custom style for month
        yearTitleStyle={{
          fontFamily: "Nunito-Bold",
          fontSize: 20,
          color: "#343434",
        }} // Custom style for year
        customDayHeaderStyles={(dayOfWeek) => {
          return {
            style: {
              backgroundColor: "#E2E2E2",
            },
            textStyle: {
              color: "#3a224d",
              fontFamily: "Nunito-BoldItalic",
              fontSize: 16,
            },
          };
        }}
      />

      <SelectDay date={formattedDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2E2E2",
  },
});

export default CalendarComponent;
