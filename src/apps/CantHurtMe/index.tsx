import React, {memo, useCallback, useState} from 'react';
import {Dialog, Screen} from '../../components';
import {useNav} from '../../hooks';
import {List} from './List';

const initialState = {settings: false, profile: false};

export default memo(function CantHurtMeMain() {
  const [showModal, setShowModal] = useState(initialState);
  const nav = useNav();

  const handleModalBackgroundPress = useCallback(
    () => setShowModal(initialState),
    [],
  );
  const handleProfilePress = useCallback(
    () => setShowModal({...initialState, profile: true}),
    [],
  );

  const handleSettingsPress = useCallback(
    () => setShowModal({...initialState, settings: true}),
    [],
  );

  return (
    <>
      <Screen
        border
        onLeftPress={nav.to('portfolioLanding')}
        title="Can't Hurt Me">
        <List
          onProfilePress={handleProfilePress}
          onSettingsPress={handleSettingsPress}
        />
      </Screen>
      {showModal.profile && (
        <Dialog
          duration={2000}
          onBackgroundPress={handleModalBackgroundPress}
          title="profile"
        />
      )}
      {showModal.settings && (
        <Dialog
          onBackgroundPress={handleModalBackgroundPress}
          title="settings"
        />
      )}
    </>
  );
});
