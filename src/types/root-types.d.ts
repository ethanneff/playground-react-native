declare module 'root-types' {
  import { type AnyAction, type Dispatch } from 'redux';
  import { type ThunkAction } from 'redux-thunk';
  import { type DeepReadonly } from 'ts-essentials';
  import { type ActionType, type StateType } from 'typesafe-actions';

  export type RootStore = StateType<typeof import('../redux/store').store>;

  export type RootState = DeepReadonly<
    StateType<typeof import('../redux/store').reducers>
  >;

  export type RootAction = ActionType<typeof import('../redux/store').actions>;

  export type RootDispatch = typeof import('../redux/store').store.dispatch;

  export type RootThunkAction<R> = ThunkAction<R, RootState, void, RootAction>;

  type MiddlewareAPI<S, E extends AnyAction> = {
    dispatch: Dispatch<E>;
    getState: () => S;
  };

  type Middleware<S, E extends AnyAction> = (
    api: MiddlewareAPI<S, E>,
  ) => (next: Dispatch<E>) => (event: E) => ReturnType<Dispatch<E>>;

  export type RootMiddleware = Middleware<RootState, RootAction>;
}
