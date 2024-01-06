import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  season: number;
  episode: number;
  api: string;
  lang: number;
  langOptions: string[];
} = {
  season: 1,
  episode: 1,
  api: "8stream",
  lang: 1,
  langOptions: [],
};
const optionsSlice = createSlice({
  name: "options",
  initialState,
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
    setEpisode: (state, action) => {
      state.episode = action.payload;
    },
  },
});

export const { setSeason, setApi, setLang, setLangOptions, setEpisode } =
  optionsSlice.actions;

export default optionsSlice.reducer;
