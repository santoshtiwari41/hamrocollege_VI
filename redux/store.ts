import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '@/redux/notificationSlice'; // Adjust the path
import eventsReducer from '@/redux/eventSlice';
import authReducer from '@/redux/authSlice';
import profileReducer from '@/redux/profileSlice';
const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    events: eventsReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type
export default store;
