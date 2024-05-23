import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
const Login = () => {
  const router = useRouter();

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:Colors.button}}>welcome to login screen</Text>
      <Pressable onPress={() => router.push("/signup")} style={{margin:20,backgroundColor:'green'}}>
        <Text style={{color:Colors.button}}>signup</Text>
      </Pressable>
    </View>
  );
}

export default Login;
