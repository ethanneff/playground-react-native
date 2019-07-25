import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../containers";
import { logout } from "../Auth";

/* ACTIONS */
export const navigate = createStandardAction("navigation/CHANGE_NAVIGATION")<
  NavigationScreen
>();
export const showModal = createStandardAction("navigation/SHOW_MODAL")<
  NavigationModal
>();
export const hideModal = createStandardAction("navigation/HIDE_MODAL")();

/* SELECTORS */
export const getScreen = (state: RootState): NavigationScreen =>
  state.navigation.screen;
export const getModal = (state: RootState): NavigationModal =>
  state.navigation.modal;

/* INTERFACES */
export enum NavigationScreen {
  CantHurtMe,
  Checklists,
  ChecklistsCreate,
  ChecklistsItemCreate,
  ChecklistsItemUpdate,
  ChecklistsList,
  ChecklistsUpdate,
  Debug,
  DebugArticle,
  DebugBall,
  DebugButtons,
  DebugCards,
  DebugChat,
  DebugDarkMode,
  DebugDrag,
  DebugFonts,
  DebugImageCollection,
  DebugInput,
  DebugOKRs,
  DebugPinchSpread,
  DebugQuestionnaire,
  DebugSearchBar,
  DebugStopwatch,
  DebugSwipeCell,
  Focus,
  Portfolio,
  PortfolioForgotPassword,
  PortfolioLanding,
  PortfolioLogin,
  PortfolioNotFound,
  PortfolioSettings
}

export enum NavigationModal {
  None,
  CantHurtMeProfile,
  CantHurtMeConfigs
}

export interface Navigation {
  modal: NavigationModal;
  screen: NavigationScreen;
}

export type NavigationActions = ActionType<
  typeof navigate | typeof showModal | typeof hideModal
>;

/* REDUCERS */
export const navigationInitialState: Navigation = {
  modal: NavigationModal.None,
  screen: NavigationScreen.PortfolioLanding
};
export function navigationReducer(
  state: Navigation = navigationInitialState,
  action: RootAction
): Navigation {
  switch (action.type) {
    case getType(navigate):
      return {
        ...state,
        screen: action.payload
      };
    case getType(showModal):
      return {
        ...state,
        modal: action.payload
      };
    case getType(hideModal):
      return {
        ...state,
        modal: NavigationModal.None
      };
    case getType(logout):
      return navigationInitialState;
    default:
      return state;
  }
}
