import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "./CategorySlice";
import searchSlice from "./searchSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    //name of Slice : slice
    theme: themeSlice,
    catg: CategorySlice,
    srch: searchSlice,
  },
});

export default store;
