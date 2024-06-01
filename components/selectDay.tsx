import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { events } from '@/data/event';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from "@expo/vector-icons";
const deviceWidth = Dimensions.get('window').width;

interface DateProps {
  date?: string;
}

const SelectDay: React.FC<DateProps> = ({ date }) => {
  let datee = new Date();

  if (date && date.trim() !== '') {
    datee = new Date(date);
  }

  const day = datee.getDate();
  const year = datee.getFullYear();
  const month = datee.toLocaleString('default', { month: 'long' });
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const week = days[datee.getDay()];

  const eventOnSelectedDate = events.find(event => {
    const eventDate = new Date(event.date);
    return eventDate.getDate() === day && eventDate.getMonth() === datee.getMonth() && eventDate.getFullYear() === year;
  });

  return (
    <View style={styles.ocontainer}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.dateText}>{`${week}, ${month} ${day}, ${year}`}</Text>
          <Text style={styles.description}>
            {eventOnSelectedDate ? eventOnSelectedDate.title :` "Happy coding !"`}
          </Text>
        </View>
        <Pressable style={styles.button}>
         <AntDesign  name="downcircleo" size={40} color="#1A162B"/>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: wp('95%'),
    alignSelf: 'center',
    height:hp('13%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  ocontainer: {
    width: deviceWidth,
    paddingTop: 5,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontFamily:'Nunito-ExtraBold'
  },
  description: {
    fontSize: 16,
    fontFamily:'Nunito-LightItalic'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 13,
   
  
    justifyContent: 'center',
  },
  buttonText: {
    color: '#1A162B',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontFamily:'Nunito-ExtraBoldItalic'
  },
});

export default SelectDay;
 