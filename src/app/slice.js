import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cc: "UAH",
  exchangedate: "",
  r030: 3242,
  rate: 0,
  txt: "",
};

export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    addCurrency: (state, actions) => {
      state.cc = actions.payload.valute.cc;
      state.exchangedate = actions.payload.valute.exchangedate;
      state.r030 = actions.payload.valute.r030;
      state.rate = actions.payload.valute.rate;
      state.txt = actions.payload.valute.txt;
    },
  },
});

export const { addCurrency } = currencySlice.actions;

export default currencySlice.reducer;
