/* eslint-disable no-restricted-imports */
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
/* eslint-enable no-restricted-imports */
import { type Dispatch } from 'redux';
import { type ThunkDispatch } from 'redux-thunk';
import { type RootAction, type RootState } from 'root-types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => Dispatch<RootAction> &
  ThunkDispatch<RootState, void, RootAction> = useDispatch;
