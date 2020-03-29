import {navigate} from './../../models/Navigation';
import {useRootDispatch} from '../../utils';
import {NavigationScreen} from '../../models';
import {useCallback} from 'react';

export const useNav = () => {
  const dispatch = useRootDispatch();
  const to = useCallback(
    (screen: NavigationScreen) => () => dispatch(navigate(screen)),
    [dispatch],
  );
  return {to};
};
