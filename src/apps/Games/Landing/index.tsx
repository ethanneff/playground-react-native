import React, {memo, useCallback} from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Screen} from '../../../components';

const screens = ['archero', 'flappyBird', 'papiJump', 'snake'];

export const Landing = memo(function Landing() {
  const {goBack, navigate} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);
  const onPress = useCallback((screen: string) => () => navigate(screen), [
    navigate,
  ]);
  return (
    <Screen onLeftPress={navBack} title="Arcade">
      {screens.map((screen) => (
        <Button key={screen} onPress={onPress(screen)} title={screen} />
      ))}
    </Screen>
  );
});
