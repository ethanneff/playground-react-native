import React, { useCallback } from 'react';
import { Modal, Text } from '../../../../components';
import {
  type StackNavigationProperty,
  useNavigation,
  useRoute,
  type RouteProp as RouteProperty,
} from '../../../../conversions';
import { type AuthStackRoutes } from '../../types';

export const ProgressionDetails = () => {
  const { navigate } =
    useNavigation<
      StackNavigationProperty<AuthStackRoutes, 'progression-details'>
    >();
  const route =
    useRoute<RouteProperty<AuthStackRoutes, 'progression-details'>>();

  const onModalClose = useCallback(() => {
    navigate('home');
  }, [navigate]);

  return (
    <Modal
      onBackgroundPress={onModalClose}
      showOverlay
    >
      <Text title="category detail" />
      {/* <Activity site="random" title="Deep Work" username="random" /> */}
      <Text title={route.params.category.id} />
      <Text title={route.params.category.name} />
      <Text title={route.params.category.total.toString()} />
    </Modal>
  );
};
