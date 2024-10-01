import React, { useEffect } from 'react';

import { Screen, ScrollView } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { useAppDispatch } from '../../../../redux';
import { GameBoard } from './GameBoard';
import { GameKeyboard } from './GameKeyboard';
import { wordleActions } from './redux';

export const Wordle = () => {
  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();

  const colors = useColors();

  useEffect(() => {
    dispatch(wordleActions.startGame());
  }, [dispatch]);

  return (
    <Screen
      dropShadow
      onLeftPress={goBack}
      title="Wordle"
    >
      <ScrollView
        contentContainerStyle={{
          gap: spacing(4),
        }}
        style={{
          backgroundColor: colors.background.secondary,
          padding: spacing(4),
        }}
      >
        <GameBoard />
        <GameKeyboard />
      </ScrollView>
    </Screen>
  );
};
