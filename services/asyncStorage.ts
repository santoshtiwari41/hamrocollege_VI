import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from 'expo-jwt';

const storeData = async (value: string) => {
  try {
    const decoded = JWT.decode(value,'shh'); 
    
  
    await AsyncStorage.setItem('authToken', value);
    // await AsyncStorage.setItem('userId', userId.toString());
    console.log('Token and User ID stored successfully:', { token: value, decoded });
  } catch (e) {
    console.log('Failed to store the token and user ID:', e);
  }
};
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('authToken');
    console.log('Token retrieved successfully:', value);
    return value;
  } catch (e) {
    console.log('Failed to retrieve the token:', e);
    return null;
  }
};

const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    console.log('User ID retrieved successfully:', userId);
    return userId;
  } catch (e) {
    console.log('Failed to retrieve the user ID:', e);
    return null;
  }
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    console.log('Token and User ID removed successfully');
  } catch (e) {
    console.log('Failed to remove the token and user ID:', e);
  }
};

export { storeData, getData, getUserId, removeData };
