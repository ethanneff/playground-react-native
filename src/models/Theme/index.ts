import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {logout} from '../Auth';

/*
https://material.io/design/color/dark-theme.html#ui-application
https://material.io/design/color/the-color-system.html#tools-for-picking-colors
*/

export type ColorTheme = 'light' | 'dark';
export const colorThemes: ColorTheme[] = ['light', 'dark'];

/* ACTIONS */
export const changeTheme = createAction('theme/CHANGE')<ColorTheme>();
export const themeActions = {changeTheme};

/* SELECTORS */
export const getCurrentColor = (state: RootState): Color =>
  state.theme.colors[state.theme.currentColor];
export const getLightMode = (state: RootState): boolean =>
  state.theme.currentColor === 'light';

/* INTERFACES */
type StatusBarStyle = 'default' | 'light-content' | 'dark-content';

export interface Color {
  background: string;
  surface: string;
  text: string;
  brand: string;
  danger: string;
  dark: string;
  info: string;
  light: string;
  primary: string;
  secondary: string;
  statusBar: StatusBarStyle;
  success: string;
  warning: string;
  overlay: string;
}

type Colors = {[key in ColorTheme]: Color};

export interface Theme {
  colors: Colors;
  currentColor: ColorTheme;
}

/* REDUCERS */
export const themeInitialState: Theme = {
  colors: {
    dark: {
      background: 'hsl(0, 0%, 7%)', // #121212
      surface: 'hsl(0, 0%, 7%)',
      text: 'hsl(0, 0%, 100%)', // #ffffff
      brand: 'hsl(264, 34%, 36%)',
      danger: 'hsl(354, 70%, 54%)',
      dark: 'hsl(210, 10%, 23%)',
      info: 'hsl(188, 78%, 41%)',
      light: 'hsl(240, 14%, 97%)',
      primary: 'hsl(263, 84%, 75%)',
      secondary: 'hsl(171, 59%, 61%)',
      statusBar: 'light-content',
      success: 'hsl(134, 61%, 41%)',
      warning: 'hsl(45, 100%, 51%)',
      overlay: 'hsla(0,0%,0%, 0.38)',
    },
    light: {
      background: 'hsl(0, 0%, 100%)', // #ffffff
      surface: 'hsl(0, 0%, 96%)',
      text: 'hsl(0, 0%, 0%)', // #000000
      brand: 'hsl(264, 34%, 36%)', // #563d7c
      danger: 'hsl(354, 70%, 54%)', // #dc3545
      dark: 'hsl(210, 10%, 23%)', // #343a40
      info: 'hsl(188, 78%, 41%)', // #17a2b8
      light: 'hsl(210, 17%, 98%)', // #f8f9fa
      primary: 'hsl(211, 100%, 50%)', // #007bff
      secondary: 'hsl(208, 7%, 46%)', // #6c757d
      statusBar: 'default',
      success: 'hsl(134, 61%, 41%)', // #28a745
      warning: 'hsl(45, 100%, 51%)', // #ffc107
      overlay: 'hsla(0,0%,0%, 0.38)',
    },
  },
  currentColor: 'light',
};

export function themeReducer(
  state: Theme = themeInitialState,
  action: RootAction,
): Theme {
  switch (action.type) {
    case getType(changeTheme):
      return {
        ...state,
        currentColor: action.payload,
      };
    case getType(logout):
      return themeInitialState;
    default:
      return state;
  }
}
