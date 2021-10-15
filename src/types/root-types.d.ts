declare module 'root-types' {
  import { AnyAction, Dispatch } from 'redux';
  import { ThunkAction } from 'redux-thunk';
  import { DeepReadonly } from 'ts-essentials';
  import { ActionType, StateType } from 'typesafe-actions';

  export type RootStore = StateType<typeof import('../redux/core').store>;

  export type RootState = DeepReadonly<
    StateType<typeof import('../redux/core').reducers>
  >;

  export type RootAction = ActionType<typeof import('../redux/core').actions>;

  export type RootDispatch = typeof import('../redux/root').store.dispatch;

  export type RootThunkAction<R> = ThunkAction<R, RootState, void, RootAction>;

  interface MiddlewareAPI<S, E extends AnyAction> {
    dispatch: Dispatch<E>;
    getState(): S;
  }

  type Middleware<S, E extends AnyAction> = (
    api: MiddlewareAPI<S, E>,
  ) => (next: Dispatch<E>) => (event: E) => ReturnType<Dispatch<E>>;

  export type RootMiddleware = Middleware<RootState, RootAction>;
}
