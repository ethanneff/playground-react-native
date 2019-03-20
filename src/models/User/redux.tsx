// action types
export enum UserActionTypes {
  USER_AUTHENTICATE = "USER_AUTHENTICATE",
  USER_EXPIRE = "USER_EXPIRE"
}

// interfaces
export interface UserState {
  auth: boolean;
}
interface UserAuthenticate {
  type: UserActionTypes.USER_AUTHENTICATE;
}
interface UserExpire {
  type: UserActionTypes.USER_EXPIRE;
}
type UserActions = UserAuthenticate | UserExpire;

// actions
export const authenticate = () => ({
  type: UserActionTypes.USER_AUTHENTICATE
});
export const expire = () => ({
  type: UserActionTypes.USER_EXPIRE
});
export const login = () => ({
  type: UserActionTypes.USER_EXPIRE
});
export const logout = () => ({
  type: UserActionTypes.USER_EXPIRE
});

// selectors
// export const isAuth = (state: RootState) => state.user.auth; // TODO:

// initial state
const initialState: UserState = {
  auth: false
};

// reducers
export function UserReducer(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.USER_AUTHENTICATE:
      return {
        auth: true,
        ...state
      };
    case UserActionTypes.USER_EXPIRE:
      return {
        auth: true,
        ...state
      };
    default:
      return state;
  }
}
