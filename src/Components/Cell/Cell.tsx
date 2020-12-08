import React, { useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ViewModes } from "../../constants";
import { RootState } from "../../redux/store";
import stylesSlice from "../../redux/stylesSlice";
import Draggable from "../Draggable/Draggable";
import "./Cell.css";
interface CellProps {
    id: string;
    value: string;
    handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    readonly: boolean;
    autocomplete: boolean;
    children?: JSX.Element[] | JSX.Element;
}

/**
 * Base Cell component used in other cell types.
 * @param props
 */
export function Cell(props: CellProps) {
    const { id, value, handleValueChange, readonly, autocomplete, children } = props;
    const dispatch = useDispatch();
    const style = useSelector((state: RootState) => {
        return { ...state.styles.elements[id] }; // spread here to assure a new reference so that shallowEqual doesn't short circuit to true
    }, shallowEqual);
    const viewMode = useSelector((state: RootState) => {
        return state.application.viewMode;
    });

    const [position, setPosition] = useState(style.position);

    const moveCell = useCallback(
        (x: number, y: number) => {
            setPosition({ x: x, y: y });
        },
        [setPosition]
    );

    const updateCellPosition = useCallback(
        (x: number, y: number) => {
            dispatch(stylesSlice.actions.elementMoved({ id: id, x: x, y: y }));
        },
        [dispatch, id]
    );

    return (
        <div
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
            }}
        >
            <Draggable
                moveHandler={moveCell}
                dropHandler={updateCellPosition}
                active={viewMode === ViewModes.move}
            >
                <input
                    id={id}
                    type="text"
                    onChange={handleValueChange}
                    value={value}
                    readOnly={readonly}
                    autoComplete={autocomplete ? "on" : "off"}
                    style={{
                        cursor: 'inherit'
                    }}
                />
            </Draggable>
            {children}
        </div>
    );
}
