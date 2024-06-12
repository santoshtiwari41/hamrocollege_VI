import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
       headerShown:false
      }}>
     
      <Stack.Screen name="index" options={{headerShown:false}} />
      
      <Stack.Screen name="[register]" options={{headerShown:false}} />
      
    </Stack>
  );
}
