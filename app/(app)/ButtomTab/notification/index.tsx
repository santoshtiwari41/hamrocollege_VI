import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { GestureHandlerRootView, PanGestureHandler, State } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import ClassNotification from "@/components/notifications/ClassNotification";
import CollegeNotification from "@/components/notifications/CollegeNotification";
import DepartmentNotification from "@/components/notifications/DepartmentNotification";
const { width } = Dimensions.get("window");


const Notification: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const translateX = useSharedValue(0);
  const indicatorTranslateX = useSharedValue(0);

  const handleIndexChange = (index: number) => {
    setSelectedIndex(index);
    translateX.value = withSpring(-width * index);
    indicatorTranslateX.value = withSpring((width / 3) * index);
  };

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorTranslateX.value }],
    };
  });

  const onGestureEvent = (event: any) => {
    const { translationX } = event.nativeEvent;
    translateX.value = -width * selectedIndex + translationX;
    indicatorTranslateX.value = (width / 3) * selectedIndex + translationX / 3;
  };

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > 50 && selectedIndex > 0) {
        handleIndexChange(selectedIndex - 1);
      } else if (translationX < -50 && selectedIndex < 2) {
        handleIndexChange(selectedIndex + 1);
      } else {
        translateX.value = withSpring(-width * selectedIndex);
        indicatorTranslateX.value = withSpring((width / 3) * selectedIndex);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View>
        <SegmentedControlTab
          values={["Class", "College", "Department"]}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
      </View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.content, animatedContentStyle]}>
          <ClassNotification />
         <CollegeNotification />
          <DepartmentNotification />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#E2E2E2",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    width: width * 3,
  },
  
  tabsContainerStyle: {
    height: 50,
    backgroundColor: "#E2E2E2",
  },
  tabStyle: {
    backgroundColor: "#E2E2E2",
    borderColor: 'transparent',
    borderBottomWidth: 2,
  },
  tabTextStyle: {
    color: "#000",
    fontSize: 18,
    fontFamily: 'Nunito-Bold'
  },
  activeTabStyle: {
    backgroundColor: '#E2E2E2   ',
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
