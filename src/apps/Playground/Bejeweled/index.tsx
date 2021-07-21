import {useNavigation} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, TouchableOpacity} from '../../../components';
import {useColor} from '../../../hooks';
import {getSmallestDimension} from '../../../models';
import {useRootSelector} from '../../../utils';

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

type Vector = {x: number; y: number};
type Gem = {key: string; color: string};
type Board = Gem[][];
type Matches = {[key: string]: Vector};

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
        matches[`${i}${j - 1}`] = {x: i, y: j - 1};
        matches[`${i}${j}`] = {x: i, y: j};
        matches[`${i}${j + 1}`] = {x: i, y: j + 1};
      }
      if (horizontal) {
        matches[`${i - 1}${j}`] = {x: i - 1, y: j};
        matches[`${i}${j}`] = {x: i, y: j};
        matches[`${i + 1}${j}`] = {x: i + 1, y: j};
      }
    }

  return matches;
};

export type States = 'idle' | 'swap' | 'validate' | 'swap back' | 'fill gems';

const initialSelected = {x: -10, y: -10};
export const Bejeweled = memo(function PlaygroundBejeweled() {
  const {goBack} = useNavigation();
  const dimension = useRootSelector(getSmallestDimension);

  const color = useColor();
  const styles = StyleSheet.create({
    container: {backgroundColor: color.background.secondary},
  });

  const width = 6;
  const height = 6;
  const size = dimension / width;
  const gems: Gem[] = [
    {key: 'primary', color: color.background.primaryA},
    {key: 'brand', color: color.background.primaryB},
    {key: 'success', color: color.background.positive},
    {key: 'info', color: color.background.accent},
    {key: 'warning', color: color.background.warning},
    {key: 'danger', color: color.background.negative},
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
      setBoard(prev => {
        const temp = prev[x][y];
        prev[x][y] = prev[selected.x][selected.y];
        prev[selected.x][selected.y] = temp;
        return [...prev];
      });
      setSelected(initialSelected);
    } else {
      setSelected({x, y});
    }
  };

  return (
    <Screen onLeftPress={goBack} title="Bejeweled">
      <View style={styles.container}>
        {board.map((col, x) => (
          <View key={`${x}${col[0].key}`} style={{flexDirection: 'row'}}>
            {col.map((gem, y) => (
              <View
                key={`${x}${y}${gem.key}`}
                style={{
                  width: size,
                  height: size,
                }}>
                <TouchableOpacity
                  onPress={onPress(x, y)}
                  style={{
                    flex: 1,
                    borderColor:
                      selected.x === x && selected.y === y
                        ? color.border.primaryB
                        : color.border.primaryA,
                    borderWidth: 4,
                    backgroundColor: gem.color,
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
