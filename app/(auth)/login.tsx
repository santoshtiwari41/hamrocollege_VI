import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import LoginImage from "@/data/LoginImage";
import { useRouter } from "expo-router";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useMutation } from "@tanstack/react-query";
import { studentLogin } from "@/services/api";

interface LogInProps {}

const LogIn: React.FC<LogInProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const router = useRouter();
  const handleForgotPassword = () => {
    router.push("/forgotPassword");
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const loginMutation = useMutation({
    mutationFn: studentLogin,
  });
  const handleLogin = () => {
    if (email == "user" && password == "user@123") {
      router.push("/(app)/home");
    }
    if (email == "admin" && password == "admin@123") {
      router.push("/(admin)/students");
    } else {
      const res = loginMutation.mutate({
      email,
      password,
      });
      console.log(res);
    }

   
    if (loginMutation.isPending) {
      return <Text>Loading...</Text>;
    }
    if (loginMutation.isError) {
     
      console.log(loginMutation.error.message);
    }
  };

  return (
    <Animated.View style={{ flex: 1, backgroundColor: "#E2E2E2" }}>
      <StatusBar style="dark" />
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
            gap: hp("4%"),
            marginTop: hp("-14%"),
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: hp("1%"),
              gap: hp("4%"),
            }}
          >
            <Text style={styles.title}>Welcome to Hamro College!</Text>
            <LoginImage />
          </View>

          <InputField
            icon="mail"
            placeholder="Enter  Email"
            value={email}
            onChangeText={setEmail}
          />

          <PasswordField
            icon="key"
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.row}>
            <View style={styles.rememberMeContainer}>
              <TouchableOpacity onPress={toggleRememberMe}>
                <Fontisto
                  name={rememberMe ? "checkbox-active" : "checkbox-passive"}
                  size={20}
                  color={rememberMe ? "#1A162B" : "black"}
                />
              </TouchableOpacity>
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordButtonText}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleLogin}>
            <Button title="Log In" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Nunito-ExtraBold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("90%"),
  },
  rememberMeContainer: {
    flexDirection: "row",
    gap: wp("3%"),
  },
  rememberMeText: {
    fontSize: 14.5,
    fontFamily: "Nunito-BoldItalic",
  },
  forgotPasswordButtonText: {
    color: "#1A162B",
    textDecorationLine: "underline",
    fontSize: 14.5,
    fontFamily: "Nunito-ExtraBoldItalic",
  },
});

export default LogIn;
