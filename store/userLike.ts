import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
        console.log(state.list);
        state.list = action.payload.result;
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
