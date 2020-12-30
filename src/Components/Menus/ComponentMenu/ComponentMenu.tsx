import React from "react";
import { ElementTypes } from "../../../constants";
import MenuButton from "../../Buttons/MenuButton/MenuButton";
import './ComponentMenu.css'

interface ComponentMenuProps {
  addElementCallback(elementType: string): void;
}

export default function ComponentMenu(props: ComponentMenuProps) {
  return (
    <div className="component-menu">
      <MenuButton
        text={"Input Cell"}
        icon={"fas fa-i-cursor"}
        action={() => {
          props.addElementCallback(ElementTypes.inputCell);
        }}
      />
      <MenuButton
        text={"Display Cell"}
        icon={"fas fa-square-root-alt"}
        action={() => {
          props.addElementCallback(ElementTypes.displayCell);
        }}
      />
      <MenuButton
        text={"Select Cell"}
        icon={"fas fa-caret-square-down"}
        action={() => {
          props.addElementCallback(ElementTypes.selectCell);
        }}
      />
    </div>
  );
}
