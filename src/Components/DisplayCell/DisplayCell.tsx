import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../constants";
import { parser, SUPPORTED_FORMULAS } from "../App/App";
import { Cell } from "../Cell/Cell";
import { stringIsNumber } from "../../utils/util";
import Dropdown from "../Dropdown/Dropdown";
import { RootState } from "../../redux/store";
import dataSlice from "../../redux/dataSlice";

interface DisplayCellProps {
    id: string;
}

/**
 * Display cell for rendering the results of formulas.
 */
export default function DisplayCell(props: DisplayCellProps) {
    const dispatch = useDispatch();
    const element = useSelector((state: RootState) => {
        return { ...state.data.elements[props.id] };
    });
    const viewMode = useSelector((state: RootState) => {
        return state.application.viewMode;
    });
    const elementsByID = useSelector((state: RootState) => {
        return { ...state.data.elements };
    });

    const uppercaseFormula = element.formula.toUpperCase().split("(").slice(-1)[0]; // create const for performance
    const dropdownOptions =
        uppercaseFormula === ""
            ? []
            : SUPPORTED_FORMULAS.filter(
                  (formula: string) => formula.includes(uppercaseFormula) // autocomplete on type
              )
                  .sort((a: string, b: string) => {
                      return a.indexOf(uppercaseFormula) - b.indexOf(uppercaseFormula);
                  })
                  .map((formula: string) => {
                      return { text: formula, value: formula };
                  });

    const handleValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                dataSlice.actions.formulaChanged({ id: element.id, formula: event.target.value })
            );
        },
        [dispatch, element.id]
    );

    const handleDropdownClick = useCallback(
        (selection: string) => {
            dispatch(
                dataSlice.actions.formulaChanged({
                    id: element.id,
                    formula: element.formula + selection + "(",
                })
            );
        },
        [dispatch, element.id, element.formula]
    );

    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
        if ((event.key === "Enter" || event.key === "Tab") && dropdownOptions.length > 0) {
            const appendToFront = !element.formula.includes("(")
                ? ""
                : element.formula.split("(").slice(0, -1).join("(") + // replace everything after last open parentheses
                  "("; // add parenthesis back after removal during split

            dispatch(
                dataSlice.actions.formulaChanged({
                    id: element.id,
                    formula: appendToFront + dropdownOptions[0].text + "(",
                })
            );
        }
    };

    const getCellValue = () => {
        if (viewMode === ViewModes.formulas) {
            return element.formula;
        } else if (viewMode === ViewModes.values) {
            // find instances of referenced cells and replace their values
            let formula = element.formula;
            const matchedIDs = formula.match(/{.+?}/g);
            if (matchedIDs !== null) {
                for (let id of matchedIDs) {
                    // check that id exists before lookup
                    let valueToInsert;
                    if (elementsByID[id.slice(1, -1)] !== undefined) {
                        // make sure that the id exists before adding it
                        valueToInsert = elementsByID[id.slice(1, -1)].value; // slice off { and }
                    } else {
                        return "#ERROR";
                    }

                    // check the type of the value because all are stored as strings
                    // but quotes must be added to non number values
                    if (stringIsNumber(valueToInsert)) {
                        formula = formula.replace(id, valueToInsert);
                    } else if (!stringIsNumber(valueToInsert)) {
                        formula = formula.replace(id, '"' + valueToInsert + '"'); // add quotes for string inputs
                    }
                }
            }
            const calc = parser.parse(formula);
            if (calc.error !== null) return calc.error;
            return calc.result;
        } else {
            return "";
        }
    };

    return (
        <div onKeyPress={handleKeyPress}>
            <Cell
                id={element.id}
                value={getCellValue()}
                handleValueChange={handleValueChange}
                readonly={viewMode === ViewModes.values}
                autocomplete={false}
            >
                {viewMode === ViewModes.formulas ? (
                    <Dropdown
                        key={"dropdown" + element.id}
                        onSelection={handleDropdownClick}
                        options={dropdownOptions}
                    />
                ) : undefined}
            </Cell>
        </div>
    );
}
