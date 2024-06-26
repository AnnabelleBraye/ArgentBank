import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserType from '../models/user';
import { updateUser, getUser } from '../api';
import { RootState } from './store';

type UserState = {
  user: UserType,
  userToken: string | null,
  isLoading: boolean,
  isError: boolean,
};

const initialState: UserState = {
  user: {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  },
  userToken: sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token') || '') : null,
  isLoading: false,
  isError: false
}

export const editProfileThunk = createAsyncThunk(
  "profile",
  async ({ token, firstName, lastName }: { token: string, firstName: string, lastName: string}) => {
    const userData = {
      token : token,
      firstName : firstName,
      lastName : lastName
    }
    const res = await updateUser(userData)

    return res.body 
})

export const getProfileThunk = createAsyncThunk<
  string, 
  {token: string},
  {state: RootState}
>(
  "profile",
  async ({token}: {token: string}) => {
    const res = await getUser(token)

    return res.body;
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem('token', JSON.stringify(action.payload));
      state.userToken = action.payload
    },
    logout: (state) => {
      sessionStorage.removeItem('token');
      state.userToken = null;
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.email = '';
      state.user.password = '';
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(editProfileThunk.fulfilled, (state,action) => {
        state.isError = false
        state.isLoading = false
        console.log(action.payload);
        state.user.firstName = action.payload.firstName;
        state.user.lastName = action.payload.lastName;
        state.user.email = action.payload.email;
    })
    .addCase(editProfileThunk.pending,(state)=>{
        state.isError = false
        state.isLoading = true
    })
    .addCase(editProfileThunk.rejected,(state)=>{
        state.isError = true
        state.isLoading = false
    })
  }
})

export const { logout, setToken } = userSlice.actions;

export default userSlice.reducer;
