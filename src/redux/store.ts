import { configureStore } from "@reduxjs/toolkit";
import options from "./slices/options";
import epModal from "./slices/epModal";

export const store = configureStore({
  reducer: {
    options,
    epModal,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
