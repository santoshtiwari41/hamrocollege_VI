import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const Attendance = () => {
  const attendanceData = [
    { title: 'Total', days: 124, present: 124, absent: 124, percentage: 75 },
    { title: 'Jestha', days: 124, present: 124, absent: 124, percentage: 75 },
    { title: 'Baisakh', days: 124, present: 124, absent: 124, percentage: 75 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Present Today</Text>
      </View>
      {attendanceData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Operating Days: {item.days}</Text>
              <Text style={styles.text}>Present Days: {item.present}</Text>
              <Text style={styles.text}>Absent Days: {item.absent}</Text>
            </View>
            <ProgressCircle
              percent={item.percentage}
              radius={40}
              borderWidth={8}
              color="#3b5998"
              shadowColor="#e6e6e6"
              bgColor="#fff"
            >
              <Text style={styles.percentageText}>{item.percentage}%</Text>
            </ProgressCircle>
          </View>
        </View>
      ))}
      {/* Gradually uncomment this part to debug */}
      {/* <Text>hello</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Attendance;
