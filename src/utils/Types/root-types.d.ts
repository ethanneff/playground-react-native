declare module 'root-types' {
  import {ThunkAction} from 'redux-thunk';
  import {ActionType, StateType} from 'typesafe-actions';

  export type RootStore = StateType<
    typeof import('../../providers/Redux').store
  >;

  export type RootState = StateType<
    typeof import('../../providers/Redux').reducers
  >;

  export type RootAction = ActionType<
    typeof import('../../providers/Redux').actions
  >;

  export type RootThunkAction<R> = ThunkAction<R, RootState, any, RootAction>;
}
