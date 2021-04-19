import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Screen, Text} from '../../../components';
import {useColor} from '../../../hooks';
import {config, useRootDispatch} from '../../../utils';
import {Buttons} from './Buttons';
import {GameBoard} from './GameBoard';
import {Header} from './Header';
import {resetBoard} from './redux';

export const GameOfLife = memo(function PlaygroundGameOfLife() {
  const color = useColor();
  const [loading, setLoading] = useState(true);
  const dispatch = useRootDispatch();
  const {goBack} = useNavigation();
  const navBack = useCallback(() => goBack(), [goBack]);

  useEffect(() => {
    dispatch(resetBoard(0.5));
    setLoading(false);
  }, [dispatch]);

  return (
    <Screen dropShadow onLeftPress={navBack} title="Game of life">
      <ScrollView
        style={{backgroundColor: color.surface, padding: config.padding(4)}}>
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
