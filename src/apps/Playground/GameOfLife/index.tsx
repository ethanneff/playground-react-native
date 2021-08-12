import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Screen, Text} from '../../../components';
import {padding, useColor} from '../../../features';
import {useRootDispatch} from '../../../redux';
import {Buttons} from './Buttons';
import {GameBoard} from './GameBoard';
import {Header} from './Header';
import {resetBoard} from './redux';

export const GameOfLife = memo(function PlaygroundGameOfLife() {
  const color = useColor();
  const [loading, setLoading] = useState(true);
  const dispatch = useRootDispatch();
  const {goBack} = useNavigation();

  useEffect(() => {
    dispatch(resetBoard(0.5));
    setLoading(false);
  }, [dispatch]);

  return (
    <Screen dropShadow onLeftPress={goBack} title="Game of life">
      <ScrollView
        style={{
          backgroundColor: color.background.secondary,
          padding: padding(4),
        }}>
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
