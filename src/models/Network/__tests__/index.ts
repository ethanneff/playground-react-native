import {NetInfoState, NetInfoStateType} from '@react-native-community/netinfo';
import {getType} from 'typesafe-actions';
import {loginRequest, logout} from '../../Auth';
import {
  networkInitialState,
  networkReducer,
  NetworkState,
  updateNetwork,
} from './..';

it('updateNetwork action', () => {
  const payload: NetInfoState = {
    details: {
      isConnectionExpensive: true,
    },
    isInternetReachable: true,
    isConnected: true,
    type: NetInfoStateType.other,
  };
  const expectedAction = {
    payload,
    type: getType(updateNetwork),
  };
  expect(updateNetwork(payload)).toEqual(expectedAction);
});

it('updateNetwork', () => {
  const payload: NetInfoState = {
    details: {
      isConnectionExpensive: true,
    },
    isInternetReachable: false,
    isConnected: true,
    type: NetInfoStateType.other,
  };
  expect(
    networkReducer(networkInitialState, {
      payload,
      type: getType(updateNetwork),
    }),
  ).toEqual({
    connected: true,
    reachable: false,
    type: NetInfoStateType.other,
    details: {
      isConnectionExpensive: true,
    },
  });
});

it('logout', () => {
  const customState: NetworkState = {
    ...networkInitialState,
    reachable: true,
  };
  expect(
    networkReducer(customState, {
      type: getType(logout),
    }),
  ).toEqual(networkInitialState);
});

it('loginRequest', () => {
  expect(
    networkReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toEqual(networkInitialState);
});
