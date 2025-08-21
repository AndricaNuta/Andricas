import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Event = {
  id: string;
  title: string;
  city: string;
  date: string;
};

type EventsState = {
  items: Event[];
};

const initialState: EventsState = {
  items: [], 
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.items = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.items.push(action.payload);
    },
  },
});

export const { setEvents, addEvent } = eventsSlice.actions;
export default eventsSlice.reducer;