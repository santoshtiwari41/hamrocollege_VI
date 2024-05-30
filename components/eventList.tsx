import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { events } from "@/data/event";
import { Ionicons } from "@expo/vector-icons";
import Animated,{ scrollTo,useAnimatedRef,useSharedValue,useDerivedValue } from "react-native-reanimated";
const deviceWidth = Dimensions.get("window").width;
interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

const EventList: React.FC = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  useDerivedValue(() => {
    scrollTo(animatedRef, 0, scrollY.value, true);
  });

  const router = useRouter();

  const handlePress = (event: Event) => {
    const { id, date, title, description } = event;
    router.push({
      pathname: `/calendar/${id}`,
      params: { date, title, description },
    });
  };

  return (
    <Animated.ScrollView
      ref={animatedRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ocontainer}
    >
      <Text style={styles.header}>Upcoming Events</Text>
      {events.map((item, index) => (
        <Animated.View key={item.id} sharedTransitionTag="sharedTag">
          <Pressable onPress={() => handlePress(item)} style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => handlePress(item)}>
              <Text style={styles.buttonText}>View More</Text>
              <Ionicons name="arrow-forward" size={16} color="#98B113" />
            </Pressable>
          </Pressable>
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#C2D8E3",
    marginBottom: 20,
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#f5b942",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  ocontainer: {
    padding: 16,
    width: deviceWidth,
    backgroundColor: "#ffffff",
    paddingTop: 5,
  },
  header: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  description: {
    color: "gray",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    height: 40,
    backgroundColor: "#1A162B",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "#98B113",
    marginRight: 8,
  },
});

export default EventList;
