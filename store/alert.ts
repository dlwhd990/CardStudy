import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", show: false };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.message = action.payload;
      state.show = true;
    },
    closeAlert(state) {
      state.show = false;
      state.message = "";
    },
  },
});

export const { showAlert, closeAlert } = alertSlice.actions;
export default alertSlice;
