import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../constants";
import { changeElementFormula } from "../../redux/actions";
import { StateObject } from "../../types";
import { parser } from "../App/App";
import { Cell } from "../Cell/Cell";
import { stringIsNumber } from "../../utils/util";

interface DisplayCellProps {
    accessID: string;
}

/**
 * Display cell for rendering the results of formulas.
 */
export default function DisplayCell(props: DisplayCellProps) {
    const dispatch = useDispatch();
    const element = useSelector((state: StateObject) => {
        return { ...state.elements.byID[props.accessID] };
    });
    const viewMode = useSelector((state: StateObject) => {
        return state.application.viewMode;
    });
    const elementsByID = useSelector((state: StateObject) => {
        return { ...state.elements.byID };
    });

    const handleValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeElementFormula(element.accessID, event.target.value));
        },
        [dispatch, element.accessID]
    );

    const getCellValue = () => {
        if (viewMode === ViewModes.formulas) {
            return element.formula;
        } else if (viewMode === ViewModes.values) {
            // find instances of referenced cells and replace their values
            let formula = element.formula;
            const matchedIDs = formula.match(/{.+?}/g);
            if (matchedIDs !== null) {
                for (let id of matchedIDs) {
                    let valueToInsert = elementsByID[id.slice(1, -1)].value;

                    // check the type of the value because all are stored as strings
                    // but quotes must be added to non number values
                    if (stringIsNumber(valueToInsert)) {
                        formula = formula.replace(id, valueToInsert);
                    } else if (!stringIsNumber(valueToInsert)) {
                        formula = formula.replace(id, '"' + valueToInsert + '"'); // add quotes for string inputs
                    } else if (valueToInsert === undefined) {
                        formula = formula.replace(id, "0");
                    }
                }
            }
            const calc = parser.parse(formula);
            if (calc.error !== null) return calc.error;
            return calc.result;
        }
    };

    return (
        <div>
            <Cell
                id={element.userAssignedID}
                value={getCellValue()}
                handleValueChange={handleValueChange}
                readonly={viewMode === ViewModes.values}
            />
        </div>
    );
}
