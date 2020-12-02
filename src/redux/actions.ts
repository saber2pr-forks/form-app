import {
    CHANGE_ELEMENT_VALUE,
    ADD_ELEMENT,
    changeElementValueAction,
    addElementAction,
    changeViewModeAction,
    CHANGE_VIEW_MODE,
    changeElementFormulaAction,
    CHANGE_ELEMENT_FORMULA,
} from "./actionTypes";

export function changeElementValue(id: string, value: string): changeElementValueAction {
    return {
        type: CHANGE_ELEMENT_VALUE,
        payload: {
            id: id,
            value: value,
        },
    };
}

export function changeElementFormula(id: string, formula: string): changeElementFormulaAction {
    return {
        type: CHANGE_ELEMENT_FORMULA,
        payload: {
            id: id,
            formula: formula
        }
    }
}

export function addElement(elementType: string): addElementAction {
    return {
        type: ADD_ELEMENT,
        payload: {
            elementType: elementType,
        },
    };
}

export function changeViewMode(viewMode: string): changeViewModeAction {
    return {
        type: CHANGE_VIEW_MODE,
        payload: {
            viewMode: viewMode,
        }
    }
}
