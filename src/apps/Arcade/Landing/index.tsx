import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {Button, Screen} from '../../../components';
import {useAdminNavBack, useColor} from '../../../hooks';
import {arcadeScreens} from '../types';

export const Landing = memo(function Landing() {
  const color = useColor();
  const {navigate} = useNavigation();
  const {onLeftPress} = useAdminNavBack();
  const onPress = useCallback(
    (screen: string) => () => navigate(screen),
    [navigate],
  );

  return (
    <Screen onLeftPress={onLeftPress} title="Arcade">
      <ScrollView style={{backgroundColor: color.background.secondary}}>
        {arcadeScreens.map(screen => (
          <Button key={screen} onPress={onPress(screen)} title={screen} />
        ))}
      </ScrollView>
    </Screen>
  );
});
