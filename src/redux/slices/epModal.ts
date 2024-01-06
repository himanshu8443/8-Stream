import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  epModal: boolean;
} = {
  epModal: false,
};

const epModalSlice = createSlice({
  name: "epModal",
  initialState,
  reducers: {
    toggleEpModal: (state, action) => {
      state.epModal = action.payload;
    },
  },
});

export const { toggleEpModal } = epModalSlice.actions;

export default epModalSlice.reducer;
