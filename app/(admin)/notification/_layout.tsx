import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{headerShown:false}} />
      <Stack.Screen name="AddNotification" options={{headerShown:false}} />
      <Stack.Screen name="sendToAll" options={{headerShown:false}} />
      <Stack.Screen name="SendToDepart" options={{headerShown:false}} />
    
    
    </Stack>
  );
}
