import React, {memo} from 'react';
import {Button, Modal, Text} from '../../../components';

type Props = {
  onPress(): void;
};

export const EndGame = memo(function EndGame({onPress}: Props) {
  return (
    <Modal>
      <Text title="good try" />
      <Button onPress={onPress} title="again" />
    </Modal>
  );
});
