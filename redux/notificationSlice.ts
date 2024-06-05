import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ScheduledNotification {
  id: string;
  title: string;
  description: string;
  scheduledDate: string; 
  imageUri: string;
}

interface NotificationsState {
  scheduledNotifications: ScheduledNotification[];
}

const initialState: NotificationsState = {
  scheduledNotifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addScheduledNotification(state, action: PayloadAction<ScheduledNotification>) {
      state.scheduledNotifications.push(action.payload);
    },
    removeScheduledNotification(state, action: PayloadAction<string>) {
      state.scheduledNotifications = state.scheduledNotifications.filter(
        notification => notification.id !== action.payload
      );
    },
  },
});

export const { addScheduledNotification, removeScheduledNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
