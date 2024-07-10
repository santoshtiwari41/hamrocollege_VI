import React, { useEffect, useState, useCallback } from "react";
import { Redirect } from "expo-router";
import { getData} from "@/services/asyncStorage";
import { useFocusEffect } from '@react-navigation/native';
import registerForPushNotificationsAsync from "@/services/registerForPushNotification";

const Index: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const checkToken = useCallback(async () => {
    try {
     
      const value = await getData();
      console.log('Fetched token:', value); 
     
      if (value !== null) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.log('Error fetching token:', e);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useFocusEffect(
    useCallback(() => {
      checkToken();
    }, [checkToken])
  );

  console.log("isAuthenticated state:", isAuthenticated); 

  if (isAuthenticated === null) {
    return null; 
  }

  return (
    <>
      {isAuthenticated ? (
        <Redirect href="/(app)/ButtomTab/home" />
      ) : (
        <Redirect href="/(auth)/login" />
      )}
    </>
  );
};

export default Index;
