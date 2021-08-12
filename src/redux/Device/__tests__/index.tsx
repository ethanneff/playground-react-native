import {getType} from 'typesafe-actions';
import {
  changeAppStatus,
  changeKeyboardStatus,
  deviceInitialState,
  deviceReducer,
  loadDevice,
} from '..';
import {logout} from '../../Auth';

describe('actions', () => {
  it('loadDevice', () => {
    expect.hasAssertions();
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
    expect(loadDevice(payload)).toStrictEqual(expectedAction);
  });

  it('changeAppStatus', () => {
    expect.hasAssertions();
    const payload = 'background';
    const expectedAction = {
      payload,
      type: getType(changeAppStatus),
    };
    expect(changeAppStatus(payload)).toStrictEqual(expectedAction);
  });

  it('changeKeyboardStatus', () => {
    expect.hasAssertions();
    const payload = 43;
    const expectedAction = {
      payload,
      type: getType(changeKeyboardStatus),
    };
    expect(changeKeyboardStatus(payload)).toStrictEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('loadDevice', () => {
    expect.hasAssertions();
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
      }),
    ).toStrictEqual(data);
  });

  it('changeKeyboardStatus', () => {
    expect.hasAssertions();
    expect(
      deviceReducer(deviceInitialState, {
        payload: 12,
        type: getType(changeKeyboardStatus),
      }),
    ).toStrictEqual({
      ...deviceInitialState,
      keyboardVisible: true,
      keyboardHeight: 12,
    });
  });

  it('changeAppStatus', () => {
    expect.hasAssertions();
    expect(
      deviceReducer(deviceInitialState, {
        payload: 'background',
        type: getType(changeAppStatus),
      }),
    ).toStrictEqual({...deviceInitialState, appStatus: 'background'});
  });

  it('logout', () => {
    expect.hasAssertions();
    expect(
      deviceReducer(deviceInitialState, {
        type: getType(logout),
      }),
    ).toMatchObject(deviceInitialState);
  });
});
