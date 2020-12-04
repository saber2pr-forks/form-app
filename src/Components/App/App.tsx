import React from "react";
import "./App.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addElement, changeViewMode } from "../../redux/actions";
import { StateObject } from "../../redux/store";
import { ElementTypes, ViewModes } from "../../constants";
import InputCell from "../InputCell/InputCell";
import DisplayCell from "../DisplayCell/DisplayCell";

// initialize parser object
var FormulaParser = require("hot-formula-parser").Parser;
export const SUPPORTED_FORMULAS = require("hot-formula-parser").SUPPORTED_FORMULAS;
export var parser = new FormulaParser();

interface FormProps {}

function Form(props: FormProps) {
    const dispatch = useDispatch();
    const elementsByID = useSelector((state: StateObject) => {
        return state.elements.byID;
    }, shallowEqual);
    const allIDs = useSelector((state: StateObject) => {
        return state.elements.allIDs;
    }, shallowEqual);
    const viewMode = useSelector((state: StateObject) => {
        return state.application.viewMode;
    });

    // these are temporary for testing
    const handleAddInputCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(addElement(ElementTypes.inputCell));
    };
    const handleAddDisplayCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(addElement(ElementTypes.displayCell));
    };
    const handleToggleFormulaViewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (viewMode === ViewModes.formulas) {
            dispatch(changeViewMode(ViewModes.values));
        } else {
            dispatch(changeViewMode(ViewModes.formulas));
        }
    };

    const elements = allIDs.map((id, index) => {
        switch (elementsByID[id].elementType) {
            case ElementTypes.inputCell:
                return <InputCell key={index} accessID={id} />;
            case ElementTypes.displayCell:
                return <DisplayCell key={index} accessID={id} />;
            default:
                return "Error"; // shouldn't ever get here
        }
    });

    return (
        <div>
            <h1>{viewMode === ViewModes.formulas ? "Formula" : "Value"} Mode</h1>
            <button onClick={handleAddInputCellClick}>Add Input Cell</button>
            <button onClick={handleAddDisplayCellClick}>Add Display Cell</button>
            <button onClick={handleToggleFormulaViewClick}>Toggle Formula View</button>
            {elements}
        </div>
    );
}

function App() {
    return (
        <div>
            <Form />
        </div>
    );
}

export default App;
