import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./userData";

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
