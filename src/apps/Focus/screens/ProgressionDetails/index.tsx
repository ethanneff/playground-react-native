import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useCallback } from 'react';
import { Modal, Text } from '../../../../components';
import { type AuthStackRoutes } from '../../types';

export const ProgressionDetails = memo(function ProgressionDetails() {
  const { navigate } =
    useNavigation<
      NativeStackNavigationProp<AuthStackRoutes, 'progression-details'>
    >();
  const route = useRoute<RouteProp<AuthStackRoutes, 'progression-details'>>();

  const onModalClose = useCallback(() => {
    navigate('home');
  }, [navigate]);

  return (
    <Modal onBackgroundPress={onModalClose}>
      <Text title="category detail" />
      {/* <Activity site="random" title="Deep Work" username="random" /> */}
      <Text title={route.params.category.id} />
      <Text title={route.params.category.name} />
      <Text title={route.params.category.total.toString()} />
    </Modal>
  );
});
