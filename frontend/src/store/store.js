import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slice/customerSlice";
import userSlice from "./slice/userSlice";

const reducer = {
  customer: customerSlice,
  user: userSlice,
};

export const store = configureStore({ reducer });
