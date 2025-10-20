import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';

export type User = {
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isHydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isHydrated: false,
};

const toUser = (fbUser: FirebaseUser): User => ({
  id: fbUser.uid,
  email: fbUser.email ?? '',
});

export const loginUser = createAsyncThunk<User, { email: string; password: string }>(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return toUser(cred.user);
    } catch (e: any) {
      return rejectWithValue(e?.code || e?.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk<User, { email: string; password: string }>(
  'auth/signupUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      return toUser(cred.user);
    } catch (e: any) {
      return rejectWithValue(e?.code || e?.message || 'Signup failed');
    }
  }
);

export const logoutUser = createAsyncThunk<void, void>(
  'auth/logoutUser',
  async () => {
    await signOut(auth);
  }
);

export const startAuthListener = createAsyncThunk<void, void>(
  'auth/startAuthListener',
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        dispatch(setUser(toUser(fbUser)));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setHydrated(true));
    });
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    setHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Signup failed';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { setUser, setHydrated } = authSlice.actions;
export default authSlice.reducer;
