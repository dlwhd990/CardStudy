import { configureStore } from "@reduxjs/toolkit";
import cardActiveSlice from "./cardActive";
import popupSlice from "./popup";
import userDataSlice from "./userData";
import userFolderSlice from "./userFolder";
import userProblemSlice from "./userProblem";

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    popup: popupSlice.reducer,
    userFolder: userFolderSlice.reducer,
    userProblem: userProblemSlice.reducer,
    cardActive: cardActiveSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
