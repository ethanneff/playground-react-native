import axios from 'axios';
import { RootAction, RootState, RootThunkAction } from 'root-types';
import { createAction, getType } from 'typesafe-actions';

/* ACTIONS */
export const loginRequest = createAction('AUTH/LOGIN_REQUEST')();
export const loginSuccess = createAction('AUTH/REGISTER_SUCCESS')<string>();
export const loginFailure = createAction('AUTH/REGISTER_FAILURE')<Error>();
export const registerRequest = createAction('AUTH/REGISTER_REQUEST')();
export const registerSuccess = createAction('AUTH/REGISTER_SUCCESS')<string>();
export const registerFailure = createAction('AUTH/REGISTER_FAILURE')<Error>();
export const logout = createAction('Auth/LOGOUT')();

const timeout = 5000;

/* ACTION CREATORS */
export const onLogin = (): RootThunkAction<void> => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios({
      data: {
        email: 'sydney@fife',
        password: 'pistol',
      },
      method: 'post',
      timeout,
      url: 'https://reqres.in/api/login',
    });
    dispatch(loginSuccess(res.data.token));
  } catch (e) {
    if (e instanceof Error) dispatch(loginFailure(e));
  }
};
export const onRegister = (): RootThunkAction<void> => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const res = await axios({
      data: {
        email: 'sydney@fife',
        password: 'pistol',
      },
      method: 'post',
      timeout,
      url: 'https://reqres.in/api/register',
    });
    dispatch(loginSuccess(res.data.token));
  } catch (e) {
    if (e instanceof Error) dispatch(loginFailure(e));
  }
};
export const onLogout = (): RootThunkAction<void> => (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch(logout());
  axios({
    data: {
      token,
    },
    method: 'post',
    timeout,
    url: 'https://reqres.in/api/logout',
  });
};

export const authActions = {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  logout,
};

/* SELECTORS */
export const getAuthToken = (state: RootState): string | undefined =>
  state.auth.token;
export const getAuthLoading = (state: RootState): boolean => state.auth.loading;

/* INTERFACES */
export interface AuthState {
  token?: string;
  loading: boolean;
  error?: string;
}

/* REDUCERS */
export const authInitialState: AuthState = {
  loading: false,
};
export const authReducer = (
  state: AuthState = authInitialState,
  action: RootAction,
): AuthState => {
  switch (action.type) {
    case getType(loginRequest):
    case getType(registerRequest):
      return {
        ...state,
        loading: true,
      };
    case getType(loginFailure):
    case getType(registerFailure):
      return {
        ...state,
        error: action.payload.message,
        loading: false,
      };
    case getType(loginSuccess):
    case getType(registerSuccess):
      return {
        ...state,
        loading: false,
        token: action.payload,
      };
    case getType(logout):
      return authInitialState;
    default:
      return state;
  }
};
