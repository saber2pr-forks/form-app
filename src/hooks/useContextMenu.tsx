import React, { useCallback, useState } from "react";
import ContextMenu, { ContextOption } from "../Components/ContextMenus/ContextMenu/ContextMenu";
import { positiveOrZero } from "../utils/util";

export default function useContextMenu(
  options: ContextOption[][]
): [JSX.Element, (event: React.MouseEvent<HTMLElement>) => void] {
  const [contextMenu, setContextMenu] = useState<JSX.Element>(<></>);

  const handleContextMenuClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault(); // prevent default context
      event.stopPropagation();
      setContextMenu(
        <ContextMenu
          options={options}
          position={{
            x: positiveOrZero(event.nativeEvent.offsetX + 10), // add small offsets so that cursor isn't on menu when it appears
            y: positiveOrZero(event.nativeEvent.offsetY + 5),
          }}
          closeMenu={() => {
            setContextMenu(<></>);
          }}
        />
      );
    },
    [setContextMenu, options]
  );
  return [contextMenu, handleContextMenuClick];
}
