import { configureStore, combineReducers } from "@reduxjs/toolkit";
import products from "./reducers/productsReducers";

const appReducer = combineReducers({
    products,
});

export const store = configureStore({
  reducer: appReducer,
});