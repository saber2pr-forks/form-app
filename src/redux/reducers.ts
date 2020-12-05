import {
    ElementsActions,
    CHANGE_ELEMENT_VALUE,
    ADD_ELEMENT,
    ApplicationActions,
    CHANGE_VIEW_MODE,
    CHANGE_ELEMENT_FORMULA,
} from "./actionTypes";
import { initialState } from "./store";

export function elementsReducer(state = initialState.elements, action: ElementsActions) {
    let newElementsObject = { ...state.byID };
    let newIDArray = [...state.allIDs];
    switch (action.type) {
        case CHANGE_ELEMENT_VALUE:
            newElementsObject[action.payload.id].value = action.payload.value;
            return { byID: newElementsObject, allIDs: state.allIDs };

        case CHANGE_ELEMENT_FORMULA:
            newElementsObject[action.payload.id].formula = action.payload.formula;
            return { byID: newElementsObject, allIDs: state.allIDs };

        case ADD_ELEMENT:
            const newID = "element" + newIDArray.length;

            newElementsObject[newID] = {
                elementType: action.payload.elementType,
                accessID: newID,
                userAssignedID: newID,
                value: "",
                formula: "",
            };
            newIDArray.push(newID);

            return { byID: newElementsObject, allIDs: newIDArray };

        default:
            return state;
    }
}

export function applicationReducer(state = initialState.application, action: ApplicationActions) {
    let newApplicationObject = { ...state };
    switch (action.type) {
        case CHANGE_VIEW_MODE:
            newApplicationObject.viewMode = action.payload.viewMode;
            return newApplicationObject;
        default:
            return newApplicationObject;
    }
}
