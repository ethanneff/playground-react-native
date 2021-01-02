import {RootAction} from 'root-types';
import {createAction, getType} from 'typesafe-actions';
import {
  NetInfoConnectedDetails,
  NetInfoState,
  NetInfoStateType,
} from '../../conversions';
import {logout} from '../Auth';

/* ACTIONS */
export const updateNetwork = createAction(
  'network/UPDATE_NETWORK',
)<NetInfoState>();
export const networkActions = {updateNetwork};

/* INTERFACES */
export type NetworkState = {
  connected: boolean;
  details: NetInfoConnectedDetails | null;
  reachable: boolean;
  type: NetInfoStateType;
};

/* REDUCERS */
export const networkInitialState: NetworkState = {
  connected: false,
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
        reachable: action.payload.isInternetReachable || false,
        connected: action.payload.isConnected,
        details: action.payload.details,
        type: action.payload.type,
      };
    case getType(logout):
      return networkInitialState;
    default:
      return state;
  }
};
