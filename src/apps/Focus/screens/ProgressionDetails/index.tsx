import React, { useCallback } from 'react';
import { Modal, Text } from '../../../../components';
import {
  useNavigation,
  useRoute,
  type RouteProp,
  type StackNavigationProp,
} from '../../../../conversions';
import { type AuthStackRoutes } from '../../types';

export const ProgressionDetails = () => {
  const { navigate } =
    useNavigation<
      StackNavigationProp<AuthStackRoutes, 'progression-details'>
    >();
  const route = useRoute<RouteProp<AuthStackRoutes, 'progression-details'>>();

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
