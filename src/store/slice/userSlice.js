import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = `https://jsonplaceholder.typicode.com/users`;

const initialState = [];

export const fetchUser = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const res = await axios.get(POST_URL);
    const userData = res.data.map((data) => {
      return { id: data.id, name: data.name };
    });
    return userData;
  } catch (error) {
    return error.message;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, () => {})
      .addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUser.rejected, () => {});
  },
});

export const useUser = (state) => state.users;
export default userSlice.reducer;
