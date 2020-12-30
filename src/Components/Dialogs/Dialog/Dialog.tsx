import React from "react";
import Button from "../../Buttons/Button/Button";
import "./Dialog.css";

interface Props {
  title: string;
  children?: JSX.Element | JSX.Element[];
  footer: JSX.Element | JSX.Element[];
  onCancel(): void;
  allowCancel: boolean;
}

export default function Dialog(props: Props) {
  return (
    <div className="dialog-background">
      <div className="dialog">
        <div className="header">
          <span className="dialog-title">{props.title}</span>
          {props.allowCancel ? (
            <Button icon={"far fa-times-circle"} action={props.onCancel} />
          ) : undefined}
        </div>
        <div className="content">{props.children}</div>
        <div className="footer">{props.footer}</div>
      </div>
    </div>
  );
}
