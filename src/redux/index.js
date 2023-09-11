import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from './articlesSlice';
import { userReducer } from './usersSlice';

const rootReducer = combineReducers({
  articlesReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
