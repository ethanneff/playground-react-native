import React, {memo, useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Dialog, Screen} from '../../components';
import {List} from './List';

const initialState = {settings: false, profile: false};

export const Home = memo(function CantHurtMeMain() {
  const [showModal, setShowModal] = useState(initialState);
  const {goBack} = useNavigation();

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

  const navBack = useCallback(() => goBack(), [goBack]);

  return (
    <>
      <Screen border onLeftPress={navBack} title="Can't Hurt Me">
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
