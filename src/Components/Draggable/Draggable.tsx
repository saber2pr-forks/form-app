import React, { useCallback, useEffect, useState } from "react";
import { positiveOrZero } from "../../utils/util";

interface Props {
    moveHandler(x: number, y: number): void;
    dropHandler(x: number, y: number): void;
    active: boolean;
    children: JSX.Element[] | JSX.Element;
}

export default function Draggable(props: Props) {
    const { moveHandler, dropHandler, active, children } = props;
    const [dragging, setDragging] = useState(false);
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    const handleMouseDown = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            if (active) {
                setDragging(true);
                setClickPosition({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
                // save offset to allow user to drag from anywhere on the input
            }
        },
        [setDragging, active, setClickPosition]
    );

    const handleMouseUp = useCallback(
        (event: React.MouseEvent<HTMLElement>) => {
            setDragging(false);
            dropHandler(
                positiveOrZero(event.clientX - clickPosition.x),
                positiveOrZero(event.clientY - clickPosition.y)
            );
        },
        [setDragging, dropHandler, clickPosition]
    );

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (dragging) {
                event.preventDefault();
                moveHandler(
                    positiveOrZero(event.clientX - clickPosition.x),
                    positiveOrZero(event.clientY - clickPosition.y)
                );
            }
        },
        [dragging, moveHandler, clickPosition]
    );

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [dragging, handleMouseMove]);

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
                cursor: active ? "move" : "text",
            }}
        >
            {children}
        </div>
    );
}
