declare module 'root-types' {
  import {ThunkAction} from 'redux-thunk';
  import {DeepReadonly} from 'ts-essentials';
  import {ActionType, StateType} from 'typesafe-actions';

  export type RootStore = StateType<typeof import('../redux/core').store>;

  export type RootState = DeepReadonly<
    StateType<typeof import('../redux/core').reducers>
  >;

  export type RootAction = ActionType<typeof import('../redux/core').actions>;

  export type RootDispatch = typeof import('../redux/root').store.dispatch;

  export type RootThunkAction<R> = ThunkAction<R, RootState, any, RootAction>;
}
