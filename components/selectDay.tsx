import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

interface DateProps {
  date: string;
}

const SelectDay: React.FC<DateProps> = ({ date }) => {
  const datee = new Date(date);
  const day = datee.getDate();
  const year = datee.getFullYear();
  const month = datee.toLocaleString('default', { month: 'long' }); 
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const week = days[datee.getDay()];

  return (
    <View style={styles.ocontainer}> 
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.dateText}>{`${week}, ${month} ${day}, ${year}`}</Text>
            <Text style={styles.description}>Event.description </Text>
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>View More</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginTop:10,
    borderRadius: 10,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'green',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  ocontainer: {
    padding: 16,
    paddingBottom:0,
    width: deviceWidth,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 5,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    color: '#666',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1A162B',
    borderRadius: 10,
  },
  buttonText: {
    color: '#98B113',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelectDay;
