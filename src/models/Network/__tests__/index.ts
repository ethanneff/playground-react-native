import {
  networkInitialState,
  networkReducer,
  NetworkState,
  updateNetwork,
} from './..';
import {NetInfoState} from '@react-native-community/netinfo';
import {NetInfoStateType} from './../../../conversions/NetInfo/index.web';

import {getType} from 'typesafe-actions';
import {logout, loginRequest} from '../../Auth';

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

it(getType(updateNetwork), () => {
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
    type: 'other',
    details: {
      isConnectionExpensive: true,
    },
  });
});

it(getType(logout), () => {
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

it(getType(loginRequest), () => {
  expect(
    networkReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toEqual(networkInitialState);
});
