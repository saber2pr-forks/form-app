export const CHANGE_ELEMENT_VALUE = "element/changeValue";
export const CHANGE_ELEMENT_FORMULA = "element/changeFormula";
export const ADD_ELEMENT = "form/addElement";

export interface changeElementValueAction {
    type: typeof CHANGE_ELEMENT_VALUE;
    payload: {
        id: string;
        value: string;
    };
}

export interface changeElementFormulaAction {
    type: typeof CHANGE_ELEMENT_FORMULA;
    payload: {
        id: string;
        formula: string;
    };
}

export interface addElementAction {
    type: typeof ADD_ELEMENT;
    payload: {
        elementType: string;
    };
}

export type ElementsActions = changeElementValueAction | changeElementFormulaAction | addElementAction;

export const CHANGE_VIEW_MODE = "application/changeViewMode";

export interface changeViewModeAction {
    type: typeof CHANGE_VIEW_MODE;
    payload: {
        viewMode: string;
    };
}

export type ApplicationActions = changeViewModeAction;
