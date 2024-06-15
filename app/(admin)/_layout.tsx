import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="students" 
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="notification" 
          options={{
            drawerLabel: 'Notification',
            title: 'Notification',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="calendar" 
          options={{
            drawerLabel: 'Calendar',
            title: 'Calendar',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="calendar-today" color={color} size={size} />
            ),
          }}
        />
    
      <Drawer.Screen
          name="setting/index" 
          options={{
            drawerLabel: 'Setting',
            title: 'Setting',
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
