import { RootAction, RootState } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { ColorTheme, darkTheme, lightTheme } from '../../features/Config';
import { logout } from '../Auth';

/*
https://material.io/design/color/dark-theme.html#ui-application
https://material.io/design/color/the-color-system.html#tools-for-picking-themes
*/

export type Theme = 'light' | 'dark';
export const themes: Theme[] = ['light', 'dark'];

/* ACTIONS */
export const changeTheme = createAction('theme/change')<Theme>();
export const themeActions = { changeTheme };

/* SELECTORS */
export const getCurrentTheme = (state: RootState): ColorTheme =>
  state.theme.themes[state.theme.currentTheme];

/* INTERFACES */
type Themes = {
  [key in Theme]: ColorTheme;
};

type ThemeState = {
  currentTheme: Theme;
  themes: Themes;
};

/* REDUCERS */
export const themeInitialState: ThemeState = {
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
  currentTheme: 'light',
};

export const themeReducer = (
  state: ThemeState = themeInitialState,
  action: RootAction,
): ThemeState => {
  switch (action.type) {
    case getType(changeTheme):
      return { ...state, currentTheme: action.payload };
    case getType(logout):
      return themeInitialState;
    default:
      return state;
  }
};
