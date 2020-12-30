import React from "react";
import "./Toolbar.css";

interface ToolbarProps {
  children?: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  return <div className="toolbar">{props.children}</div>;
}
