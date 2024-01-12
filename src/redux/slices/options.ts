import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  season: number;
  api: string;
  lang: string;
  seasonInfo: any;
} = {
  season: 1,
  api: "8stream",
  lang: "",
  seasonInfo: [],
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
    setSeasonInfo: (state, action) => {
      state.seasonInfo = action.payload;
    },
  },
});

export const { setSeason, setApi, setLang, setSeasonInfo } =
  optionsSlice.actions;

export default optionsSlice.reducer;
