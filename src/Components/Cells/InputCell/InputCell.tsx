import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../../constants";
import dataSlice from "../../../redux/dataSlice";
import { RootState } from "../../../redux/store";
import { Cell } from "../Cell/Cell";

interface InputCellProps {
    id: string;
}

/**
 * Cell that accepts user-input values.
 * @param id: the ID the cell was created with / used to access element data in state.data.elements
 */
export default function InputCell(props: InputCellProps) {
    const dispatch = useDispatch();
    const element = useSelector((state: RootState) => {
        return { ...state.data.elements[props.id] }; // spread here to assure a new reference so that shallowEqual doesn't short circuit to true
    }, shallowEqual);
    const viewMode = useSelector((state: RootState) => {
        return state.application.viewMode;
    });

    const handleValueChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(dataSlice.actions.valueChanged({ id: props.id, value: event.target.value }));
        },
        [dispatch, props.id]
    );

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation(); // don't let this bubble so that you must click the edges to move a cell
      }

    const getCellValue = () => {
        if (viewMode === ViewModes.edit) return "";
        return element.value;
    };

    return (
        <Cell
            id={props.id}
            value={getCellValue()}
            handleValueChange={handleValueChange}
            handleClick={handleInputClick}
            readonly={viewMode === ViewModes.edit}
            autocomplete={false}
            contextOptions={[]}
        >
        </Cell>
    );
}
