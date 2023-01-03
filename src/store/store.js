import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counterSlice";
import postSlice from "./slice/postSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postSlice,
    users: userSlice,
  },
});
