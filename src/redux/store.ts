import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { elementsReducer, applicationReducer } from "./reducers";
import { StateObject } from "../types";
import { ViewModes } from "../constants";

export const initialState: StateObject = {
    elements: {
        byID: {},
        allIDs: [],
    },
    application: {
        viewMode: ViewModes.values,
    },
};

const rootReducer = combineReducers({
    elements: elementsReducer,
    application: applicationReducer,
});

export const store = createStore(rootReducer, initialState, composeWithDevTools());
