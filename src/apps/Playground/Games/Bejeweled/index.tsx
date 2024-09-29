import React from 'react';
import { Screen, ScrollView } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import { GameBoard } from './GameBoard';
import { GameHeader } from './GameHeader';

export const Bejeweled = () => {
  const { goBack } = useNavigation();
  const colors = useColors();

  return (
    <Screen
      onLeftPress={goBack}
      title="Bejeweled"
    >
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <GameHeader />
        <GameBoard />
      </ScrollView>
    </Screen>
  );
};
