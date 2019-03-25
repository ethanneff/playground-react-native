import axios from "axios";
import { ActionType, createStandardAction, getType } from "typesafe-actions";
import { RootAction, RootState, RootThunkAction } from "../../models";
import { Config } from "../../utils";

// interfaces
export interface AuthState {
  token?: string;
  loading: boolean;
  error?: string;
}
export type AuthActions = ActionType<
  | typeof loginRequest
  | typeof loginSuccess
  | typeof loginFailure
  | typeof registerRequest
  | typeof registerSuccess
  | typeof registerFailure
  | typeof logout
>;

// actions
export const loginRequest = createStandardAction("AUTH/LOGIN_REQUEST")();
export const loginSuccess = createStandardAction("AUTH/REGISTER_SUCCESS")<
  string
>();
export const loginFailure = createStandardAction("AUTH/REGISTER_FAILURE")<
  Error
>();
export const registerRequest = createStandardAction("AUTH/REGISTER_REQUEST")();
export const registerSuccess = createStandardAction("AUTH/REGISTER_SUCCESS")<
  string
>();
export const registerFailure = createStandardAction("AUTH/REGISTER_FAILURE")<
  Error
>();
export const logout = createStandardAction("Auth/LOGOUT")();

// action creators
export const onLogin = (): RootThunkAction<void> => async dispatch => {
  dispatch(loginRequest());
  try {
    const res = await axios({
      data: {
        email: "sydney@fife",
        password: "pistol"
      },
      method: "post",
      timeout: Config.app.timeout,
      url: "https://reqres.in/api/login"
    });
    dispatch(loginSuccess(res.data.token));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
export const onRegister = (): RootThunkAction<void> => async dispatch => {
  dispatch(loginRequest());
  try {
    const res = await axios({
      data: {
        email: "sydney@fife",
        password: "pistol"
      },
      method: "post",
      timeout: Config.app.timeout,
      url: "https://reqres.in/api/register"
    });
    dispatch(loginSuccess(res.data.token));
  } catch (error) {
    dispatch(loginFailure(error));
  }
};
export const onLogout = (): RootThunkAction<void> => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  dispatch(logout());
  axios({
    data: {
      token
    },
    method: "post",
    timeout: Config.app.timeout,
    url: "https://reqres.in/api/logout"
  });
};

// selectors
export const getAuthToken = (state: RootState): string | undefined =>
  state.auth.token;
export const getAuthLoading = (state: RootState): boolean => state.auth.loading;

// reducers
export const authInitialState: AuthState = {
  loading: false
};
export function authReducer(
  state: AuthState = authInitialState,
  action: RootAction
): AuthState {
  switch (action.type) {
    case getType(loginRequest):
    case getType(registerRequest):
      return {
        ...state,
        loading: true
      };
    case getType(loginFailure):
    case getType(registerFailure):
      return {
        ...state,
        error: action.payload.message,
        loading: false
      };
    case getType(loginSuccess):
    case getType(registerSuccess):
      return {
        ...state,
        loading: false,
        token: action.payload
      };
    case getType(logout):
      return authInitialState;
    default:
      return state;
  }
}
