import { getType } from 'typesafe-actions';
import {
  deviceInitialState,
  deviceReducer,
  setDimensions,
  setKeyboardHeight,
  setStatus,
} from '..';
import { logout } from '../../Auth';

describe('actions', () => {
  it('setDimensions', () => {
    expect.hasAssertions();
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1,
    };
    const payload = {
      screen: size,
      window: size,
    };
    const expectedAction = {
      payload,
      type: getType(setDimensions),
    };
    expect(setDimensions(payload)).toStrictEqual(expectedAction);
  });

  it('setStatus', () => {
    expect.hasAssertions();
    const payload = 'background';
    const expectedAction = {
      payload,
      type: getType(setStatus),
    };
    expect(setStatus(payload)).toStrictEqual(expectedAction);
  });

  it('setKeyboard', () => {
    expect.hasAssertions();
    const payload = 400;
    const expectedAction = {
      payload,
      type: getType(setKeyboardHeight),
    };
    expect(setKeyboardHeight(payload)).toStrictEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('setDimensions', () => {
    expect.hasAssertions();
    const size = {
      fontScale: 1,
      height: 1,
      scale: 1,
      width: 1,
    };
    const payload = {
      screen: size,
      window: size,
    };
    const data = {
      ...deviceInitialState,
      dimensions: payload,
    };
    expect(
      deviceReducer(deviceInitialState, {
        payload,
        type: getType(setDimensions),
      }),
    ).toStrictEqual(data);
  });

  it('setKeyboardHeight', () => {
    expect.hasAssertions();
    const payload = 123;

    expect(
      deviceReducer(deviceInitialState, {
        payload,
        type: getType(setKeyboardHeight),
      }),
    ).toStrictEqual({
      ...deviceInitialState,
      keyboardHeight: payload,
    });
  });

  it('setStatus', () => {
    expect.hasAssertions();
    expect(
      deviceReducer(deviceInitialState, {
        payload: 'background',
        type: getType(setStatus),
      }),
    ).toStrictEqual({ ...deviceInitialState, status: 'background' });
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
