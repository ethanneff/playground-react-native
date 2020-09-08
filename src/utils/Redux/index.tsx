import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {Dispatch} from 'redux';
import {RootAction, RootState} from '../../providers';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => Dispatch<RootAction> = useDispatch;
