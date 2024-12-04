import { configureStore } from '@reduxjs/toolkit';
import interviewReducer from './interviewSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      interview: interviewReducer,
    },
  })
}