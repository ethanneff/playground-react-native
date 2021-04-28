import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootAction, RootState} from 'root-types';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => Dispatch<RootAction> &
  ThunkDispatch<RootState, any, RootAction> = useDispatch;
