import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Screen, TouchableOpacity} from '../../../components';
import {useColor, useNav} from '../../../hooks';
import {useRootSelector} from '../../../utils';
import {getSmallestDimension} from '../../../models';

const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getInitialState = (size: number, gems: Gem[]) => {
  return Array(size)
    .fill(0)
    .map(() =>
      Array(size)
        .fill(0)
        .map(() => gems[getRandom(gems.length)]),
    );
};

type Gem = {
  key: string;
  color: string;
};

export type States = 'idle' | 'swap' | 'validate' | 'swap back' | 'fill gems';

const initialSelected = {x: -10, y: -10};
export default memo(function PlaygroundBejeweled() {
  const nav = useNav();
  const dimension = useRootSelector(getSmallestDimension);

  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background,
    },
  });

  const count = 8;
  const size = dimension / 8;
  const gems: Gem[] = [
    {key: 'primary', color: color.primary},
    {key: 'brand', color: color.brand},
    {key: 'success', color: color.success},
    {key: 'info', color: color.info},
    {key: 'warning', color: color.warning},
    {key: 'danger', color: color.danger},
  ];

  const [board, setBoard] = useState(() => getInitialState(count, gems));
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
      setSelected({x, y});
    }
  };

  return (
    <Screen onLeftPress={nav.to('playground')} title="Bejeweled">
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
                        ? color.text
                        : color.background,
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
