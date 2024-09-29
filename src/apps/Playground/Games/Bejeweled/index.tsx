import React, { useState } from 'react';
import { v4 } from 'uuid';
import {
  Pressable,
  Screen,
  ScrollView,
  Text,
  View,
} from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';

type Gem = '🔴' | '🔵' | '🟠' | '🟡' | '🟢' | '🟣';
type Board = Gem[][];
type Vector = { x: number; y: number };

const gems: Gem[] = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

const getRandom = (max: number) => Math.floor(Math.random() * max);

const getUniqueGemColor = ({
  board,
  row,
  x,
  y,
}: {
  board: Board;
  row: Gem[];
  x: number;
  y: number;
}): Gem => {
  let gem = gems[getRandom(gems.length)];
  if (x > 1) {
    while (board[x - 1][y] === gem && board[x - 2][y] === gem) {
      gem = gems[getRandom(gems.length)];
    }
  }
  if (y > 1) {
    while (row[y - 1] === gem && row[y - 2] === gem) {
      gem = gems[getRandom(gems.length)];
    }
  }

  return gem;
};

const drawBoard = (count: number): Board => {
  const board: Board = [];
  for (let x = 0; x < count; x++) {
    const row: Gem[] = [];
    for (let y = 0; y < count; y++) {
      const gem = getUniqueGemColor({ board, row, x, y });
      row.push(gem);
    }
    board.push(row);
  }
  return board;
};

const initialSelected: Vector = { x: -1, y: -1 };

export const Bejeweled = () => {
  const { goBack } = useNavigation();

  const colors = useColors();
  const score = 0;
  const [board, setBoard] = useState<Board>(() => drawBoard(8));
  const [selected, setSelected] = useState(initialSelected);

  const handlePress = (x: number, y: number) => () => {
    const sum = Math.abs(x - selected.x) + Math.abs(y - selected.y);
    if (sum === 0) {
      setSelected(initialSelected);
    } else if (sum === 1) {
      setBoard((previous) => {
        const temporary = previous[x][y];
        previous[x][y] = previous[selected.x][selected.y];
        previous[selected.x][selected.y] = temporary;
        return [...previous];
      });
      setSelected(initialSelected);
    } else {
      setSelected({ x, y });
    }
  };

  return (
    <Screen
      onLeftPress={goBack}
      title="Bejeweled"
    >
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{ backgroundColor: colors.background.secondary }}
      >
        <Text
          title="Bejeweled"
          type="h2"
        />
        <Text
          emphasis="medium"
          title={`score: ${score}`}
          type="h5"
        />
        {board.map((col, x) => (
          <View
            flexDirection="row"
            gap={spacing(0.5)}
            key={v4()}
          >
            {col.map((gem, y) => (
              <View
                gap={spacing(1)}
                key={v4()}
                padding={spacing(0.5)}
              >
                <Pressable onPressIn={handlePress(x, y)}>
                  <View
                    borderColor={
                      selected.x === x && selected.y === y
                        ? colors.border.negative
                        : 'transparent'
                    }
                    borderRadius={spacing(2)}
                    borderWidth={2}
                    padding={2}
                  >
                    <Text
                      center
                      title={gem}
                    />
                  </View>
                </Pressable>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};
