import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from './articlesSlice';

const rootReducer = combineReducers({
  articlesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
