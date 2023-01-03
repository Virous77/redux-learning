import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
    },

    decerement(state) {
      if (state.count === 0) return;
      state.count -= 1;
    },

    reset(state) {
      state.count = 0;
    },

    incrementByAmount(state, action) {
      state.count += action.payload;
    },
  },
});

export const { increment, decerement, reset, incrementByAmount } =
  counterSlice.actions;

export default counterSlice.reducer;
