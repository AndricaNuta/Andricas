import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type Event = {
  id: string;
  title: string;
  city: string;
  date: string;        
  description?: string;
  price?: string;
};

type EventsState = {
  items: Event[];
  favoriteIds: string[];
};

const initialState: EventsState = {
  items: [],
  favoriteIds: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.items = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.items.unshift(action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const i = state.favoriteIds.indexOf(id);
      if (i >= 0) state.favoriteIds.splice(i, 1);
      else state.favoriteIds.push(id);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(e => e.id !== id);
      state.favoriteIds = state.favoriteIds.filter(f => f !== id);
    },
  },
});

export const { setEvents, addEvent, toggleFavorite, removeEvent } = eventsSlice.actions;
export default eventsSlice.reducer;

export const selectEvents = (s: RootState) => s.events.items;
export const selectFavoriteIds = (s: RootState) => s.events.favoriteIds;

export const selectFavoriteEvents = createSelector(
  [selectEvents, selectFavoriteIds],
  (items, favIds) => items.filter(e => favIds.includes(e.id))
);

export const makeSelectEventById = (id: string) =>
  createSelector([selectEvents], items => items.find(e => e.id === id));
