import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ForgotPasswordImage from "@/data/ForgotPasswordImage";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Animated from 'react-native-reanimated'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useMutation } from "@tanstack/react-query";
import { getOtp } from "@/services/api";



const ForgotPassword: React.FC = () => {
  const otpMutation = useMutation({
    mutationFn: getOtp,
  });
  const [email, setEmail] = useState<string>("");
  
  const router = useRouter();
  const back = () => {
    router.back()
  };

  const sentMail = () => {
    otpMutation.mutate({
      email,
      });
  
  };
if(otpMutation.error){
  console.log(otpMutation.error.message)
}
if(otpMutation.isSuccess){
  router.push({
    pathname: `/(auth)/otp`,
    params: { email},
  })
  
}

  return (
    <Animated.View style={{flex:1,backgroundColor: '#E2E2E2'}}
    >
      <KeyboardAvoidingView
      enabled
      keyboardVerticalOffset={200}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: hp("3%"),
          marginTop:hp("-18%"),
        }}
        
      >
         

        <View style={{alignItems:'center',marginBottom:hp('1%'),gap:hp('4%'),}}>
        
          <TouchableOpacity onPress={back} style={{marginLeft:wp('-85%')}}>
            <Ionicons name="arrow-back" size={30} color="#1A162B" />
          </TouchableOpacity>
        
        <Text style={styles.title}>Reset your password</Text>
        <ForgotPasswordImage  />

        </View>
       
        <InputField
          icon="mail"
          placeholder="Enter Your Email"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={sentMail}>
          <Button title="Continue" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </Animated.View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily:'Nunito-Bold'
  },
  
});

export default ForgotPassword;
