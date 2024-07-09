import React from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

 function TabLayout() {
  return (
    <>
      {/* <StatusBar style="dark" backgroundColor="#E2E2E2" /> */}
      <Tabs
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#7952B3',
          tabBarInactiveTintColor: '#000',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: styles.tabBar,
        
        })}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Feather size={27} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            tabBarIcon: ({ color }) => <Feather size={27} name="bell" color={color} />,
          }}
        />
        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color }) => <Feather size={27} name="calendar" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Feather size={27} name="user" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}



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
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
    height: 34,
  },
  selectedButtonContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#DD486E',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#DD486E',
  },
});

export default TabLayout;
