import { createSlice } from "@reduxjs/toolkit";

const initialState = { active: false };

const cardActiveSlice = createSlice({
  name: "cardActive",
  initialState,
  reducers: {
    makeInactive(state) {
      state.active = false;
    },
    changeActive(state) {
      state.active = !state.active;
    },
  },
});

export const { makeInactive, changeActive } = cardActiveSlice.actions;
export default cardActiveSlice;
