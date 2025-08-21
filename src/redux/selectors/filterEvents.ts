import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectFilteredEvents = createSelector(
  [(state: RootState) => state.events.items, (state: RootState) => state.filters],
  (events, filters) => {
    return events.filter((event) => {
      const matchesCity = filters.city
        ? event.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;

      const matchesDate = filters.date
        ? event.date === filters.date
        : true;

      return matchesCity && matchesDate;
    });
  }
);
