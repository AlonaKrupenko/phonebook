import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactsList: [],
};

export const contactsListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    add: (state, action) => {
      return {
        ...state,
        contactsList: [...state.contactsList, action.payload],
      };
    },

    edit: (state, action) => {
      const elementIndex = state.contactsList.findIndex((el) => {
        return el.id === action.payload.id;
      });

      const updatedList = [
        ...state.contactsList.slice(0, elementIndex),
        action.payload,
        ...state.contactsList.slice(elementIndex + 1),
      ];
      return {
        ...state,
        contactsList: updatedList,
      };
    },

    remove: (state, action) => {
      const updatedList = state.contactsList.filter((el) => {
        return el.id !== action.payload.id;
      });

      return {
        ...state,
        contactsList: updatedList,
      };
    },
  },
});

export default contactsListSlice;
