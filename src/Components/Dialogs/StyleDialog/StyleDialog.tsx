import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import Button from "../../Buttons/Button/Button";
import Dialog from "../Dialog/Dialog";
import "./StyleDialog.css";

interface Props {
  title: string;
  options: { text: string; type: string; initialValue?: string }[];
  onSubmit(style: { [option: string]: string }): void;
  onCancel(): void;
}

export function StyleDialog(props: Props) {
  const [style, setStyle] = useState<{ [option: string]: string }>({}); // store the style object

  const inputs = props.options.map((option) => {
    // create a series of inputs and labels and assign functions to them
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStyle((style) => {
        return { ...style, [option.type]: event.target.value };
      });
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Enter") {
        props.onSubmit(style);
      }
    };

    return (
      <label key={option.type} className="label">
        {option.text}
        <input
          className="input"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          defaultValue={option.initialValue}
        />
      </label>
    );
  });

  return (
    <Dialog
      title={props.title}
      footer={
        <Button
          text={"Done"}
          styleType="success"
          action={() => {
            props.onSubmit(style);
          }}
        />
      }
      onCancel={props.onCancel}
      allowCancel={true}
    >
      {inputs}
    </Dialog>
  );
}
