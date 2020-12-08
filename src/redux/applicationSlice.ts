import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ViewModes } from "../constants";

interface State {
    viewMode: string;
}

const initialState: State = {
    viewMode: ViewModes.values,
};

const applicationSlice = createSlice({
    name: "application",
    initialState: initialState,
    reducers: {
        viewModeChanged(state, action: PayloadAction<{ newMode: string }>) {
            state.viewMode = action.payload.newMode;
        },
    },
});

export default applicationSlice;
