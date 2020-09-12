import {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

type UseNav = (screen: string) => () => void;

export const useNav = (): UseNav => {
  const navigation = useNavigation();
  return useCallback((screen: string) => () => navigation.navigate(screen), [
    navigation,
  ]);
};
