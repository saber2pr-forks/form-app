import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

interface ElementStyle {
    position: {
        x: number;
        y: number;
    };
    textColor?: string;
    backgroundColor?: string;
    fontSize?: number;
    fontFamily?: string;
    borderThickness?: number;
    borderColor?: string;
    borderRadius?: number;
}

interface State {
    elements: { [id: string]: ElementStyle };
}

const initialState: State = {
    elements: {},
};

const stylesSlice = createSlice({
    name: "styles",
    initialState: initialState,
    reducers: {
        elementMoved(state, action: PayloadAction<{ id: string; x: number; y: number }>) {
            state.elements[action.payload.id].position = {
                x: action.payload.x,
                y: action.payload.y,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(dataSlice.actions.elementAdded, (state, action) => {
            state.elements[action.payload.id] = { position: { x: 200, y: 200 } }; // default position
        });
    },
});

export default stylesSlice;
