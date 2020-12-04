import { combineReducers, createStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { elementsReducer, applicationReducer } from "./reducers";
import { ViewModes } from "../constants";


export interface ElementObject {
    accessID: string;
    elementType: string;
    userAssignedID: string;
    value: string;
    formula: string;
}
export interface ElementsDictionary {
    [index: string]: ElementObject;
}

export interface StateObject {
    elements: {
        byID: ElementsDictionary;
        allIDs: string[];
    };
    application: {
        viewMode: string;
    };
}

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
