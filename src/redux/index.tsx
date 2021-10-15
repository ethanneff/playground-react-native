import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootAction, RootState } from 'root-types';

export * from './Auth';
export * from './Device';
export * from './Dimension';
export * from './Network';
export * from './Theme';
export * from './UI';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => Dispatch<RootAction> &
  ThunkDispatch<RootState, void, RootAction> = useDispatch;
