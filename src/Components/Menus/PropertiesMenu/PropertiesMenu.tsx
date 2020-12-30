import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import "./PropertiesMenu.css";
import { CellOptions, SelectCellOptions } from "./CellOptions/CellOptions";
import { ElementTypes } from "../../../constants";

interface Props {}

export default function PropertiesMenu(props: Props) {
  const focusedId = useSelector((state: RootState) => {
    return state.application.focusedId;
  });
  const focusedType = useSelector((state: RootState) => {
    if (state.application.focusedId === null) {
      return null;
    }
    return state.data.elements[state.application.focusedId].elementType;
  });

  let menu: React.ReactNode;

  if (focusedId === null) {
    return <div className="properties-menu"></div>;
  }

  switch (focusedType) {
    case ElementTypes.displayCell:
      menu = <CellOptions id={focusedId} />;
      break;
    case ElementTypes.inputCell:
      menu = <CellOptions id={focusedId} />;
      break;
    case ElementTypes.selectCell:
      menu = <SelectCellOptions id={focusedId} />;
      break;
    default:
      menu = <></>;
  }

  return <div className="properties-menu">{menu}</div>;
}
