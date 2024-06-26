/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../api';
import { RootState } from './store';
import { setToken } from './userSlice';

type State = {
  userToken: string | null,
  isLoading: boolean,
  isError: boolean,
  errorMessage: string | null,
};

const initialState: State = {
  userToken: null,
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const loginUserThunk = createAsyncThunk<
  string, 
  {email: string, password: string}, 
  {state: RootState}
>(
  'login', 
  async ({email, password}: {email: string, password: string}, thunkApi) => {
    try {
      const token = await userLogin({ email, password });
      thunkApi.dispatch(setToken(token));
      return token;
    } catch (err) {
      return thunkApi.rejectWithValue((err as Error).message);
    }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => { builder
    .addCase(loginUserThunk.fulfilled, (state, action) =>{
      state.isError = false
      state.isLoading = false
      state.userToken = action.payload
    })
    .addCase(loginUserThunk.pending, (state) =>{
      state.isError = false
      state.isLoading = true
    })
    .addCase(loginUserThunk.rejected, (state, action) =>{
      state.isError = true
      state.errorMessage = `${action.payload}`;
      state.isLoading = false
    })
  }
});

export default authSlice.reducer;