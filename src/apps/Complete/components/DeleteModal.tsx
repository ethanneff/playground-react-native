import React from 'react';
import { Button, Modal, Text, View } from '../../../components';
import { spacing } from '../../../features';

type DeleteModalProperties = {
  readonly onCancel: () => void;
  readonly onDelete: () => void;
};

export const DeleteModal = ({ onCancel, onDelete }: DeleteModalProperties) => (
  <Modal
    onBackgroundPress={onCancel}
    showOverlay
    widthPercent={0.5}
  >
    <View style={{ alignItems: 'center' }}>
      <Text
        style={{ paddingBottom: spacing(2) }}
        title="Are you sure?"
        type="h5"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          onPress={onCancel}
          title="close"
        />
        <Button
          color="negative"
          onPress={onDelete}
          title="delete"
        />
      </View>
    </View>
  </Modal>
);
