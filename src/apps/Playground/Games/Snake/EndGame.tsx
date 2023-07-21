import React from 'react';
import { Button, Modal, Text } from '../../../../components';

type Props = {
  readonly onPress: () => void;
};

export const EndGame = ({ onPress }: Props) => (
  <Modal showOverlay>
    <Text title="good try" />
    <Button
      onPress={onPress}
      title="again"
    />
  </Modal>
);
