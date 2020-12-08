import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ElementData {
    id: string;
    elementType: string;
    value: string;
    formula: string;
}

interface State {
    elements: { [id: string]: ElementData };
    ids: string[];
}

const initialState: State = {
    elements: {},
    ids: [],
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        elementAdded(state, action: PayloadAction<{ id: string; elementType: string }>) {
            state.elements[action.payload.id] = {
                id: action.payload.id,
                elementType: action.payload.elementType,
                value: "",
                formula: "",
            };
            state.ids.push(action.payload.id);
        },
        valueChanged(state, action: PayloadAction<{ id: string; value: string }>) {
            state.elements[action.payload.id].value = action.payload.value;
        },
        formulaChanged(state, action) {
            state.elements[action.payload.id].formula = action.payload.formula;
        },
        idChanged(state, action: PayloadAction<{ oldId: string; newId: string }>) {
            state.elements[action.payload.newId] = state.elements[action.payload.oldId];
            delete state.elements[action.payload.oldId];
            state.ids.push(action.payload.newId);
            state.ids.splice(state.ids.indexOf(action.payload.oldId), 1);
        },
    },
});

export default dataSlice;
