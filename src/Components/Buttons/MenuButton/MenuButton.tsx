import React from "react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./MenuButton.css";

interface MenuButtonProps {
  text: string;
  icon?: string;
  action(): void;
}

/**
 * Button that is made for toolbar-like interfaces. Flat with no background color.
 * Can have icon and text but will only show text if screen width allows (experimental)
 * @param props
 */
export default function MenuButton(props: MenuButtonProps) {
  return (
    <button
      className="menu-button"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        props.action();
      }}
    >
      {props.icon ? <i className={props.icon} /> : ''}
      <span>{props.text}</span>
    </button>
  );
}
