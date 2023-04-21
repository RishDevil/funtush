import { createSlice } from "@reduxjs/toolkit";

const isBrowserDefaulDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const getDefaultTheme = () => {
  const localStorageTheme = localStorage.getItem("theme");
  const browserDefault = isBrowserDefaulDark() ? "dark" : "light";
  console.log(localStorageTheme + " " + browserDefault);
  return localStorageTheme || browserDefault;
};
const initialState = {
  appTheme: getDefaultTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, action) => {
      state.appTheme = state.appTheme === "dark" ? "light" : "dark";
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
