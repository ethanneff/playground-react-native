import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState } from "../../containers";
import { logout } from "../Auth";

/* INTERFACES */
export enum NavigationScreen {
  Focus = "Focus",
  PortfolioNotFound = "PortfolioNotFound",
  PortfolioMain = "PortfolioMain",
  PortfolioLanding = "PortfolioLanding",
  PortfolioLogin = "PortfolioLogin",
  PortfolioForgotPassword = "PortfolioForgotPassword",
  PortfolioSettings = "PortfolioSettings",
  Debug = "Debug",
  DebugArticle = "DebugArticle",
  DebugBall = "DebugBall",
  DebugButtons = "DebugButtons",
  DebugCards = "DebugCards",
  DebugChat = "DebugChat",
  DebugDrag = "DebugDrag",
  DebugFonts = "DebugFonts",
  DebugImageCollection = "DebugImageCollection",
  DebugInput = "DebugInput",
  DebugOKRs = "DebugOKRs",
  DebugPinchSpread = "DebugPinchSpread",
  DebugQuestionnaire = "DebugQuestionnaire",
  DebugSearchBar = "DebugSearchBar",
  DebugStopwatch = "DebugStopwatch",
  DebugSwipeCell = "DebugSwipeCell",
  DebugDarkMode = "DebugDarkMode",
  CantHurtMeHome = "CantHurtMeHome",
  ChecklistsList = "ChecklistsList",
  ChecklistsListCreate = "ChecklistsListCreate",
  ChecklistsListUpdate = "ChecklistsListUpdate",
  ChecklistsLists = "ChecklistsLists",
  ChecklistsItemCreate = "ChecklistsItemCreate",
  ChecklistsItemUpdate = "ChecklistsItemUpdate"
}

export enum NavigationModal {
  None = "None",
  CantHurtMeProfile = "CantHurtMeProfile",
  CantHurtMeSettings = "CantHurtMeSettings"
}

export interface Navigation {
  modal: NavigationModal;
  screen: NavigationScreen;
}

export type NavigationActions = ActionType<
  typeof navigate | typeof showModal | typeof hideModal
>;

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
