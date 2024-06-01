import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ClassNotification = () => {
  return (
    <View style={styles.container}>
      <Text>Class Notification</Text>
    </View>
  )
}

export default ClassNotification

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#E2E2E2',
        alignItems: 'center',
        justifyContent: 'center',
        width:hp('100%'),
        
    }
})