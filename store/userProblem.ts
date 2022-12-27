import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Problem from "../model/problem";

const initialState = { list: [] };

const userProblemSlice = createSlice({
  name: "userProblem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadUserProblemList.pending, (state, action) => {
      console.log("pending userProblem");
    });

    builder.addCase(loadUserProblemList.fulfilled, (state, action) => {
      if (action.payload.success) {
        state.list = action.payload.result.sort(
          (a: Problem, b: Problem) => b.date - a.date
        );
      }
    });
  },
});

export const loadUserProblemList = createAsyncThunk(
  "userProblemSlice/loadUserProblemList",
  async (req, res) => {
    const response = await fetch("/api/user/problem");
    const body = response.json();
    return body;
  }
);

export default userProblemSlice;
