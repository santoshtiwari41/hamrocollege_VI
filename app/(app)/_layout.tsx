import React from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming,withSpring,FadeInDown } from 'react-native-reanimated';

export default function TabLayout() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="black" />
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
          name="home"
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
  const backgroundColor = useSharedValue(isSelected ? '#DD486E' : 'white');
  const scale = useSharedValue(isSelected ? 1.1 : 2);
  const shadowOpacity = useSharedValue(isSelected ? 0.3 : 0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(backgroundColor.value, { duration: 300 }),
      // transform: [{ scale: withSpring(scale.value) }],
      // shadowOpacity: withTiming(shadowOpacity.value, { duration: 300 }),
     
    };
  });

  React.useEffect(() => {
    backgroundColor.value = isSelected ? '#DD486E' : 'white';
  }, [isSelected]);

  return (
    <Animated.View style={[styles.button, animatedStyle]} entering={FadeInDown.duration(800).delay(100)}>
      <TouchableOpacity
        style={styles.innerButton}
        onPress={onPress}
      >
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
    height: 60,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 12,
    height: 34,
  },
  innerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#DD486E',
  },
});
