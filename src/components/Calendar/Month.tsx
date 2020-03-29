import React, {memo, useCallback} from 'react';
import {View} from 'react-native';
import {CalendarMatrix} from './utils';
import {CalendarDay} from './Day';

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
    <>
      {matrix.map((row, i) => (
        <View key={i} style={{flexDirection: 'row'}}>
          {row.map((col) => (
            <CalendarDay
              hiddenDays={hiddenDays}
              key={col.id}
              onSelected={handleSelected(col.id)}
              day={col}
              selectedDay={selected}
            />
          ))}
        </View>
      ))}
    </>
  );
});
