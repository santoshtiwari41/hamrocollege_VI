import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import ClassNotification from "@/components/notifications/ClassNotification";
import UniversityNotification from "@/components/notifications/UniversityNotification";
import CollegeNotification from "@/components/notifications/CollegeNotification";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const Notification: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const translateX = useSharedValue(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
    translateX.value = withSpring(index * (width / 3));
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;
    translateX.value = selectedIndex * (width / 3) + translationX / 3;
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50 && selectedIndex > 0) {
        handleIndexChange(selectedIndex - 1);
      } else if (translationX < -50 && selectedIndex < 2) {
        handleIndexChange(selectedIndex + 1);
      } else {
        translateX.value = withSpring(selectedIndex * (width / 3));
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <SegmentedControlTab
          values={["Class", "College", "University"]}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
        <Animated.View style={[styles.indicator, animatedStyle]} />
      </View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={styles.content}>
          {selectedIndex === 0 && <ClassNotification />}
          {selectedIndex === 1 && <CollegeNotification />}
          {selectedIndex === 2 && <UniversityNotification />}
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabsContainerStyle: {
    height: 50,
    backgroundColor: "#FFFFFFF",
  },
  tabStyle: {
    backgroundColor: "#FFFFFF",
    borderColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: 'black', // Add bottom border color
  },
  tabTextStyle: {
    color: "#000",
    fontSize: 18,
    fontFamily:'Nunito-Bold'
  },
  activeTabStyle: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#DD486E', 
  },
  activeTabTextStyle: {
    color: "#000000",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 5,
    width: width / 3,
    backgroundColor: "#DD486E",
  },
});

export default Notification;
