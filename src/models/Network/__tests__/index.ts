import {NetInfoState, NetInfoStateType} from '@react-native-community/netinfo';
import {getType} from 'typesafe-actions';
import {loginRequest, logout} from '../../Auth';
import {
  networkInitialState,
  networkReducer,
  NetworkState,
  updateNetwork,
} from './..';

describe('network', () => {
  it('updateNetwork action', () => {
    expect.hasAssertions();
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
    expect(updateNetwork(payload)).toStrictEqual(expectedAction);
  });

  it('updateNetwork', () => {
    expect.hasAssertions();
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
    ).toStrictEqual({
      connected: true,
      reachable: false,
      type: NetInfoStateType.other,
      details: {
        isConnectionExpensive: true,
      },
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
