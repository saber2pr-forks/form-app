import React from "react";
import "./App.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ElementTypes, ViewModes } from "../../constants";
import InputCell from "../InputCell/InputCell";
import DisplayCell from "../DisplayCell/DisplayCell";
import { RootState } from "../../redux/store";
import dataSlice from "../../redux/dataSlice";
import applicationSlice from "../../redux/applicationSlice";

// initialize parser object
var FormulaParser = require("hot-formula-parser").Parser;
export const SUPPORTED_FORMULAS = require("hot-formula-parser").SUPPORTED_FORMULAS;
export var parser = new FormulaParser();

function Form(props: {}) {
    const dispatch = useDispatch();
    const elementsByID = useSelector((state: RootState) => {
        return state.data.elements;
    }, shallowEqual);
    const allIDs = useSelector((state: RootState) => {
        return state.data.ids;
    }, shallowEqual);
    const viewMode = useSelector((state: RootState) => {
        return state.application.viewMode;
    });

    // these are temporary for testing
    const handleAddInputCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(
            dataSlice.actions.elementAdded({
                id: "inputCell" + allIDs.length,
                elementType: ElementTypes.inputCell,
            })
        );
    };
    const handleAddDisplayCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(
            dataSlice.actions.elementAdded({
                id: "displayCell" + allIDs.length,
                elementType: ElementTypes.displayCell,
            })
        );
    };
    const handleToggleViewModeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (viewMode === ViewModes.formulas) {
            dispatch(applicationSlice.actions.viewModeChanged({ newMode: ViewModes.values }));
        } else if (viewMode === ViewModes.values) {
            dispatch(applicationSlice.actions.viewModeChanged({ newMode: ViewModes.move }));
        } else {
            dispatch(applicationSlice.actions.viewModeChanged({ newMode: ViewModes.formulas }));
        }
    };

    const elements = allIDs.map((id, index) => {
        switch (elementsByID[id].elementType) {
            case ElementTypes.inputCell:
                return <InputCell key={index} id={id} />;
            case ElementTypes.displayCell:
                return <DisplayCell key={index} id={id} />;
            default:
                return "Error"; // shouldn't ever get here
        }
    });

    return (
        <div>
            <h1>{viewMode}</h1>
            <button onClick={handleAddInputCellClick}>Add Input Cell</button>
            <button onClick={handleAddDisplayCellClick}>Add Display Cell</button>
            <button onClick={handleToggleViewModeClick}>Change View Mode</button>
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
