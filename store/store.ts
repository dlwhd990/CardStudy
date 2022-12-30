import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./alert";
import cardActiveSlice from "./cardActive";
import popupSlice from "./popup";
import userDataSlice from "./userData";
import userFolderSlice from "./userFolder";
import userObjectionSlice from "./userObjection";
import userProblemSlice from "./userProblem";

export const store = configureStore({
  reducer: {
    userData: userDataSlice.reducer,
    popup: popupSlice.reducer,
    userFolder: userFolderSlice.reducer,
    userProblem: userProblemSlice.reducer,
    userObjection: userObjectionSlice.reducer,
    cardActive: cardActiveSlice.reducer,
    alert: alertSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
