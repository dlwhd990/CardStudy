import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Folder from "../model/folder";

const initialState = { list: [] };

const userFolderSlice = createSlice({
  name: "userFolder",
  initialState,
  reducers: {
    updateUserFolderList(state, action) {
      const temp = action.payload;
      temp.sort((a: Folder, b: Folder) => b.date - a.date);
      state.list = temp;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadUserFolderList.pending, (state) => {
      console.log("pending"); // 나중에 로딩 추가 가능
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
  async (req, res) => {
    const response = await fetch("/api/user/folder");
    const data = await response.json();
    return data;
  }
);

export const { updateUserFolderList } = userFolderSlice.actions;
export default userFolderSlice;
