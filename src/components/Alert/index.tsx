import React, { memo } from 'react';
import { Button, Modal, Text, View } from '../../components';
import { spacing } from '../../features';
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
      <Spacing padding={spacing(2)} />
      <Text
        center
        hidden={!description}
        style={{ paddingBottom: spacing(2) }}
        title={description}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {onCancelPress ? (
          <Button
            onPress={onCancelPress}
            title="cancel"
          />
        ) : null}
        <Spacing padding={spacing(2)} />
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
