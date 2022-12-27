import { configureStore } from "@reduxjs/toolkit";
import userBoxSlice from "./userBox";
import userDataSlice from "./userData";

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    userBox: userBoxSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
