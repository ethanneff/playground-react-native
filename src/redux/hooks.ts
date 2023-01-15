import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { type Dispatch } from 'redux';
import { type ThunkDispatch } from 'redux-thunk';
import { type RootAction, type RootState } from 'root-types';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => Dispatch<RootAction> &
  ThunkDispatch<RootState, void, RootAction> = useDispatch;
