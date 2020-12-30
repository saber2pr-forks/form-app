import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ViewModes } from "../../../constants";
import useContextMenu from "../../../hooks/useContextMenu";
import dataSlice from "../../../redux/dataSlice";
import { RootState } from "../../../redux/store";
import stylesSlice from "../../../redux/stylesSlice";
import { ContextOption } from "../../ContextMenus/ContextMenu/ContextMenu";
import InputDialog from "../../Dialogs/InputDialog/InputDialog";
import { StyleDialog } from "../../Dialogs/StyleDialog/StyleDialog";
import Draggable from "../../Utilities/Draggable/Draggable";
import Focusable from "../../Utilities/Focusable/Focusable";
import "./Cell.css";

interface CellProps {
  id: string;
  value: string;
  handleValueChange(event: React.ChangeEvent<HTMLInputElement>): void;
  handleClick(event: React.MouseEvent<HTMLInputElement>): void;
  readonly: boolean;
  autocomplete: boolean;
  contextOptions: ContextOption[][];
  children?: React.ReactNode;
}

/**
 * Base Cell component used in other cell types.
 * @param props
 */
export function Cell(props: CellProps) {
  const { id, value, handleValueChange, handleClick, readonly, autocomplete, children } = props;
  const dispatch = useDispatch();
  const style = useSelector((state: RootState) => {
    return { ...state.styles.elements[id] }; // spread here to assure a new reference so that shallowEqual doesn't short circuit to true
  }, shallowEqual);
  const viewMode = useSelector((state: RootState) => {
    return state.application.viewMode;
  });

  const [canDrag, setCanDrag] = useState<boolean>(false); // variable to allow dragging
  useEffect(() => {
    setCanDrag(viewMode === ViewModes.edit); // allow dragging on viewmode change
  }, [viewMode]);

  const updateCellPosition = useCallback(
    (x: number, y: number) => {
      dispatch(stylesSlice.actions.elementMoved({ id: id, x: x, y: y }));
    },
    [dispatch, id]
  );

  const [dialog, setDialog] = useState<JSX.Element>(<></>);

  const changeIdContextOption: ContextOption = {
    text: "Change ID",
    action: () => {
      const cancel = () => {
        setDialog(<></>);
        setCanDrag(true);
      };
      setCanDrag(false); // don't allow dragging because the div is fullscreen, so you could otherwise click anywhere and drag
      setDialog(
        <InputDialog
          title={"Change ID"}
          inputLabel={"New ID"}
          onSubmit={(newID) => {
            if (newID.length === 0) {
              return { error: "Must choose an ID." };
            }
            dispatch(dataSlice.actions.idChanged({ oldId: props.id, newId: newID }));
            cancel();
          }}
          onCancel={cancel}
        />
      );
    },
  };

  const changeStyleContextOption: ContextOption = {
    text: "Style",
    action: () => {
      const cancel = () => {
        setDialog(<></>);
        setCanDrag(true);
      };
      setCanDrag(false); // don't allow dragging because the div is fullscreen, so you could otherwise click anywhere and drag
      setDialog(
        <StyleDialog
          title={"Style"}
          options={[
            { text: "Border Color", type: "borderColor", initialValue: style.borderColor },
            {
              text: "Border Thickness",
              type: "borderThickness",
              initialValue: style.borderThickness,
            },
            { text: "Border Radius", type: "borderRadius", initialValue: style.borderRadius },
            { text: "Font Color", type: "textColor", initialValue: style.textColor },
            { text: "Font Size", type: "fontSize", initialValue: style.fontSize },
            { text: "Font Weight", type: "fontWeight", initialValue: style.fontWeight },
            { text: "Font Name", type: "fontFamily", initialValue: style.fontFamily },
          ]}
          onSubmit={(style) => {
            dispatch(stylesSlice.actions.styleChanged({ id: props.id, style: style }));
            cancel(); // delete dialog after submit
          }}
          onCancel={cancel}
        />
      );
    },
  };

  const [contextMenu, handleContextMenuClick] = useContextMenu([
    [changeIdContextOption, changeStyleContextOption],
    ...props.contextOptions,
  ]);

  return (
    <Focusable id={id}>
      <Draggable
        active={canDrag}
        onContextMenu={handleContextMenuClick}
        handleDrop={updateCellPosition}
        initialPosition={style.position}
        style={{
          color: style.borderColor,
          thickness: style.borderThickness,
          radius: style.borderRadius,
          backgroundColor: style.backgroundColor,
        }}
      >
        <span className="id-label">{viewMode === ViewModes.edit ? id : ""}</span>
        <input
          className="cell"
          id={id}
          type="text"
          onChange={handleValueChange}
          onContextMenu={handleContextMenuClick}
          onMouseDown={handleClick}
          value={value}
          readOnly={readonly}
          autoComplete={autocomplete ? "on" : "off"}
          style={{
            color: style.textColor,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily,
          }}
        />
        {contextMenu}
        {children}
        {dialog}
      </Draggable>
    </Focusable>
  );
}
