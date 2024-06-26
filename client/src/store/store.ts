import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.tsx';
import authReducer from './authSlice.tsx';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // [userApi.reducerPath]: userApi.reducer, // Ajoutez le reducer généré par RTK Query à votre store
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']