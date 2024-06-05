import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CollegeNotification = () => {
  return (
    <View style={styles.container}>
      <Text>College Notification</Text>
    </View>
  )
}

export default CollegeNotification

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        width:hp('100%'),
      },
    
})