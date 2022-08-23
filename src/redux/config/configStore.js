import { configureStore } from '@reduxjs/toolkit';
import tokenSlice from "../modules/tokenSlice";

const store = configureStore({
  reducer: {
    tokenSlice
  },
})

export default store;
