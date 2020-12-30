import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dataSlice from "../../../../redux/dataSlice";
import { RgbaStringColorPicker } from "react-colorful";
import "react-colorful/dist/index.css";
import "./CellOptions.css";
import stylesSlice from "../../../../redux/stylesSlice";
import { RootState } from "../../../../redux/store";

const PRESET_COLORS = [
  "rgba(255, 0, 0, 1)", // red [start of first row]
  "rgba(0, 128, 0, 1)", // green
  "rgba(0, 0, 255, 1)", // blue
  "rgba(255, 255, 0, 1)", // yellow
  "rgba(255, 140, 0, 1)", // orange
  "rgba(0, 0, 0, 1)", // black
  "rgba(255, 255, 255, 1)", // white
  "rgba(255, 0, 0, 0.4)", // light red [start of second row]
  "rgba(0, 128, 0, 0.4)", // light green
  "rgba(0, 0, 255, 0.4)", // light blue
  "rgba(255, 255, 0, 0.4)", // light yellow
  "rgba(255, 140, 0, 0.4)", // light orange
  "rgba(0, 0, 0, 0.5)", // gray
  "rgba(0, 0, 0, 0.1)", // light gray
];

const validHexCode = new RegExp(/[abcdef1234567890]{6}/);

interface CellOptionsProps {
  id: string;
}

export function CellOptions(props: CellOptionsProps) {
  return (
    <div className="properties-list cell">
      <IdComponent id={props.id} />
      <ColorPicker label={"Border Color"} styleType={"borderColor"} id={props.id} />
      <ColorPicker label={"Font Color"} styleType={"textColor"} id={props.id} />
      <ColorPicker label={"Background Color"} styleType={"backgroundColor"} id={props.id} />
    </div>
  );
}

interface SelectCellOptionsProps {
  id: string;
}

export function SelectCellOptions(props: SelectCellOptionsProps) {
  return (
    <div className="properties-list cell">
      <IdComponent id={props.id} />
      <ColorPicker label={"Border Color"} styleType={"borderColor"} id={props.id} />
      <ColorPicker label={"Font Color"} styleType={"textColor"} id={props.id} />
      <ColorPicker label={"Background Color"} styleType={"backgroundColor"} id={props.id} />
    </div>
  );
}

function IdComponent(props: { id: string }) {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>(props.id);

  useEffect(() => {
    setId(props.id);
  }, [props.id, setId]);

  const changeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handleBlur = () => {
    if (props.id === id) return;
    dispatch(dataSlice.actions.idChanged({ oldId: props.id, newId: id }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (props.id === id) return;
      dispatch(dataSlice.actions.idChanged({ oldId: props.id, newId: id }));
    }
  };

  return (
    <div className="option">
      <label className="label">ID</label>
      <input
        className="input"
        onChange={changeId}
        onBlur={handleBlur}
        value={id}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

function ColorPicker(props: {
  label: string;
  styleType: "borderColor" | "textColor" | "backgroundColor";
  id: string;
}) {
  const { label, styleType, id } = props;
  const dispatch = useDispatch();

  const initialColor = useSelector((state: RootState) => {
    return state.styles.elements[props.id][props.styleType];
  });
  const [color, setColor] = useState<string>(initialColor);
  const [colorInput, setColorInput] = useState<string>("");
  const [active, setActive] = useState<boolean>(false);

  // show the popup when the menu is clicked
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setActive(true);
  };

  // callback for submitting color -- this changes every time the id changes
  const submitColor = useCallback(
    (color) => {
      dispatch(stylesSlice.actions.styleChanged({ id: id, style: { [styleType]: color } }));
    },
    [dispatch, id, styleType]
  );

  // close the popup
  const submitWithSlider = useCallback(() => {
    dispatch(stylesSlice.actions.styleChanged({ id: id, style: { [styleType]: color } }));
    setActive(false);
  }, [dispatch, id, styleType, color]);

  // called when someone types a color into the input
  const colorInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColorInput(event.target.value);
    if (event.target.value.length === 6 && validHexCode.test(event.target.value)) {
      setColor("#" + event.target.value);
    }
  };

  // when focused changes
  useEffect(() => {
    // set initial color
    setColor(initialColor);
  }, [initialColor]);

  // when focused element changes
  useEffect(() => {
    // add listener for close
    document.addEventListener("click", submitWithSlider);
    return () => {
      document.removeEventListener("click", submitWithSlider);
    };
  }, [submitWithSlider]);

  // change the value in the input when the slider is moved
  useEffect(() => {
    setColorInput(color.replace("#", ""));
  }, [color]);

  // create the preset colors
  const presets = PRESET_COLORS.map((color) => {
    return (
      <div
        key={color}
        style={{ backgroundColor: color }}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
          submitColor(color);
          setActive(false);
        }}
      />
    );
  });

  return (
    <div className="option">
      <label className="label">{label}</label>
      <div className={"color-picker"} onClick={handleClick} style={{ backgroundColor: color }}>
        {active ? (
          <div className="popup">
            <div className="presets">{presets}</div>
            <RgbaStringColorPicker color={color} onChange={setColor} />
            <div className="color-input">
              <div>r</div>
              <input onChange={colorInputChange} value={colorInput} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
