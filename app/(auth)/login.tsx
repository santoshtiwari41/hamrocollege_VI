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

interface LogInProps {}

const LogIn: React.FC<LogInProps> = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const handleLogin = () => {
    if (username && password) {
      console.log(username + " " + password);
    } else {
      console.log("invalid username or password");
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgotPassword");
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
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
          marginTop:hp("-14%"),
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginBottom:hp('1%'),
            gap:hp('4%')
          }}
        >
          <Text style={styles.title}>Welcome to Hamro College!</Text>
          <LoginImage />
        </View>

        <InputField
          icon="mail"
          placeholder="Enter username or  Email"
          value={username}
          onChangeText={setUsername}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E2E2E2",
  },
  title: {
    fontSize: 24,
    fontFamily:'Nunito-ExtraBold'
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
    fontFamily:'Nunito-BoldItalic'
  },
  forgotPasswordButtonText: {
    color: "#1A162B",
    textDecorationLine: "underline",
    fontSize: 14.5,
    fontFamily:'Nunito-ExtraBoldItalic'
  },
});

export default LogIn;
