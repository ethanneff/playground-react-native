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
export type Color = {
  statusBar: 'default' | 'light-content' | 'dark-content';
  background: string;
  brand: string;
  danger: string;
  dark: string;
  info: string;
  light: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  surface: string;
  border: string;
  text: string;
  overlay: string;
  grey: string;
  blue: string;
  cyan: string;
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  violet: string;
};

type Colors = {[key in ColorTheme]: Color};

export interface Theme {
  colors: Colors;
  currentColor: ColorTheme;
}

/* REDUCERS */
export const themeInitialState: Theme = {
  colors: {
    dark: {
      text: 'hsl(0, 0%, 100%)', // #ffffff
      brand: 'hsl(264, 34%, 36%)',
      danger: 'hsl(354, 70%, 54%)',
      dark: 'hsl(210, 1 0%, 23%)',
      info: 'hsl(188, 78%, 41%)',
      light: 'hsl(240, 14%, 97%)',
      primary: 'hsl(263, 84%, 75%)',
      secondary: 'hsl(171, 59%, 61%)',
      statusBar: 'light-content',
      success: 'hsl(134, 61%, 41%)',
      warning: 'hsl(45, 100%, 51%)',
      background: 'hsl(0, 0%, 7%)', // #121212
      surface: 'hsl(0, 0%, 7%)',
      border: 'hsl(0, 0%, 15%)',
      overlay: 'hsla(0,0%,0%, 0.38)',
      grey: 'hsl(220, 10%, 47%)', // 108,116,132 #6c7484
      blue: 'hsl(233, 57%, 59%)', // 92,106,210 #5c6ad2
      cyan: 'hsl(208, 56%, 46%)', // 52,122,182 #347ab6
      green: 'hsl(153, 38%, 36%)', // 57,126,95 #397e5f
      yellow: 'hsl(25, 66%, 41%)', // 174,93,36 #ae5d24
      orange: 'hsl(11, 49%, 49%)', // 185,86,64 #b95640
      red: 'hsl(345, 48%, 51%)', // 190,72,101 #be4865
      purple: 'hsl(285, 35%, 51%)', // 151,86,173 #9756ad
      violet: 'hsl(254, 42%, 57%)', // 120,99,192 #7863c0
    },
    light: {
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
      background: 'hsl(0, 0%, 100%)', // #ffffff
      surface: 'hsl(0, 0%, 96%)',
      border: 'hsl(0, 0%, 15%)',
      overlay: 'hsla(0,0%,0%, 0.38)',
      grey: 'hsl(220, 10%, 47%)', // 108,116,132 #6c7484
      blue: 'hsl(233, 57%, 59%)', // 92,106,210 #5c6ad2
      cyan: 'hsl(208, 56%, 46%)', // 52,122,182 #347ab6
      green: 'hsl(153, 38%, 36%)', // 57,126,95 #397e5f
      yellow: 'hsl(25, 66%, 41%)', // 174,93,36 #ae5d24
      orange: 'hsl(11, 49%, 49%)', // 185,86,64 #b95640
      red: 'hsl(345, 48%, 51%)', // 190,72,101 #be4865
      purple: 'hsl(285, 35%, 51%)', // 151,86,173 #9756ad
      violet: 'hsl(254, 42%, 57%)', // 120,99,192 #7863c0
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
