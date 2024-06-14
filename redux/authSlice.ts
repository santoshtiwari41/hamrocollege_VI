// redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      AsyncStorage.removeItem('authToken');
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
