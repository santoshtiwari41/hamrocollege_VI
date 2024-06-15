import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from 'expo-jwt';
import{useJwt} from  'react-jwt'
import { jwtDecode } from "jwt-decode";
const storeData = async (value: string) => {
  try {
   
  
    await AsyncStorage.setItem('authToken', value);
    
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



const removeData = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userId');
    console.log('Token and User ID removed successfully');
  } catch (e) {
    console.log('Failed to remove the token and user ID:', e);
  }
};
export const setId = async (value:string) => {
  try{
    const decoded = jwtDecode(value);
    console.log('decodedToken:', decoded)
    await AsyncStorage.setItem('userId', JSON.stringify(decoded));
    console.log('decodedToken:', decoded)
    return decoded
  }
  catch(e){
    console.log('error form async',e)
  }
 
}
const getUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    console.log('userid retrieved successfully:', value);
    return value;
  } catch (e) {
    console.log('Failed to retrieve the userid:', e);
    return null;
  }
};

export const saveFcmToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('fcmToken', token);
  } catch (e) {
    console.error('Failed to save the FCM token to the storage', e);
  }
};

export const getFcmToken = async () => {
  try {
    const token = await AsyncStorage.getItem('fcmToken');
    return token;
  } catch (e) {
    console.error('Failed to fetch the FCM token from storage', e);
  }
};
export { storeData, getData, getUserId, removeData };
