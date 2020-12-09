import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../constants";
import dataSlice from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
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

    const getCellValue = () => {
        if (viewMode === ViewModes.formulas) return "";
        return element.value;
    };

    return (
        <Cell
            id={props.id}
            value={getCellValue()}
            handleValueChange={handleValueChange}
            readonly={viewMode === ViewModes.formulas}
            autocomplete={false}
            contextOptions={[
                [
                    {
                        text: "Change ID",
                        action: () => {
                            dispatch(dataSlice.actions.idChanged({oldId: props.id, newId: 'newbie'}));
                        },
                    },
                ],
            ]}
        ></Cell>
    );
}
