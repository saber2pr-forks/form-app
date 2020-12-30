import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewModes } from "../constants";
import dataSlice from "./dataSlice";

interface State {
  viewMode: ViewModes;
  focusedId: string | null;
}

const initialState: State = {
  viewMode: ViewModes.edit,
  focusedId: null,
};

const applicationSlice = createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    viewModeChanged(state, action: PayloadAction<{ newMode: ViewModes }>) {
      state.viewMode = action.payload.newMode;
    },
    focusChanged(state, action: PayloadAction<{ focusedId: string }>) {
      state.focusedId = action.payload.focusedId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dataSlice.actions.idChanged, (state, action) => {
      if (state.focusedId === action.payload.oldId) {
        // if the focused id is the one changed, update the current focus
        state.focusedId = action.payload.newId;
      }
    });
  },
});

export default applicationSlice;
