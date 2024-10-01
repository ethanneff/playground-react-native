import React from 'react';
import { Screen, ScrollView } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import { GameBoard } from './GameBoard';
import { GameHeader } from './GameHeader';

// TODO: no spreads
// TODO: no mapping
// TODO: add points
// TODO: add cascading
// TODO: add animations
// TODO: determine if game is over

// TODO: add hint
// TODO: add no more moves

// TODO: points:
// lvl 1 50 each, 250 bomb, double each combo, 10 turns
// lvl 2 100 each, 500 bomb, double each combo, 20 turns

// TODO: end game
// level achieved
// best move
// longest cascade
// total time

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
