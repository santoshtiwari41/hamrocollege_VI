import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, Easing } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TabLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#E2E2E2" />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#DDDDDD',
          tabBarInactiveTintColor: '#000',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        })}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            tabBarIcon: ({ color }) => <Feather size={24} name="bell" color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => <Feather size={24} name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Feather size={24} name="user" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityState?: { selected: boolean };
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ children, onPress, accessibilityState }) => {
  const isSelected = accessibilityState?.selected ?? false;
  const translateY = useSharedValue(isSelected ? 0 : 6);
  const scale = useSharedValue(isSelected ? 1.2 : 1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 400, easing: Easing.bezier(0.2, 0, 0.7, 1) }) },
        { scale: withSpring(scale.value, { damping: 10, stiffness: 100 }) }
      ],
    };
  });

  useEffect(() => {
    translateY.value = isSelected ? -1 : 7;
    scale.value = isSelected ? 1.1 : 0.9;
  }, [isSelected]);

  return (
    <Animated.View style={[styles.button, isSelected && styles.selectedButton, animatedStyle]}>
      <TouchableOpacity onPress={onPress}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 5,
    height: hp('7%'),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 12,
    height: 34,
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: '#DD486E',
  },
});
