import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
    auth: authReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;