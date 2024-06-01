import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
const Index: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (
    <>
      <StatusBar style="dark" />
      {
        isAuthenticated ? (
          <Redirect href="/(app)/home" />
        ) : (
          <Redirect href="/(auth)/login" />
        )
      }
    </>
  );
}

export default Index;
