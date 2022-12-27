import { createSlice } from "@reduxjs/toolkit";

const initialState = { userBox: false, folderUpload: false };

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    changeUserBoxState(state) {
      state.userBox = !state.userBox;
    },
    closeUserBox(state) {
      state.userBox = false;
    },
    openFolderUpload(state) {
      state.folderUpload = true;
    },
    closeFolderUpload(state) {
      state.folderUpload = false;
    },
  },
});

export const {
  changeUserBoxState,
  closeUserBox,
  openFolderUpload,
  closeFolderUpload,
} = popupSlice.actions;

export default popupSlice;
