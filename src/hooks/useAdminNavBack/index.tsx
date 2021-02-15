import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import Config from 'react-native-config';

type UseAdminNavBack = {onLeftPress: (() => void) | undefined};

export const useAdminNavBack = (): UseAdminNavBack => {
  const {goBack} = useNavigation();
  const admin = Config.APP === 'core';
  const navBack = useCallback(() => goBack(), [goBack]);
  const onLeftPress = admin ? navBack : undefined;
  return {onLeftPress};
};
