import "./Dropdown.css";

interface DropdownOption {
    text: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    onSelection(selection: string): void;
}

export default function Dropdown(props: DropdownProps) {
    // return a function to handle event but allow value to be passed in first
    const handleClick = (value: string) => {
        return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            props.onSelection(value);
        };
    };

    // the rendered choices
    const choices = props.options.map((option, index) => {
        return (
            <div key={index} className="dropdown-choice" onClick={handleClick(option.value)}>
                {option.text}
            </div>
        );
    });

    return <div className={props.options.length === 0 ? "hidden" : "dropdown"}>{choices}</div>;
}
