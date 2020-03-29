import {ActionType, createAction, getType} from 'typesafe-actions';
import {RootAction, RootState, screens} from '../../containers';
import {logout} from '../Auth';

/* ACTIONS */
export const navigate = createAction('navigation/changeNavigation')<
  NavigationScreen
>();

/* SELECTORS */
export const getScreen = (state: RootState): NavigationScreen =>
  state.navigation.screen;

/* INTERFACES */
export type NavigationScreen = keyof typeof screens;

export interface Navigation {
  screen: NavigationScreen;
}

export type NavigationActions = ActionType<typeof navigate>;

/* REDUCERS */
export const navigationInitialState: Navigation = {
  screen: 'portfolioLanding',
};
export function navigationReducer(
  state: Navigation = navigationInitialState,
  action: RootAction,
): Navigation {
  switch (action.type) {
    case getType(navigate):
      return {
        ...state,
        screen: action.payload,
      };
    case getType(logout):
      return navigationInitialState;
    default:
      return state;
  }
}
