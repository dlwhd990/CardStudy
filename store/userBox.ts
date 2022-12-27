import { createSlice } from "@reduxjs/toolkit";

const initialState = { show: false };

const userBoxSlice = createSlice({
  name: "userBox",
  initialState,
  reducers: {
    changeUserBoxState(state) {
      state.show = !state.show;
    },
    closeUserBox(state) {
      state.show = false;
    },
  },
});

export const { changeUserBoxState, closeUserBox } = userBoxSlice.actions;
export default userBoxSlice;
