import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
};

type UserState = {
  current?: User; 
};

const initialState: UserState = {
  current: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.current = action.payload;
    },
    clearUser: (state) => {
      state.current = undefined;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;