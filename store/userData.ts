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
      console.log(action.payload);
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },
    removeUserData(state) {
      state.name = "";
      state.picture = "";
    },
    changeUserName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setUserData, removeUserData, changeUserName } =
  userDataSlice.actions;
export default userDataSlice;
