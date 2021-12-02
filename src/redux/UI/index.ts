import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { MonoMultiColor } from '../../features/Config';
import { logout } from '../Auth';
import { changeAppStatus } from './../Device/index';

type ToggleLoading = {
  onBackgroundPress?: () => void;
  visible: boolean;
};

type ToggleAlert = {
  cancelTitle?: string;
  confirmTitle?: string;
  description?: string;
  onBackgroundPress?: () => void;
  onCancelPress?: () => void;
  onConfirmPress?: () => void;
  title?: string;
  visible: boolean;
};

type ToggleNotification = {
  description?: string;
  title?: string;
  type?: keyof MonoMultiColor;
  visible: boolean;
};

type ActionSheetItem = {
  color: keyof MonoMultiColor;
  icon: string;
  title: string;
};

type ToggleActionSheet = {
  description?: string;
  items?: ActionSheetItem[];
  onBackgroundPress?: () => void;
  onCancelPress?: () => void;
  title?: string;
  visible: boolean;
};

export const toggleLoading = createAction('ui/loading')<ToggleLoading>();
export const toggleActionSheet =
  createAction('ui/actionSheet')<ToggleActionSheet>();
export const toggleNotification =
  createAction('ui/notification')<ToggleNotification>();
export const toggleAlert = createAction('ui/alert')<ToggleAlert>();
export const uiActions = {
  toggleLoading,
  toggleActionSheet,
  toggleNotification,
  toggleAlert,
};

type UiState = {
  actionSheet: ToggleActionSheet;
  alert: ToggleAlert;
  loading: ToggleLoading;
  notification: ToggleNotification;
};

const uiInitialState: UiState = {
  loading: { visible: false },
  actionSheet: { visible: false },
  notification: { visible: false },
  alert: { visible: false },
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
    case getType(toggleAlert): {
      return { ...state, alert: action.payload };
    }
    case getType(logout): {
      return { ...uiInitialState };
    }
    case getType(changeAppStatus): {
      if (action.payload !== 'background') {
        return { ...uiInitialState };
      }
      return state;
    }
    default:
      return state;
  }
};
