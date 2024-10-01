import React from 'react';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { spacing } from '../../../../features';
import { useAppSelector } from '../../../../redux';
import { GameKey } from './GameKey';

export const GameKeyboard = () => {
  const keyboard = useAppSelector((state) => state.games.wordle.keyboard.order);

  return (
    <View gap={spacing(2)}>
      {keyboard.map((row) => (
        <View
          flexDirection="row"
          gap={spacing(2)}
          justifyContent="center"
          key={v4()}
        >
          {row.map((item) => (
            <GameKey
              key={v4()}
              value={item}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
