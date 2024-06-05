import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  holiday: boolean;
}

interface EventsState {
  events: CalendarEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<CalendarEvent>) {
      state.events.push(action.payload);
    },
    addEvents(state, action: PayloadAction<CalendarEvent[]>) {
      state.events.push(...action.payload);
    },
    removeEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
  },
});

export const { addEvent, addEvents, removeEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
