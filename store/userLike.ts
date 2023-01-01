import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Like from "../model/like";

const initialState = { list: [] };

const userLikeSlice = createSlice({
  name: "userLike",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserLikeList.pending, (state) => {
      // 나중에 로딩 추가 가능
      // state.list = [];
    });

    builder.addCase(loadUserLikeList.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.list = [];
      } else {
        state.list = action.payload.result.sort(
          (a: Like, b: Like) => b.date - a.date
        );
      }
    });
  },
});

export const loadUserLikeList = createAsyncThunk(
  "userLikeSlice/loadUserLikeList",
  async () => {
    const response = await fetch("/api/user/like");
    const data = await response.json();
    return data;
  }
);

export default userLikeSlice;
