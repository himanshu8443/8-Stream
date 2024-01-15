import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  season: number;
  api: string;
  seasonInfo: any;
} = {
  season: 1,
  api: "8stream",
  seasonInfo: [
    {
      lang: [],
    },
  ],
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
    setSeasonInfo: (state, action) => {
      state.seasonInfo = action.payload;
    },
  },
});

export const { setSeason, setApi, setSeasonInfo } = optionsSlice.actions;

export default optionsSlice.reducer;
