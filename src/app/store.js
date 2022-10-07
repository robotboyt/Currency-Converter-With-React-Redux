import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../app/slice";

export const store = configureStore({
  reducer: {
    curre: currencyReducer,
  },
});
