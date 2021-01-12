import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {CalendarDay} from './Day';
import {CalendarMatrix} from './utils';

type Props = {
  selected: string | undefined;
  hiddenDays?: boolean;
  onSelected: (id: string) => void;
  matrix: CalendarMatrix;
};

export const CalendarMonth = memo(function Month({
  matrix,
  hiddenDays,
  onSelected,
  selected,
}: Props) {
  const handleSelected = useCallback((id: string) => () => onSelected(id), [
    onSelected,
  ]);
  return (
    <View>
      {matrix.map((row, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {row.map((col, j) => (
            <CalendarDay
              day={col}
              hiddenDays={hiddenDays}
              key={`${i}+${j}`}
              onSelected={handleSelected(col.id)}
              selectedDay={selected}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
