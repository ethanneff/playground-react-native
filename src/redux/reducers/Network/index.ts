import {
  type NetInfoState,
  NetInfoStateType,
  type NetInfoConnectedDetails,
} from '@react-native-community/netinfo';
import { type RootAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';

import { logout } from '../Auth';

/* ACTIONS */
export const updateNetwork = createAction('network/update')<NetInfoState>();
export const networkActions = { updateNetwork };

/* INTERFACES */
export type NetworkState = {
  connected: boolean | null;
  details: NetInfoConnectedDetails | null;
  reachable: boolean;
  type: NetInfoStateType;
};

/* REDUCERS */
export const networkInitialState: NetworkState = {
  connected: null,
  details: null,
  reachable: false,
  type: NetInfoStateType.unknown,
};

export const networkReducer = (
  state: NetworkState = networkInitialState,
  action: RootAction,
): NetworkState => {
  switch (action.type) {
    case getType(updateNetwork):
      return {
        ...state,
        connected: action.payload.isConnected,
        details: action.payload.details,
        reachable: action.payload.isInternetReachable ?? false,
        type: action.payload.type,
      };
    case getType(logout):
      return networkInitialState;
    default:
      return state;
  }
};
