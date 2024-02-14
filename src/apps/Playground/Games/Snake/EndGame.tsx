import React from 'react';
import { Button, Modal, Text } from '../../../../components';

type Properties = {
  readonly onPress: () => void;
};

export const EndGame = ({ onPress }: Properties) => (
  <Modal showOverlay>
    <Text title="good try" />
    <Button
      onPress={onPress}
      title="again"
    />
  </Modal>
);
