import { getType } from 'typesafe-actions';
import {
  changeAppStatus,
  changeKeyboardStatus,
  deviceInitialState,
  deviceReducer,
  loadDevice,
} from '..';
import { logout } from '../../Auth';

describe('actions', () => {
  it('loadDevice', () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1,
    };
    const payload = {
      ...deviceInitialState,
      manufacturer: 'apple',
      screenDimensions: size,
      windowDimensions: size,
    };
    const expectedAction = {
      payload,
      type: getType(loadDevice),
    };
    expect(loadDevice(payload)).toEqual(expectedAction);
  });

  it('changeAppStatus', () => {
    const payload = 'background';
    const expectedAction = {
      payload,
      type: getType(changeAppStatus),
    };
    expect(changeAppStatus(payload)).toEqual(expectedAction);
  });

  it('changeKeyboardStatus', () => {
    const payload = true;
    const expectedAction = {
      payload,
      type: getType(changeKeyboardStatus),
    };
    expect(changeKeyboardStatus(payload)).toEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('loadDevice', () => {
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1,
    };
    const data = {
      ...deviceInitialState,
      brand: 'string',
      deviceCountry: 'string',
      deviceId: 'string',
      deviceLocale: 'string',
      deviceName: 'string',
      firstInstallTime: 123,
      fontScale: 123,
      installReferrer: 'string',
      instanceId: 'string',
      is24Hour: true,
      isEmulator: true,
      isPinOrFingerprintSet: true,
      isTablet: true,
      lastUpdateTime: 123,
      manufacturer: 'string',
      model: 'string',
      screenDimensions: size,
      systemName: 'string',
      systemVersion: 'string',
      timezone: 'string',
      userAgent: 'string',
      windowDimensions: size,
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload: data,
        type: getType(loadDevice),
      })
    ).toEqual(data);
  });

  it('changeKeyboardStatus', () => {
    expect(
      deviceReducer(deviceInitialState, {
        payload: true,
        type: getType(changeKeyboardStatus),
      })
    ).toEqual({ ...deviceInitialState, keyboardVisible: true });
  });

  it('changeAppStatus', () => {
    expect(
      deviceReducer(deviceInitialState, {
        payload: 'background',
        type: getType(changeAppStatus),
      })
    ).toEqual({ ...deviceInitialState, appStatus: 'background' });
  });

  it('logout', () => {
    expect(
      deviceReducer(deviceInitialState, {
        type: getType(logout),
      })
    ).toMatchObject(deviceInitialState);
  });
});
