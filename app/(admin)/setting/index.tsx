import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

const index = () => {
    const router=useRouter();
  return (
    <View style={{flex:1,alignItems:'center',paddingTop:50}}>
      <TouchableOpacity onPress={()=>router.replace('/(auth)/login')}>
        <Button title='log out'></Button>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})