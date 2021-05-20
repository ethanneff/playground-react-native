import {RootAction, RootState} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {ColorTheme, darkTheme, lightTheme} from '../../utils';
import {logout} from '../Auth';

/*
https://material.io/design/color/dark-theme.html#ui-application
https://material.io/design/color/the-color-system.html#tools-for-picking-colors
*/

export type Theme = 'light' | 'dark';
export const themes: Theme[] = ['light', 'dark'];

/* ACTIONS */
export const changeTheme = createAction('theme/CHANGE')<Theme>();
export const themeActions = {changeTheme};

/* SELECTORS */
export const getCurrentColor = (state: RootState): ColorTheme =>
  state.theme.colors[state.theme.currentColor];

/* INTERFACES */
type Colors = {
  [key in Theme]: ColorTheme;
};

type ThemeState = {
  colors: Colors;
  currentColor: Theme;
};

/* REDUCERS */
export const themeInitialState: ThemeState = {
  colors: {
    dark: darkTheme,
    light: lightTheme,
  },
  currentColor: 'light',
};

export function themeReducer(
  state: ThemeState = themeInitialState,
  action: RootAction,
): ThemeState {
  switch (action.type) {
    case getType(changeTheme):
      return {...state, currentColor: action.payload};
    case getType(logout):
      return themeInitialState;
    default:
      return state;
  }
}
