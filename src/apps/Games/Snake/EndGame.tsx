import React, { memo } from "react";
import { Modal, Text, Button } from "../../../components";

interface Props {
  onPress(): void;
}

export const EndGame = memo(function EndGame({ onPress }: Props) {
  return (
    <Modal>
      <Text title="good try" />
      <Button title="again" onPress={onPress} />
    </Modal>
  );
});
