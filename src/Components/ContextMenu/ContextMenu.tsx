import React, { useCallback, useEffect, useState } from "react";
import { positiveOrZero } from "../../utils/util";
import "./ContextMenu.css";

interface Props {
    options: {
        text: string;
        action(): void;
    }[][];
    children?: JSX.Element | JSX.Element[];
}

export default function ContextMenu(props: Props) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); // prevent default context
        event.stopPropagation();
        setVisible(true);
        setPosition({
            x: positiveOrZero(event.nativeEvent.offsetX + 10), // add small offsets so that cursor isn't on menu when it appears
            y: positiveOrZero(event.nativeEvent.offsetY + 5),
        });
    };

    const closeContextMenu = useCallback(
        (event: MouseEvent) => {
            setVisible(false);
        },
        [setVisible]
    );

    // add a listener to close menu on any other click on the page
    useEffect(() => {
        window.addEventListener("click", closeContextMenu);
        return () => {
            window.removeEventListener("click", closeContextMenu);
        };
    }, [visible, setVisible, closeContextMenu]);

    const menuBody = props.options.map((optionGroup) => {
        return (
            <div className="context-option-group">
                {optionGroup.map((option) => {
                    return (
                        <div key={option.text} className="context-option" onClick={option.action}>
                            {option.text}
                        </div>
                    );
                })}
            </div>
        );
    });

    return (
        <div onContextMenu={handleContextMenu} style={{ height: "100%" }}>
            {props.children}
            {visible ? (
                <div className="context-menu" style={{ left: position.x, top: position.y }}>
                    {menuBody}
                </div>
            ) : undefined}
        </div>
    );
}
