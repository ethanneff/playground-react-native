import React from 'react';
import { v4 } from 'uuid';
import { Text, View } from '../../../../components';
import { spacing, useColors } from '../../../../features';
import { useAppSelector } from '../../../../redux';

type Properties = {
  readonly x: number;
  readonly y: number;
};

export const GameCell = ({ x, y }: Properties) => {
  const colors = useColors();
  const cell = useAppSelector((state) => state.games.wordle.board.cells[x][y]);

  return (
    <View
      borderColor={colors.border.secondary}
      borderWidth={1}
      key={v4()}
      padding={spacing(3)}
    >
      <View
        absoluteFillObject
        alignItems="center"
        justifyContent="center"
      >
        <Text
          center
          title={cell.value}
        />
      </View>
      <View opacity={0}>
        <Text title="W" />
      </View>
    </View>
  );
};
