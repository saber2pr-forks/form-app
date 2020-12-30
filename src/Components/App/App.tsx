import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ElementTypes, ViewModes } from "../../constants";
import applicationSlice from "../../redux/applicationSlice";
import dataSlice from "../../redux/dataSlice";
import { RootState } from "../../redux/store";
import MenuButton from "../Buttons/MenuButton/MenuButton";
import DisplayCell from "../Cells/DisplayCell/DisplayCell";
import InputCell from "../Cells/InputCell/InputCell";
import SelectCell from "../Cells/SelectCell/SelectCell";
import ComponentMenu from "../Menus/ComponentMenu/ComponentMenu";
import PropertiesMenu from "../Menus/PropertiesMenu/PropertiesMenu";
import Toolbar from "../Menus/Toolbar/Toolbar";
import "./App.css";

// initialize parser object
var FormulaParser = require("hot-formula-parser").Parser;
export const SUPPORTED_FORMULAS = require("hot-formula-parser").SUPPORTED_FORMULAS;
export var parser = new FormulaParser();

function App() {
  const dispatch = useDispatch();
  const elementsByID = useSelector((state: RootState) => {
    return state.data.elements;
  }, shallowEqual);
  const allIDs = useSelector((state: RootState) => {
    return state.data.ids;
  }, shallowEqual);
  const viewMode = useSelector((state: RootState) => {
    return state.application.viewMode;
  });

  // these are temporary for testing
  const addElementByType = useCallback(
    (elementType: string) => {
      dispatch(
        dataSlice.actions.elementAdded({
          id: elementType + allIDs.length,
          elementType: elementType,
        })
      );
    },
    [dispatch, allIDs.length]
  );

  const elements = allIDs.map((id, index) => {
    switch (elementsByID[id].elementType) {
      case ElementTypes.inputCell:
        return <InputCell key={index} id={id} />;
      case ElementTypes.displayCell:
        return <DisplayCell key={index} id={id} />;
      case ElementTypes.selectCell:
        return <SelectCell key={index} id={id} />
      default:
        return "Error"; // shouldn't ever get here
    }
  });

  return (
    <div className="app">
      <div className="header">
        <Toolbar>
          <MenuButton
            text={viewMode}
            action={() => {
              dispatch(
                applicationSlice.actions.viewModeChanged({
                  newMode: viewMode === ViewModes.edit ? ViewModes.view : ViewModes.edit,
                })
              );
            }}
          />
          <ComponentMenu addElementCallback={addElementByType} />
        </Toolbar>
      </div>
      <div className="left-toolbar"></div>
      <div id="content" className="content">{elements}</div>
      <div className="right-toolbar">
        <PropertiesMenu />
      </div>
      <div className="footer"></div>
    </div>
  );
}

// function App() {
//   const dispatch = useDispatch();
//   const [contextMenu, handleContextMenuClick] = useContextMenu([
//     [
//       {
//         text: "View Mode",
//         action: () => {
//           dispatch(
//             applicationSlice.actions.viewModeChanged({
//               newMode: ViewModes.view,
//             })
//           );
//         },
//       },
//       {
//         text: "Edit Mode",
//         action: () => {
//           dispatch(
//             applicationSlice.actions.viewModeChanged({
//               newMode: ViewModes.edit,
//             })
//           );
//         },
//       },
//     ],
//   ]);

//   return (
//     <div onContextMenu={handleContextMenuClick} style={{ height: "100%" }}>
//       {contextMenu}
//       <Form />
//     </div>
//   );
// }

export default App;
