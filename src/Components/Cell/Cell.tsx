import React from "react";

interface CellProps {
    id: string;
    value: string;
    handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
    readonly: boolean;
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
            />
        </div>
    );
}

