import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userBox: false,
  folderUpload: false,
  problemUpload: "1",
};

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
    openProblemUpload(state, action) {
      state.problemUpload = action.payload; //모든 폴더의 problemUpload가 모두 켜지는 현상 때문에 구분할 필요가 생겼고 그에 대한 해결법
    },
    closeProblemUpload(state) {
      state.problemUpload = "1";
    },
  },
});

export const {
  changeUserBoxState,
  closeUserBox,
  openFolderUpload,
  closeFolderUpload,
  openProblemUpload,
  closeProblemUpload,
} = popupSlice.actions;

export default popupSlice;
