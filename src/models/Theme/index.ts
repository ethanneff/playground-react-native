/*
https://material.io/design/color/dark-theme.html#ui-application
https://material.io/design/color/the-color-system.html#tools-for-picking-colors
*/

import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../containers";
import { logout } from "../Auth";

/* INTERFACES */
enum StatusBarStyle {
  Default = "default",
  Light = "light-content",
  Dark = "dark-content"
}

interface Color {
  background: string;
  brand: string;
  danger: string;
  dark: string;
  info: string;
  light: string;
  primary: string;
  secondary: string;
  statusBar: StatusBarStyle;
  success: string;
  surface: string;
  text: string;
  warning: string;
}

export enum ColorTheme {
  Light = "light",
  Dark = "dark"
}

type Colors = {
  [key in ColorTheme]: Color;
};

export interface Theme {
  colors: Colors;
  currentColor: ColorTheme;
}
export type ThemeActions = ActionType<typeof changeTheme>;

/* ACTIONS */
export const changeTheme = createStandardAction("theme/CHANGE")<ColorTheme>();

/* SELECTORS */
export const getCurrentColor = (state: RootState): Color =>
  state.theme.colors[state.theme.currentColor];

/* REDUCERS */
export const themeInitialState: Theme = {
  colors: {
    [ColorTheme.Dark]: {
      background: "hsl(0, 0%, 7%)",
      brand: "hsl(264, 34%, 36%)",
      danger: "hsl(354, 70%, 54%)",
      dark: "hsl(210, 10%, 23%)",
      info: "hsl(188, 78%, 41%)",
      light: "hsl(210, 17%, 98%)",
      primary: "hsl(263, 84%, 75%)",
      secondary: "hsl(171, 59%, 61%)",
      statusBar: StatusBarStyle.Light,
      success: "hsl(134, 61%, 41%)",
      surface: "hsl(0, 0%, 12%)",
      text: "hsl(0, 0%, 100%)",
      warning: "hsl(45, 100%, 51%)"
    },
    [ColorTheme.Light]: {
      background: "hsl(0, 0%, 100%)",
      brand: "hsl(264, 34%, 36%)",
      danger: "hsl(354, 70%, 54%)",
      dark: "hsl(210, 10%, 23%)",
      info: "hsl(188, 78%, 41%)",
      light: "hsl(210, 17%, 98%)",
      primary: "hsl(211, 100%, 50%)",
      secondary: "hsl(208, 7%, 46%)",
      statusBar: StatusBarStyle.Default,
      success: "hsl(134, 61%, 41%)",
      surface: "hsl(0, 0%, 98%)",
      text: "hsl(0, 0%, 0%)",
      warning: "hsl(45, 100%, 51%)"
    }
  },
  currentColor: ColorTheme.Light
};

export function themeReducer(
  state: Theme = themeInitialState,
  action: RootAction
): Theme {
  switch (action.type) {
    case getType(changeTheme):
      return {
        ...state,
        currentColor: action.payload
      };
    case getType(logout):
      return themeInitialState;
    default:
      return state;
  }
}
