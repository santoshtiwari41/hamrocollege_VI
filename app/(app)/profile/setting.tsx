import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const setting = () => {
  return (
    <View style={styles.container}>
      <Text>setting</Text>
    </View>
  )
}

export default setting

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
      },
    
})