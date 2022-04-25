import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Screen, ScrollView, Text } from '../../../components';
import { padding, useColors } from '../../../features';
import { useRootDispatch } from '../../../redux';
import { Buttons } from './Buttons';
import { GameBoard } from './GameBoard';
import { Header } from './Header';
import { resetBoard } from './redux';

export const GameOfLife = memo(function PlaygroundGameOfLife() {
  const colors = useColors();
  const [loading, setLoading] = useState(true);
  const dispatch = useRootDispatch();
  const { goBack } = useNavigation();

  useEffect(() => {
    dispatch(resetBoard(0.5));
    setLoading(false);
  }, [dispatch]);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Game of life">
      <ScrollView
        style={{
          backgroundColor: colors.background.secondary,
          padding: padding(4),
        }}
      >
        {loading ? (
          <Text center emphasis="medium" title="loading..." type="h5" />
        ) : (
          <View>
            <Header />
            <Buttons />
            <GameBoard />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
});
