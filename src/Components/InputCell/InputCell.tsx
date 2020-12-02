import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../constants";
import { changeElementValue } from "../../redux/actions";
import { StateObject } from "../../types";
import { Cell } from "../Cell/Cell";

interface InputCellProps {
    accessID: string;
}

/**
 * Cell that accepts user-input values.
 * @param accessID: the ID the cell was created with / used to access element data in state.elements.byID
 */
export default function InputCell(props: InputCellProps) {
    const dispatch = useDispatch();
    const element = useSelector((state: StateObject) => {
        return { ...state.elements.byID[props.accessID] };
    });
    const viewMode = useSelector((state: StateObject) => {
        return state.application.viewMode;
    });

    const handleValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeElementValue(element.accessID, event.target.value));
        },
        [dispatch, element.accessID]
    );

    const getCellValue = () => {
        if (viewMode === ViewModes.formulas) return "";
        return element.value;
    };
    
    return (
        <Cell
            id={element.userAssignedID}
            value={getCellValue()}
            handleValueChange={handleValueChange}
            readonly={viewMode === ViewModes.formulas}
        />
    );
}
