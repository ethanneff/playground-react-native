import React, { memo } from 'react';
import { View } from 'react-native';
import { Button, Modal, Text } from '../../components';
import { padding } from '../../features';
import { Spacing } from '../Spacing';

type Props = {
  description?: string;
  onBackgroundPress?: () => void;
  onCancelPress?: () => void;
  onConfirmPress?: () => void;
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
    <Modal
      onBackgroundPress={onBackgroundPress}
      showOverlay
    >
      <Text
        center
        title={title}
        type="h6"
      />
      <Spacing padding={2} />
      <Text
        center
        hidden={!description}
        style={{ paddingBottom: padding(2) }}
        title={description}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {onCancelPress ? (
          <Button
            onPress={onCancelPress}
            title="cancel"
          />
        ) : null}
        <Spacing padding={2} />
        {onConfirmPress ? (
          <Button
            color="accent"
            onPress={onConfirmPress}
            title="confirm"
          />
        ) : null}
      </View>
    </Modal>
  );
});
