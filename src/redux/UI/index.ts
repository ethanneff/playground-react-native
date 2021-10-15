import { RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';
import { MonoMultiColor } from '../../features/Config';
import { logout } from '../Auth';

type ToggleLoading = {
  visible: boolean;
  onBackgroundPress?: () => void;
};

type ToggleAlert = {
  visible: boolean;
  title: string;
  message?: string;
  onBackgroundPress?: () => void;
  confirmTitle?: string;
  onConfirmPress?: () => void;
  cancelTitle?: string;
  onCancelPress?: () => void;
};

type ToggleNotification = {
  visible: boolean;
  title: string;
  message?: string;
  type?: keyof MonoMultiColor;
};

type ActionSheetItem = {
  title: string;
  color: keyof MonoMultiColor;
  icon: string;
};

type ToggleActionSheet = {
  visible: boolean;
  title?: string;
  message?: string;
  items: ActionSheetItem[];
  onBackgroundPress?: () => void;
  onCancelPress?: () => void;
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
  loading: ToggleLoading;
  actionSheet: ToggleActionSheet;
  notification: ToggleNotification;
  alert: ToggleAlert;
};

const uiInitialState: UiState = {
  loading: { visible: false },
  actionSheet: { visible: false, items: [] },
  notification: { visible: false, title: '' },
  alert: { visible: false, title: '' },
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
    default:
      return state;
  }
};
