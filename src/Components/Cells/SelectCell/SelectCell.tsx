import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ViewModes } from "../../../constants";
import { RootState } from "../../../redux/store";
import Dropdown from "../../Utilities/Dropdown/Dropdown";
import { Cell } from "../Cell/Cell";
import "./SelectCell.css";

interface Props {
  id: string;
}

export default function SelectCell(props: Props) {
  const dispatch = useDispatch();
  const element = useSelector((state: RootState) => {
    return { ...state.data.elements[props.id] }; // spread here to assure a new reference so that shallowEqual doesn't short circuit to true
  }, shallowEqual);
  const [value, setValue] = useState<string>(element.value);

  const handleKeyPress = () => {};
  const handleValueChange = () => {};
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation(); // don't let this bubble so that you must click the edges to move a cell
  };
  const handleDropdownClick = () => {};
  const dropdownOptions = [{ text: element.formula, value: element.formula }];

  return (
    <div onKeyPress={handleKeyPress}>
      <Cell
        id={props.id}
        value={value}
        handleValueChange={handleValueChange}
        handleClick={handleInputClick}
        readonly={false}
        autocomplete={false}
        contextOptions={[]}
      >
        <Dropdown
          key={"dropdown" + props.id}
          onSelection={handleDropdownClick}
          options={dropdownOptions}
        />
      </Cell>
    </div>
  );
}
