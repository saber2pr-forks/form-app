import React from "react";
import './Cell.css'

interface CellProps {
    id: string;
    value: string;
    handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    readonly: boolean;
    autocomplete: boolean;
}

/**
 * Base Cell component used in other cell types.
 * @param props 
 */
export function Cell(props: CellProps) {
    return (
        <div>
            <input
                id={props.id}
                type="text"
                onChange={props.handleValueChange}
                value={props.value}
                readOnly={props.readonly}
                autoComplete={props.autocomplete ? 'on' : 'off'}
            />
        </div>
    );
}

