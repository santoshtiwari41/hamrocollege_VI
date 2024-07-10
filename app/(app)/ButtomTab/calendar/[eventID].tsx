import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInLeft, FadeInDown, FadeInUp } from "react-native-reanimated";
const deviceWidth = Dimensions.get("window").width;
type Params = {
  id: string;
  date: string;
  title: string;
  description: string;
};
export default function EventDetail() {
  const { id, date, title, description } = useLocalSearchParams<Params>();

  return (
    <Animated.View entering={FadeInDown.duration(800).delay(100)} style={{flex:1}}> 
    <Animated.View
    style={styles.container}
    sharedTransitionTag="sharedTag"
    entering={FadeInDown.duration(800).delay(50)}
  >
    <View style={styles.header}>
      <Text style={styles.headerText}>Event Details</Text>
    </View>
    <View style={styles.content}>
      <View style={styles.detailContainer}>
        <Ionicons
          name="calendar"
          size={24}
          color={Colors.button}
          style={styles.icon}
        />
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{date}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons
          name="pricetag"
          size={24}
          color={Colors.button}
          style={styles.icon}
        />
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{title}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons
          name="information-circle"
          size={24}
          color={Colors.button}
          style={styles.icon}
        />
        <Animated.Text style={styles.label}>Description:</Animated.Text>
        <Text style={styles.value}>{description}</Text>
      </View>
    </View>
  </Animated.View></Animated.View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2',
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    backgroundColor: Colors.button,
    width: "100%",
    padding: 16,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  content: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: -10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.button,
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: "gray",
  },
});
