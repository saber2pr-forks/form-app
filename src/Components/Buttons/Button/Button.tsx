import React from "react";
import "../../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./Button.css";

export interface TextButtonProps {
  text: string;
  styleType: "primary" | "info" | "muted" | "success" | "warning" | "danger";
  modifiers?: "outline";
  action(): void;
}

export interface IconButtonProps {
  icon: string;
  action(): void;
}

type ButtonProps = TextButtonProps | IconButtonProps;

function isTextButton(value: ButtonProps): value is TextButtonProps {
  return value.hasOwnProperty("text");
}

export default function Button(props: ButtonProps) {
  if (isTextButton(props)) {
    return (
      <button
        className={"button " + props.styleType + " " + props.modifiers}
        onClick={props.action}
      >
        {props.text}
      </button>
    );
  }
  // if we get here it must be an icon button
  return <i onClick={props.action} className={"icon-button " + props.icon}></i>;
}
