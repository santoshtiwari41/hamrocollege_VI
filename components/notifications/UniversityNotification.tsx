import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const UniversityNotification = () => {
  return (
    <View style={styles.container}>
      <Text >University Notification</Text>
    </View>
  )
}

export default UniversityNotification

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
      width:hp('100%'),
    },
  
})