import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import OtpImage from "@/data/otpImage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Ionicons } from "@expo/vector-icons";
import ButtonComponent from "@/components/Button";
import { useRouter } from "expo-router";

const Otp: React.FC = () => {
  const router = useRouter();
  const firstInput = useRef<TextInput>(null);
  const secondInput = useRef<TextInput>(null);
  const thirdInput = useRef<TextInput>(null);
  const fourthInput = useRef<TextInput>(null);
  const fifthInput = useRef<TextInput>(null);
  const sixthInput = useRef<TextInput>(null);

  const inputRefs = [firstInput, secondInput, thirdInput, fourthInput, fifthInput, sixthInput];

  const [otpp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [allOtp, setAllOtp] = useState(false);

  const handleOtp = () => {
    const enteredOtp = Object.values(otpp).join("");
    console.log(enteredOtp);
    console.log("pressed");
    setOtp({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
   
    setAllOtp(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="arrow-back" size={30} onPress={() => router.back()} />
      </View>
      <View style={styles.svg}>
        <OtpImage />
      </View>
      <Text style={styles.content}>Enter the OTP number just sent you</Text>
      <View style={styles.otpContainer}>
        {inputRefs.map((inputRef, index) => (
          <View key={index} style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={inputRef}
              onChangeText={(text) => {
                const updatedOtp = { ...otpp, [index + 1]: text };
                setOtp(updatedOtp);

                if (text && index < 5) {
                  
                  const nextInputRef = inputRefs[index + 1];
                  nextInputRef?.current?.focus();
                } else if (text && index === 5) {
                  
                  const nextInputRef = inputRefs[index + 1];
                }
              }}
            />
          </View>
        ))}
      </View>
      {allOtp && (
        <Text style={{ textAlign: "center", marginLeft: -50 }}>
          {" "}
          Please enter all otp
        </Text>
      )}
      <TouchableOpacity onPress={handleOtp} style={{ alignItems: "center" }}>
        <ButtonComponent title="Verify" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'#E2E2E2'
  },
  content: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  otpNumberText: {
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 50,
  },
  otpText: {
    fontSize: 17,
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  headerContainer: {
    marginBottom: 30,
    marginTop: -170,
    marginLeft: 10,
  },
  svg: {
    alignItems: "center",
    marginBottom: 50,
  },
});

export default Otp;
