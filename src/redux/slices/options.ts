import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
  name: "options",
  initialState: {
    season: 1,
    api: "8stream",
    lang: "",
    langOptions: [],
  },
  reducers: {
    setSeason: (state, action) => {
      state.season = action.payload;
    },
    setApi: (state, action) => {
      state.api = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setLangOptions: (state, action) => {
      state.langOptions = action.payload;
    },
  },
});

export const { setSeason, setApi, setLang, setLangOptions } =
  optionsSlice.actions;

export default optionsSlice.reducer;
