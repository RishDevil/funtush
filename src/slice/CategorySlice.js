import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "All",
};

const categorySlice = createSlice({
  name: "cateogry",
  initialState: initialState,
  reducers: {
    setCategory: (state, action) => {
      console.log(action);
      state.category = action.payload.category;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
