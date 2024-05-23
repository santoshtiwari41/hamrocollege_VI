import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Pressable } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
interface Date {
date:string
}
const SelectDay: React.FC<Date> = ({date}) => {
 console.log(date)
  return (
    <View> 
        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Upcoming Events</Text>
     
    <TouchableOpacity  >
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{date}</Text>
          <Text style={styles.description}>item.description</Text>
        </View>
        <Pressable style={styles.button}>
          <Text style={{ color: '#98B113', marginRight: 8 }}>View More</Text>
          
        </Pressable>
      </View>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#C2D8E3',
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ocontainer: {
    padding: 16,
    width: deviceWidth,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 5,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#1A162B',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

export default SelectDay;
