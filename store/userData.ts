import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  picture: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData(state, action) {
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },
    removeUserData(state) {
      state.name = "";
      state.picture = "";
    },
  },
});

export const { setUserData, removeUserData } = userDataSlice.actions;
export default userDataSlice;
