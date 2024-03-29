import React from 'react';
import { Button, Modal, Text, View } from '../../components';
import { spacing } from '../../features';
import { Spacing } from '../Spacing';

type Properties = {
  readonly description?: string;
  readonly onBackgroundPress?: () => void;
  readonly onCancelPress?: () => void;
  readonly onConfirmPress?: () => void;
  readonly title: string;
};

export const Alert = ({
  description,
  onBackgroundPress,
  onCancelPress,
  onConfirmPress,
  title,
}: Properties) => (
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
