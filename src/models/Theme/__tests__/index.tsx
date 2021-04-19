import {getType} from 'typesafe-actions';
import {
  changeTheme,
  getCurrentColor,
  themeInitialState,
  themeReducer,
} from '..';
import {store} from '../../../providers';
import {loginRequest, logout} from '../../Auth';

it('getCurrentColor dark', () => {
  store.dispatch(changeTheme('dark'));
  expect(getCurrentColor(store.getState())).toMatchObject({
    primary: 'hsl(263, 84%, 75%)',
  });
});

it('getCurrentColor light', () => {
  store.dispatch(changeTheme('light'));
  expect(getCurrentColor(store.getState())).toMatchObject({
    primary: 'hsl(211, 100%, 50%)',
  });
});

it('changeTheme', () => {
  const payload = 'dark';
  expect(
    themeReducer(themeInitialState, {
      payload,
      type: getType(changeTheme),
    }),
  ).toMatchObject({currentColor: payload});
});

it('logout', () => {
  expect(
    themeReducer(themeInitialState, {
      type: getType(logout),
    }),
  ).toMatchObject(themeInitialState);
});

it('loginRequest', () => {
  expect(
    themeReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toMatchObject(themeInitialState);
});
