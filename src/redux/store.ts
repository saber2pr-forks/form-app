import { configureStore } from "@reduxjs/toolkit";
import { ViewModes } from "../constants";
import dataSlice from "./dataSlice";
import stylesSlice from "./stylesSlice";
import applicationSlice from "./applicationSlice";

const initialState = {
    data: {
        elements: {},
        ids: [],
    },
    styles: {
        elements: {},
    },
    application: {
        viewMode: ViewModes.values,
    },
};

export const store = configureStore({
    preloadedState: initialState,
    reducer: {
        data: dataSlice.reducer,
        styles: stylesSlice.reducer,
        application: applicationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
