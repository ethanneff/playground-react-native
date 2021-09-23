import React, { memo, useCallback, useState } from 'react';
import { Modal, Screen, Text } from '../../components';
import { useAdminNavBack } from '../../features';
import { List } from './List';

const initialState = { settings: false, profile: false };

export const Home = memo(function CantHurtMeMain() {
  const [showModal, setShowModal] = useState(initialState);
  const { onLeftPress } = useAdminNavBack();

  const handleModalBackgroundPress = useCallback(
    () => setShowModal(initialState),
    [],
  );
  const handleProfilePress = useCallback(
    () => setShowModal({ ...initialState, profile: true }),
    [],
  );

  const handleSettingsPress = useCallback(
    () => setShowModal({ ...initialState, settings: true }),
    [],
  );

  return (
    <>
      <Screen dropShadow onLeftPress={onLeftPress} title="Can't Hurt Me">
        <List
          onProfilePress={handleProfilePress}
          onSettingsPress={handleSettingsPress}
        />
      </Screen>
      {showModal.profile && (
        <Modal
          duration={2000}
          onBackgroundPress={handleModalBackgroundPress}
          showOverlay
        >
          <Text title="profile" />
        </Modal>
      )}
      {showModal.settings && (
        <Modal
          duration={2000}
          onBackgroundPress={handleModalBackgroundPress}
          showOverlay
        >
          <Text title="settings" />
        </Modal>
      )}
    </>
  );
});
