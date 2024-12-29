import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from '../../services/api/auth/AuthService';
import { AxiosHttpClient } from '../../services/AxiosRouter';
import { AuthState } from '../../interfaces/auth.types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const httpClient = new AxiosHttpClient("http://localhost:3000/api", { withCredentials: true });


export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const authService = new AuthService(httpClient);
      const response = await authService.login(credentials);
      return response.user;
    } catch (error) {
      return rejectWithValue(error|| 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;