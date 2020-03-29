import {getType} from 'typesafe-actions';
import {
  getScreen,
  navigate,
  navigationReducer,
  navigationInitialState,
} from '..';
import {logout, loginRequest} from '../../Auth';
import {store} from '../../../containers';

it('getScreen selector', () => {
  expect(getScreen(store.getState())).toEqual('portfolioLanding');
});

it(getType(navigate), () => {
  const payload = 'focus';
  expect(
    navigationReducer(navigationInitialState, {
      payload,
      type: getType(navigate),
    }),
  ).toMatchObject({screen: payload});
});

it(getType(logout), () => {
  expect(
    navigationReducer(navigationInitialState, {
      type: getType(logout),
    }),
  ).toMatchObject(navigationInitialState);
});

it(getType(loginRequest), () => {
  expect(
    navigationReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toMatchObject(navigationInitialState);
});
