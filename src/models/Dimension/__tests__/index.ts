import {getType} from 'typesafe-actions';
import {
  dimensionInitialState,
  dimensionReducer,
  getHeight,
  getLandscapeOrientation,
  getLargestDimension,
  getSmallestDimension,
  getWidth,
  updateDimension,
} from '..';
import {loginRequest, logout} from '../../Auth';
import {store} from '../../../providers';

describe('selectors', () => {
  beforeEach(() => {
    const dimensionChange = {
      screen: {
        fontScale: 0,
        height: 0,
        scale: 0,
        width: 0,
      },
      window: {
        fontScale: 123,
        height: 456,
        scale: 123,
        width: 123,
      },
    };
    store.dispatch(updateDimension(dimensionChange));
  });

  it('getLandscapeOrientation', () => {
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getLargestDimension', () => {
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it('getSmallestDimension', () => {
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it('getHeight', () => {
    expect(getHeight(store.getState())).toBe(456);
  });
  it('getWidth', () => {
    expect(getWidth(store.getState())).toBe(123);
  });
});

describe('selectors with no initial state', () => {
  it('getLandscapeOrientation null', () => {
    expect(getLandscapeOrientation(store.getState())).toBe(false);
  });
  it('getSmallestDimension null', () => {
    expect(getSmallestDimension(store.getState())).toBe(123);
  });
  it('getLargestDimension null', () => {
    expect(getLargestDimension(store.getState())).toBe(456);
  });
  it('getHeight null', () => {
    expect(getHeight(store.getState())).toBe(456);
  });
  it('getWidth null', () => {
    expect(getWidth(store.getState())).toBe(123);
  });
});

it('updateDimension action', () => {
  const size = {
    fontScale: 1,
    height: 1,
    scale: 1,
    width: 1,
  };
  const payload = {window: size, screen: size};
  const expectedAction = {
    payload,
    type: getType(updateDimension),
  };
  expect(updateDimension(payload)).toEqual(expectedAction);
});

it(getType(updateDimension), () => {
  const size = {
    fontScale: 123,
    height: 123,
    scale: 123,
    width: 123,
  };
  const data = {
    screen: size,
    window: size,
  };
  expect(
    dimensionReducer(dimensionInitialState, {
      payload: data,
      type: getType(updateDimension),
    }),
  ).toMatchObject({
    ...dimensionInitialState,
    screen: size,
    window: size,
  });
});

it(getType(logout), () => {
  expect(
    dimensionReducer(dimensionInitialState, {
      type: getType(logout),
    }),
  ).toMatchObject(dimensionInitialState);
});

it(getType(loginRequest), () => {
  expect(
    dimensionReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toMatchObject(dimensionInitialState);
});
