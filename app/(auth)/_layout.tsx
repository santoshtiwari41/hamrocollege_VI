
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
export default function AuthLayout() {
 
  return (
    <>
    <Stack screenOptions={{
      headerShown:false,
       contentStyle: {
         backgroundColor: Colors.background,
       },
     }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
     
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
