import { configureStore } from "@reduxjs/toolkit";
import contactsListSlice from "../redux/contactsList";

export const store = configureStore({
  reducer: {
    list: contactsListSlice.reducer,
  },
});
