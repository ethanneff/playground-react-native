import React, { memo } from 'react';
import { View } from 'react-native';
import { Button, Modal, Text } from '../../components';
import { useRootSelector } from '../../redux';

export const AlertScreen = memo(function AlertScreen() {
  const {
    visible,
    onBackgroundPress,
    onCancelPress,
    onConfirmPress,
    title,
    description,
  } = useRootSelector((state) => state.ui.alert);

  return visible ? (
    <Modal onBackgroundPress={onBackgroundPress} showOverlay>
      <Text title={title} />
      <Text title={description} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button onPress={onCancelPress} title="cancel" />
        <Button onPress={onConfirmPress} title="confirm" />
      </View>
    </Modal>
  ) : null;
});
