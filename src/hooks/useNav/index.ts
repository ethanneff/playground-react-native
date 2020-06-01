import {useCallback} from 'react';
import {useRootDispatch} from '../../utils';
import {NavigationScreen} from '../../models';
import {navigate} from './../../models/Navigation';

export const useNav = () => {
  const dispatch = useRootDispatch();
  const to = useCallback(
    (screen: NavigationScreen) => () => dispatch(navigate(screen)),
    [dispatch],
  );
  return {to};
};
