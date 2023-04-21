import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setsearch: (state, action) => {
      console.log(action.payload);
      state.search = action.payload.search;
    },
  },
});

export const { setsearch } = searchSlice.actions;

export default searchSlice.reducer;
