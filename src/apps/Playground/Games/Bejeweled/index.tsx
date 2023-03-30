import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { v4 } from 'uuid';
import { Screen, TouchableOpacity, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { useColors } from '../../../../features';
import { getSmallestDimension, useRootSelector } from '../../../../redux';

type Vector = {
  x: number;
  y: number;
};
type Gem = {
  color: string;
  key: string;
};
type Board = Gem[][];
type Matches = Record<string, Vector>;

const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getInitialState = (rows: number, cols: number, gems: Gem[]): Board => {
  const col = [];
  for (let i = 0; i < cols; i++) {
    const row = [];
    for (let j = 0; j < rows; j++) row.push(gems[getRandom(gems.length)]);

    col.push(row);
  }
  return col;
};

const getMatches = (board: Board): Matches => {
  const matches: Matches = {};
  for (let i = 0; i < board.length; i++)
    for (let j = 0; j < board[i].length; j++) {
      const mid = board[i][j];
      const left = i - 1 < 0 ? undefined : board[i - 1][j];
      const right = i + 1 >= board.length ? undefined : board[i + 1][j];
      const up = j - 1 < 0 ? undefined : board[i][j - 1];
      const down = j + 1 >= board[i].length ? undefined : board[i][j + 1];
      const vertical = up?.key === mid.key && down?.key === mid.key;
      const horizontal = left?.key === mid.key && right?.key === mid.key;
      if (vertical) {
        matches[`${i}${j - 1}`] = { x: i, y: j - 1 };
        matches[`${i}${j}`] = { x: i, y: j };
        matches[`${i}${j + 1}`] = { x: i, y: j + 1 };
      }
      if (horizontal) {
        matches[`${i - 1}${j}`] = { x: i - 1, y: j };
        matches[`${i}${j}`] = { x: i, y: j };
        matches[`${i + 1}${j}`] = { x: i + 1, y: j };
      }
    }

  return matches;
};

export type States = 'fill gems' | 'idle' | 'swap back' | 'swap' | 'validate';

const initialSelected = { x: -10, y: -10 };
export const Bejeweled = memo(function PlaygroundBejeweled() {
  const { goBack } = useNavigation();
  const dimension = useRootSelector(getSmallestDimension);

  const colors = useColors();
  const styles = StyleSheet.create({
    container: { backgroundColor: colors.background.secondary },
  });

  const width = 6;
  const height = 6;
  const size = dimension / width;
  const gems: Gem[] = [
    { color: colors.background.primaryA, key: 'primary' },
    { color: colors.background.primaryB, key: 'brand' },
    { color: colors.background.positive, key: 'success' },
    { color: colors.background.accent, key: 'info' },
    { color: colors.background.warning, key: 'warning' },
    { color: colors.background.negative, key: 'danger' },
  ];

  const [board, setBoard] = useState<Board>(() =>
    getInitialState(width, height, gems),
  );
  getMatches(board);
  const [selected, setSelected] = useState(initialSelected);

  const onPress = (x: number, y: number) => () => {
    const sum = Math.abs(x - selected.x) + Math.abs(y - selected.y);
    if (sum === 0) {
      setSelected(initialSelected);
    } else if (sum === 1) {
      setBoard((prev) => {
        const temp = prev[x][y];
        prev[x][y] = prev[selected.x][selected.y];
        prev[selected.x][selected.y] = temp;
        return [...prev];
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
      <View style={styles.container}>
        {board.map((col, x) => (
          <View
            flexDirection="row"
            key={v4()}
          >
            {col.map((gem, y) => (
              <View
                key={v4()}
                style={{
                  height: size,
                  width: size,
                }}
              >
                <TouchableOpacity
                  onPress={onPress(x, y)}
                  style={{
                    backgroundColor: gem.color,
                    borderColor:
                      selected.x === x && selected.y === y
                        ? colors.border.primaryB
                        : colors.border.primaryA,
                    borderWidth: 4,
                    flex: 1,
                  }}
                />
              </View>
            ))}
          </View>
        ))}
      </View>
    </Screen>
  );
});
