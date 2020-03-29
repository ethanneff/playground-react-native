import {getType} from 'typesafe-actions';
import {
  ColorTheme,
  changeTheme,
  themeInitialState,
  themeReducer,
  getCurrentColor,
} from '..';
import {logout, loginRequest} from '../../Auth';
import {store} from '../../../containers';

it('getCurrentColor dark', () => {
  store.dispatch(changeTheme(ColorTheme.Dark));
  expect(getCurrentColor(store.getState())).toMatchObject({
    primary: 'hsl(263, 84%, 75%)',
  });
});

it('getCurrentColor light', () => {
  store.dispatch(changeTheme(ColorTheme.Light));
  expect(getCurrentColor(store.getState())).toMatchObject({
    primary: 'hsl(211, 100%, 50%)',
  });
});

it(getType(changeTheme), () => {
  const payload = ColorTheme.Dark;
  expect(
    themeReducer(themeInitialState, {
      payload,
      type: getType(changeTheme),
    }),
  ).toMatchObject({currentColor: payload});
});

it(getType(logout), () => {
  expect(
    themeReducer(themeInitialState, {
      type: getType(logout),
    }),
  ).toMatchObject(themeInitialState);
});

it(getType(loginRequest), () => {
  expect(
    themeReducer(undefined, {
      type: getType(loginRequest),
    }),
  ).toMatchObject(themeInitialState);
});
