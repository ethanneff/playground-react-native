import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/core';

export const useNav = () => {
  const navigation = useNavigation();
  return useCallback((screen: string) => () => navigation.navigate(screen), [
    navigation,
  ]);
};
