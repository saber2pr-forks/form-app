import React from "react";

interface DropdownProps {
    show: boolean;
    options: { text: string; value: string }[];
    onSelection(selection: string): void;
}

export default function Dropdown(props: DropdownProps) {
    // return a function to handle event but allow value to be passed in first
    const handleClick = (value: string) => {
        return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            props.onSelection(value)
        };
    };

    const choices = props.options.map((option, index) => {
        return (
            <div key={index} className="dropdown-choice" onClick={handleClick(option.value)}>
                {option.text}
            </div>
        );
    });

    return <div className={"dropdown"}>{choices}</div>;
}
