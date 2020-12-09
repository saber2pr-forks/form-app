import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ElementTypes, ViewModes } from "../../constants";
import applicationSlice from "../../redux/applicationSlice";
import dataSlice from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
import ContextMenu from "../ContextMenu/ContextMenu";
import DisplayCell from "../DisplayCell/DisplayCell";
import InputCell from "../InputCell/InputCell";
import "./App.css";

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
        <>
            <h1>{viewMode}</h1>
            <button onClick={handleAddInputCellClick}>Add Input Cell</button>
            <button onClick={handleAddDisplayCellClick}>Add Display Cell</button>
            {elements}
        </>
    );
}

function App() {
    const dispatch = useDispatch();

    return (
        <>
            <ContextMenu
                options={[
                    [
                        {
                            text: "Value Mode",
                            action: () => {
                                dispatch(
                                    applicationSlice.actions.viewModeChanged({
                                        newMode: ViewModes.values,
                                    })
                                );
                            },
                        },
                        {
                            text: "Formula Mode",
                            action: () => {
                                dispatch(
                                    applicationSlice.actions.viewModeChanged({
                                        newMode: ViewModes.formulas,
                                    })
                                );
                            },
                        },
                        {
                            text: "Move Mode",
                            action: () => {
                                dispatch(
                                    applicationSlice.actions.viewModeChanged({
                                        newMode: ViewModes.move,
                                    })
                                );
                            },
                        },
                    ],
                    [
                        {
                            text: "Log hello",
                            action: () => {
                                console.log("hello");
                            },
                        },
                    ],
                ]}
            >
                <Form />
            </ContextMenu>
        </>
    );
}

export default App;
