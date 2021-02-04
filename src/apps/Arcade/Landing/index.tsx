import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {Button} from 'react-native';
import {Screen} from '../../../components';
import {useAdminNavBack} from '../../../hooks';
import {arcadeScreens} from '../types';

export const Landing = memo(function Landing() {
  const {navigate} = useNavigation();
  const {onLeftPress} = useAdminNavBack();
  const onPress = useCallback((screen: string) => () => navigate(screen), [
    navigate,
  ]);

  return (
    <Screen onLeftPress={onLeftPress} title="Arcade">
      {arcadeScreens.map((screen) => (
        <Button key={screen} onPress={onPress(screen)} title={screen} />
      ))}
    </Screen>
  );
});
