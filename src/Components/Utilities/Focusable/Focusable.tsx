import React from "react";
import { useDispatch } from "react-redux";
import applicationSlice from "../../../redux/applicationSlice";

interface Props {
  id: string;
  children: React.ReactNode;
}

export default function Focusable(props: Props) {
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(applicationSlice.actions.focusChanged({focusedId: props.id}))
  }

  return <div onClick={handleClick}>{props.children}</div>;
}
