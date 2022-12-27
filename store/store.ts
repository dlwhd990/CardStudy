import { configureStore } from "@reduxjs/toolkit";
import popupSlice from "./popup";
import userDataSlice from "./userData";
import userFolderSlice from "./userFolder";

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    popup: popupSlice.reducer,
    userFolder: userFolderSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
