import React, { useCallback, useEffect, useState } from "react";
import { positiveOrZero } from "../../../utils/util";
import "./Draggable.css";

const TOP_OFFSET = 25;
const LEFT_OFFSET = 50;

interface Props {
  initialPosition: { x: number; y: number };
  handleDrop(x: number, y: number): void;
  active: boolean;
  children?: React.ReactNode;
  style: { color: string; thickness: string; radius: string; backgroundColor: string;};
  onContextMenu(event: React.MouseEvent<HTMLElement>): void;
}

export default function Draggable(props: Props) {
  const { handleDrop, active, children } = props;
  const [dragging, setDragging] = useState<boolean>(false);
  const [clickPositionOnElement, setClickPositionOnElement] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(props.initialPosition);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        event.preventDefault();
        setPosition({
          x: positiveOrZero(event.clientX - clickPositionOnElement.x - LEFT_OFFSET),
          y: positiveOrZero(event.clientY - clickPositionOnElement.y - TOP_OFFSET),
        });
      }
    },
    [setPosition, dragging, clickPositionOnElement]
  );

  const handleMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    if (active) {
      setDragging(true);
      setClickPositionOnElement({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY });
      // save offset to allow user to drag from anywhere on the input
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    if (dragging) {
      setDragging(false);
      handleDrop(
        positiveOrZero(event.clientX - clickPositionOnElement.x - LEFT_OFFSET),
        positiveOrZero(event.clientY - clickPositionOnElement.y - TOP_OFFSET)
      );
    }
  };

  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDragging(false);
        setPosition(props.initialPosition);
      }
    },
    [setDragging, setPosition, props.initialPosition]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("keyup", handleEscapePress); // drop element if escape is pressed
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keyup", handleEscapePress);
    };
  }, [handleMouseMove, handleEscapePress]);

  return (
    <div
      className="draggable"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={props.onContextMenu}
      style={{
        cursor: active ? "move" : "auto",
        position: "absolute",
        top: position.y,
        left: position.x,
        borderColor: props.style.color,
        borderWidth: props.style.thickness,
        borderRadius: props.style.radius,
        backgroundColor: props.style.backgroundColor,
      }}
    >
      {children}
    </div>
  );
}
