import { configureStore } from '@reduxjs/toolkit';
import heroReducer from './features/hero/heroSlice';
// import other slice reducers...

export const store = configureStore({
  reducer: {
    hero: heroReducer,
    // add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
