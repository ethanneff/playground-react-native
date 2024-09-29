import React, { useCallback } from 'react';
import { Button, Slider, Text, View } from '../../../../components';
import { spacing } from '../../../../features';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { bejeweledActions } from './redux';
import { getGame } from './utils';

export const GameHeader = () => {
  const length = useAppSelector((state) => state.games.bejeweled.board.length);
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.games.bejeweled.score);

  const handleSlide = useCallback(
    (value: number) => {
      const game = getGame(value);
      dispatch(bejeweledActions.updateGame(game));
    },
    [dispatch],
  );

  const handleStartGame = useCallback(() => {
    const board = getGame(length);
    dispatch(bejeweledActions.updateGame(board));
  }, [dispatch, length]);

  return (
    <View padding={spacing(4)}>
      <Text
        title={`score: ${score}`}
        type="body1"
      />
      <View
        alignItems="center"
        flexDirection="row"
        gap={spacing(2)}
        width="100%"
      >
        <Text
          title={`length: ${length}`}
          type="body1"
        />
        <View flex={1}>
          <Slider
            defaultValue={length}
            maximumValue={20}
            minimumValue={3}
            onSlidingComplete={handleSlide}
            step={1}
          />
        </View>
      </View>
      <View alignSelf="center">
        <Button
          color="accent"
          emphasis="high"
          onPress={handleStartGame}
          title="play game"
        />
      </View>
    </View>
  );
};
