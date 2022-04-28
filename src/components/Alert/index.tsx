import React, { memo } from 'react';
import { View } from 'react-native';
import { Button, Modal, Text } from '../../components';
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
    <Modal onBackgroundPress={onBackgroundPress} showOverlay>
      <Text center title={title} type="h6" />
      <Spacing padding={2} />
      {description ? (
        <>
          <Text center title={description} />
          <Spacing padding={2} />
        </>
      ) : null}

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {onCancelPress && <Button onPress={onCancelPress} title="cancel" />}
        <Spacing padding={2} />
        {onConfirmPress && (
          <Button color="accent" onPress={onConfirmPress} title="confirm" />
        )}
      </View>
    </Modal>
  );
});
