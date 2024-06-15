import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { saveFcmToken } from '@/services/asyncStorage';

const registerForPushNotificationsAsync = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  saveFcmToken(token);
};

export default registerForPushNotificationsAsync;
