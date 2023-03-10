import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Folder from "../model/folder";

const initialState = { list: [] };

const userFolderSlice = createSlice({
  name: "userFolder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserFolderList.pending, (state) => {
      // 나중에 로딩 추가 가능
      // state.list = [];
    });

    builder.addCase(loadUserFolderList.fulfilled, (state, action) => {
      if (!action.payload.success) {
        state.list = [];
      } else {
        state.list = action.payload.result.sort(
          (a: Folder, b: Folder) => b.date - a.date
        );
      }
    });
  },
});

export const loadUserFolderList = createAsyncThunk(
  "userFolderSlice/loadUserFolderList",
  async () => {
    const response = await fetch("/api/user/folder");
    const data = await response.json();
    return data;
  }
);

export default userFolderSlice;
