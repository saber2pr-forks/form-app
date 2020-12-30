import { useEffect } from "react";
import "./ContextMenu.css";

export interface ContextOption {
  text: string;
  action(): void;
}
interface Props {
  options: ContextOption[][]; // multidimensional to allow for grouping
  position: { x: number; y: number };
  closeMenu(): void;
}

export default function ContextMenu(props: Props) {
  const { position, closeMenu } = props;

  // add a listener to close menu on any other click on the page
  useEffect(() => {
    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [closeMenu]);

  const menuBody = props.options.map((optionGroup, index) => {
    return (
      <div key={index} className="context-option-group">
        {optionGroup.map((option) => {
          return (
            <div key={option.text} className="context-option" onClick={option.action}>
              {option.text}
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <div className="context-menu" style={{ left: position.x, top: position.y, zIndex: 1000 }}>
      {menuBody}
    </div>
  );
}
