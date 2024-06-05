import 'react-native-get-random-values'
import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import store from '@/redux/store'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const fetchFonts = async () => {
  await Font.loadAsync({
    'Nunito-Black': require('@/assets/fonts/Nunito-Black.ttf'),
    'Nunito-BlackItalic': require('@/assets/fonts/Nunito-BlackItalic.ttf'),
    'Nunito-Bold': require('@/assets/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('@/assets/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('@/assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('@/assets/fonts/Nunito-ExtraBoldItalic.ttf'),
    'Nunito-ExtraLight': require('@/assets/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('@/assets/fonts/Nunito-ExtraLightItalic.ttf'),
    'Nunito-Light': require('@/assets/fonts/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('@/assets/fonts/Nunito-LightItalic.ttf'),
    'Nunito-SemiBold': require('@/assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('@/assets/fonts/Nunito-SemiBoldItalic.ttf'),
    'Nunito-Medium': require('@/assets/fonts/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('@/assets/fonts/Nunito-MediumItalic.ttf'),
    'Nunito-Regular': require('@/assets/fonts/Nunito-Regular.ttf'),
    'Roboto-Light': require('@/assets/fonts/Roboto-Light.ttf'),
    'Roboto-Black': require('@/assets/fonts/Roboto-Black.ttf'),
    'Roboto-BlackItalic': require('@/assets/fonts/Roboto-Italic.ttf'),
  });
};

export default function Layout() {
  const queryClient = new QueryClient();

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontLoaded) {
    return null; 
  }

  return (
    <Provider store={store}>
     <QueryClientProvider client={queryClient}>
     <Stack screenOptions={{ headerShown: false }}>
    
    </Stack>
    </QueryClientProvider>
    </Provider>
    
  );
}
