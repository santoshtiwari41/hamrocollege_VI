import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '@/redux/notificationSlice'; // Adjust the path
import eventsReducer from '@/redux/eventSlice';

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    events: eventsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type
export default store;
