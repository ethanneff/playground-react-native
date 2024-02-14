import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { v4 } from 'uuid';
import { Pressable, Screen, ScrollView, View } from '../../../../components';
import { useNavigation } from '../../../../conversions';
import { spacing, useColors } from '../../../../features';
import { getSmallestDimension, useAppSelector } from '../../../../redux';

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

const getRandom = (max: number) => Math.floor(Math.random() * max);

const getInitialState = (rows: number, cols: number, gems: Gem[]): Board => {
  const col = [];
  for (let rowIndex = 0; rowIndex < cols; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < rows; colIndex++)
      row.push(gems[getRandom(gems.length)]);
    col.push(row);
  }
  return col;
};

const getMatches = (board: Board): Matches => {
  const matches: Matches = {};
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++)
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      const mid = board[rowIndex][colIndex];
      const left = rowIndex - 1 < 0 ? undefined : board[rowIndex - 1][colIndex];
      const right =
        rowIndex + 1 >= board.length
          ? undefined
          : board[rowIndex + 1][colIndex];
      const up = colIndex - 1 < 0 ? undefined : board[rowIndex][colIndex - 1];
      const down =
        colIndex + 1 >= board[rowIndex].length
          ? undefined
          : board[rowIndex][colIndex + 1];
      const vertical = up?.key === mid.key && down?.key === mid.key;
      const horizontal = left?.key === mid.key && right?.key === mid.key;
      if (vertical) {
        matches[`${rowIndex}${colIndex - 1}`] = {
          x: rowIndex,
          y: colIndex - 1,
        };
        matches[`${rowIndex}${colIndex}`] = { x: rowIndex, y: colIndex };
        matches[`${rowIndex}${colIndex + 1}`] = {
          x: rowIndex,
          y: colIndex + 1,
        };
      }
      if (horizontal) {
        matches[`${rowIndex - 1}${colIndex}`] = {
          x: rowIndex - 1,
          y: colIndex,
        };
        matches[`${rowIndex}${colIndex}`] = { x: rowIndex, y: colIndex };
        matches[`${rowIndex + 1}${colIndex}`] = {
          x: rowIndex + 1,
          y: colIndex,
        };
      }
    }

  return matches;
};

const initialSelected = { x: -10, y: -10 };

export const Bejeweled = () => {
  const { goBack } = useNavigation();
  const dimension = useAppSelector(getSmallestDimension);

  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background.secondary,
      padding: spacing(4),
    },
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
      <ScrollView style={styles.container}>
        {board.map((col, x) => (
          <View
            flexDirection="row"
            gap={spacing(2)}
            key={v4()}
          >
            {col.map((gem, y) => (
              <View
                flex={1}
                gap={spacing(2)}
                height={size - spacing(4)}
                key={v4()}
              >
                <Pressable
                  containerStyle={{
                    backgroundColor: gem.color,
                    borderColor:
                      selected.x === x && selected.y === y
                        ? colors.background.primaryB
                        : colors.background.secondary,
                    borderWidth: 4,
                    flex: 1,
                  }}
                  onPress={onPress(x, y)}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};
