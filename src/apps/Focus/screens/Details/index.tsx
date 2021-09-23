import { useNavigation, useRoute } from '@react-navigation/native';
import React, { memo, useCallback } from 'react';
import { Modal, Text } from '../../../../components';
import { ItemScreenNavigationProp, ItemScreenRouteProp } from '../../types';

export const Details = memo(function Details() {
  const { navigate } = useNavigation<ItemScreenNavigationProp>();
  const route = useRoute<ItemScreenRouteProp>();

  const onModalClose = useCallback(() => {
    navigate('home');
  }, [navigate]);

  return (
    <Modal onBackgroundPress={onModalClose}>
      <Text title={route.params.item.title || 'empty'} />
    </Modal>
  );
});
