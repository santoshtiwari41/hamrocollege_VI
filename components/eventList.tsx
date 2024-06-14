import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useRouter } from "expo-router";
import { events } from "@/data/event";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { receiveCaledarEvent } from "@/services/api";
import { convertEvents } from "@/data/demoe";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";

const deviceWidth = Dimensions.get("window").width;

interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
  holiday: boolean;
}

const truncateDescription = (description: string, maxLength: number) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + "...";
  }
  return description;
};

const EventList: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["calendarkey"],
    queryFn: receiveCaledarEvent,
  });

  useEffect(() => {
    if (data) {
      setEvents(convertEvents(data.data));
    }
  }, [data]);

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
            <View
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRightWidth: 1,
              }}
            >
              <Text
                style={[
                  styles.dateText,
                  { color: item.holiday ? "red" : "green" },
                ]}
              >
                {item.date}
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>
                {truncateDescription(item.description, 60)}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-end",
                padding: 10,
              }}
            >
              <Ionicons name="arrow-forward" size={24} color="#1A162B" />
            </View>
          </Pressable>
        </Animated.View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    padding: 10,
    width: wp("95%"),
    height: hp("17%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  ocontainer: {
    width: deviceWidth,
    backgroundColor: "#E2E2E2",
    paddingTop: 5,
  },
  header: {
    marginLeft: wp("4%"),
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: "Nunito-ExtraBold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    fontFamily: "Nunito-LightItalic",
  },
  dateText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 16,
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
