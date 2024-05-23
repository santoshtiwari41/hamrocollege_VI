import { Stack } from 'expo-router/stack';
import { Colors } from '@/constants/Colors';
import { StatusBar } from 'expo-status-bar';
export default function AuthLayout() {
 
  return (
    <>
    <StatusBar style="auto" backgroundColor={Colors.background} />
    
    <Stack screenOptions={{
      headerShown:false,
       contentStyle: {
         backgroundColor: Colors.background,
       },
     }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
