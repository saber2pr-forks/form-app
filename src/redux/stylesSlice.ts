import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

export interface ElementStyle {
  position: {
    x: number;
    y: number;
  };
  textColor: string;
  backgroundColor: string;
  fontSize: string;
  fontWeight: "bold" | "bolder" | "lighter" | "normal";
  fontFamily: 'Roboto' | 'Noto Sans JP';
  borderThickness: string;
  borderColor: string;
  borderRadius: string;
}

interface State {
  elements: { [id: string]: ElementStyle };
}

const initialState: State = {
  elements: {},
};

const stylesSlice = createSlice({
  name: "styles",
  initialState: initialState,
  reducers: {
    elementMoved(state, action: PayloadAction<{ id: string; x: number; y: number }>) {
      state.elements[action.payload.id].position = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    styleChanged(state, action: PayloadAction<{ id: string; style: { [type: string]: string } }>) {
      state.elements[action.payload.id] = {
        ...state.elements[action.payload.id],
        ...action.payload.style,
      }; // spread both objects to change only the properties passed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(dataSlice.actions.elementAdded, (state, action) => {
        state.elements[action.payload.id] = {
          position: { x: 200, y: 200 }, // default position
          textColor: "black",
          backgroundColor: "white",
          fontSize: '16px',
          fontWeight: 'normal',
          fontFamily: 'Roboto',
          borderThickness: '1px',
          borderColor: 'black',
          borderRadius: '0'
        }; 
      })
      .addCase(dataSlice.actions.idChanged, (state, action) => {
        state.elements[action.payload.newId] = state.elements[action.payload.oldId];
        delete state.elements[action.payload.oldId];
      });
  },
});

export default stylesSlice;
