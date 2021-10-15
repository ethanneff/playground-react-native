import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { logout } from '../Auth';

export const toggleLoading = createAction('ui/loading')<boolean>();
export const toggleActionSheet = createAction('ui/actionSheet')<boolean>();
export const toggleToast = createAction('ui/toast')<boolean>();
export const toggleNotification = createAction('ui/notification')<boolean>();
export const toggleAlert = createAction('ui/alert')<boolean>();
export const uiActions = {
  toggleLoading,
  toggleActionSheet,
  toggleToast,
  toggleNotification,
  toggleAlert,
};

type UiState = {
  loading: boolean;
  actionSheet: boolean;
  toast: boolean;
  notification: boolean;
  alert: boolean;
};

const uiInitialState: UiState = {
  loading: false,
  actionSheet: false,
  toast: false,
  notification: false,
  alert: false,
};

export const uiReducer = (
  state: UiState = uiInitialState,
  action: RootAction,
): UiState => {
  switch (action.type) {
    case getType(toggleLoading): {
      return { ...state, loading: action.payload };
    }
    case getType(toggleActionSheet): {
      return { ...state, actionSheet: action.payload };
    }
    case getType(toggleNotification): {
      return { ...state, notification: action.payload };
    }
    case getType(toggleToast): {
      return { ...state, toast: action.payload };
    }
    case getType(toggleAlert): {
      return { ...state, alert: action.payload };
    }
    case getType(logout): {
      return { ...uiInitialState };
    }
    default:
      return state;
  }
};
