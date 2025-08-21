import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  city: string | null;
  date: string | null;
};

const initialState: FilterState = { city: null, date: null };

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string | null>) => {
      state.city = action.payload;
    },
    setDate: (state, action: PayloadAction<string | null>) => {
      state.date = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { setCity, setDate, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
