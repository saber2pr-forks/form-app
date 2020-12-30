import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import stylesSlice from "./stylesSlice";
import applicationSlice from "./applicationSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
        styles: stylesSlice.reducer,
        application: applicationSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
