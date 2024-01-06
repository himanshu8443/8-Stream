import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  epModal: boolean;
  player: boolean;
} = {
  epModal: false,
  player: false,
};

const epModalSlice = createSlice({
  name: "epModal",
  initialState,
  reducers: {
    toggleEpModal: (state, action) => {
      state.epModal = action.payload;
    },
    togglePlayer: (state, action) => {
      state.player = action.payload;
    },
  },
});

export const { toggleEpModal, togglePlayer } = epModalSlice.actions;

export default epModalSlice.reducer;
