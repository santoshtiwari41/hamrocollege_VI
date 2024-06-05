import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Redirect } from 'expo-router';

const Index: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  return (
    <>
        {isAuthenticated ? (
          //  <Redirect href="/(app)/home" />
          <Redirect href="/(admin)/notification" />
        ) : (
          <Redirect href="/(auth)/login" />
        )}
     
    </>
  );
}

export default Index;
