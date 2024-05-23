import { View, Text ,Pressable} from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const signup = () => {
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>welcome to signup screen</Text>
      <Pressable onPress={() => router.push("/login")} style={{margin:20,backgroundColor:'green'}}>
        <Text>login</Text>
      </Pressable>
    </View>
  )
}

export default signup