import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { list: [] };

const userObjectionSlice = createSlice({
  name: "userObjeciton",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserObjectionList.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.success) {
        state.list = action.payload.result;
      } else {
        state.list = [];
      }
    });
  },
});

export const loadUserObjectionList = createAsyncThunk(
  "userObjectionSlice/loadUserObjection",
  async () => {
    const response = await fetch("/api/user/objection");
    const data = response.json();
    return data;
  }
);

export default userObjectionSlice;
