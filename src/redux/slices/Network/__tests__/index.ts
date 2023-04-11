import {
  NetInfoStateType,
  type NetInfoState,
} from '@react-native-community/netinfo';
import { getType } from 'typesafe-actions';
import {
  networkInitialState,
  networkReducer,
  updateNetwork,
  type NetworkState,
} from '..';
import { loginRequest, logout } from '../../Auth';

describe('network', () => {
  it('updateNetwork action', () => {
    expect.hasAssertions();
    const payload: NetInfoState = {
      details: {
        isConnectionExpensive: true,
      },
      isConnected: true,
      isInternetReachable: true,
      type: NetInfoStateType.other,
    };
    const expectedAction = {
      payload,
      type: getType(updateNetwork),
    };
    expect(updateNetwork(payload)).toStrictEqual(expectedAction);
  });

  it('updateNetwork', () => {
    expect.hasAssertions();
    const payload: NetInfoState = {
      details: {
        isConnectionExpensive: true,
      },
      isConnected: true,
      isInternetReachable: false,
      type: NetInfoStateType.other,
    };
    expect(
      networkReducer(networkInitialState, {
        payload,
        type: getType(updateNetwork),
      }),
    ).toStrictEqual({
      connected: true,
      details: {
        isConnectionExpensive: true,
      },
      reachable: false,
      type: NetInfoStateType.other,
    });
  });

  it('logout', () => {
    expect.hasAssertions();
    const customState: NetworkState = {
      ...networkInitialState,
      reachable: true,
    };
    expect(
      networkReducer(customState, {
        type: getType(logout),
      }),
    ).toStrictEqual(networkInitialState);
  });

  it('loginRequest', () => {
    expect.hasAssertions();
    expect(
      networkReducer(undefined, {
        type: getType(loginRequest),
      }),
    ).toStrictEqual(networkInitialState);
  });
});
