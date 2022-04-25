import React, { memo } from 'react';
import { View } from 'react-native';
import { Button, Modal, Text } from '../../components';

type Props = {
  description: string;
  onBackgroundPress?: () => void;
  onCancelPress: () => void;
  onConfirmPress: () => void;
  title: string;
};

export const Alert = memo(function Alert({
  description,
  onBackgroundPress,
  onCancelPress,
  onConfirmPress,
  title,
}: Props) {
  return (
    <Modal onBackgroundPress={onBackgroundPress} showOverlay>
      <Text title={title} />
      <Text title={description} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button onPress={onCancelPress} title="cancel" />
        <Button onPress={onConfirmPress} title="confirm" />
      </View>
    </Modal>
  );
});
