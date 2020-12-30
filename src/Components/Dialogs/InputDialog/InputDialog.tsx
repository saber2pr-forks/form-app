import React, { useState } from "react";
import Button from "../../Buttons/Button/Button";
import Dialog from "../Dialog/Dialog";
import "./InputDialog.css";

interface Props {
  title: string;
  inputLabel: string;
  onSubmit(value: string): { error: string } | void;
  onCancel(): void;
}

export default function InputDialog(props: Props) {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      props.onSubmit(currentValue);
    }
  };

  return (
    <Dialog
      title={props.title}
      onCancel={props.onCancel}
      footer={
        <Button
          text={"Change"}
          styleType={"success"}
          action={() => {
            const result = props.onSubmit(currentValue);
            if (result !== undefined) {
              setError(result.error);
            } else {
              setError("");
            }
          }}
        />
      }
      allowCancel={true}
    >
      <label className="label">
        {props.inputLabel}
        <input
          className={"input" + (error !== "" ? " error" : "")}
          value={currentValue}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
          autoFocus={true}
        />
      </label>
      <div className="error-message">{error}</div>
    </Dialog>
  );
}
