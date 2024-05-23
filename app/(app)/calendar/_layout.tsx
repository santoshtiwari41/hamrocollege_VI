import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{headerShown:false}}
  >
     <Stack.Screen name='index'/>
     <Stack.Screen name="[eventID]" options={{}} />
     <Stack.Screen
        name="modal"
        options={{
         
          presentation: 'modal',
        }}
      />
    </Stack>;
}