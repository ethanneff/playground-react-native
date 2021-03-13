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

const grey = {
  50: '#ff9800',
  100: '#ff9800',
  200: '#ff9800',
  300: '#ff9800',
  400: '#ff9800',
  500: '#ff9800',
  600: '#ff9800',
  700: '#ff9800',
  800: '#ff9800',
  900: '#ff9800',
};

/* REDUCERS */
export const themeInitialState: Theme = {
  colors: {
    dark: {
      statusBar: 'light-content',
      background: 'hsl(0, 0%, 7%)', // #121212
      surface: 'hsl(0, 0%, 7%)',
      border: 'hsl(0, 0%, 15%)',
      overlay: 'hsla(0,0%,0%, 0.38)',
      text: 'hsl(0, 0%, 100%)', // #ffffff
      grey: 'hsl(220, 10%, 47%)', // 108,116,132 #6c7484
      blue: 'hsl(233, 57%, 59%)', // 92,106,210 #5c6ad2
      cyan: 'hsl(208, 56%, 46%)', // 52,122,182 #347ab6
      green: 'hsl(153, 38%, 36%)', // 57,126,95	#397e5f
      yellow: 'hsl(25, 66%, 41%)', // 174,93,36 #ae5d24
      orange: 'hsl(11, 49%, 49%)', // 185,86,64 #b95640
      red: 'hsl(345, 48%, 51%)', // 190,72,101 #be4865
      purple: 'hsl(285, 35%, 51%)', // 151,86,173 #9756ad
      violet: 'hsl(254, 42%, 57%)', // 120,99,192 #7863c0
    },
    light: {
      statusBar: 'default',
      background: 'hsl(0, 0%, 100%)', // #ffffff
      surface: 'hsl(0, 0%, 96%)',
      border: 'hsl(0, 0%, 15%)',
      overlay: 'hsla(0,0%,0%, 0.38)',
      text: 'hsl(0, 0%, 0%)', // #000000
      grey: 'hsl(220, 10%, 47%)', // 108,116,132 #6c7484
      blue: 'hsl(233, 57%, 59%)', // 92,106,210 #5c6ad2
      cyan: 'hsl(208, 56%, 46%)', // 52,122,182 #347ab6
      green: 'hsl(153, 38%, 36%)', // 57,126,95	#397e5f
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
