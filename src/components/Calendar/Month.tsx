import React, { memo, useCallback } from 'react';
import { v4 } from 'uuid';
import { View } from '../../components';
import { spacing } from '../../features';
import { CalendarDay } from './Day';
import { type CalendarMatrix } from './utils';

type Props = {
  hiddenDays?: boolean;
  matrix: CalendarMatrix;
  onSelected: (id: string) => void;
  selected: string | undefined;
};

export const CalendarMonth = memo(function Month({
  hiddenDays,
  matrix,
  onSelected,
  selected,
}: Props) {
  const handleSelected = useCallback(
    (id: string) => () => {
      onSelected(id);
    },
    [onSelected],
  );
  return (
    <View style={{ paddingHorizontal: spacing(2) }}>
      {matrix.map((row) => (
        <View
          key={v4()}
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}
        >
          {row.map((col) => (
            <CalendarDay
              day={col}
              hiddenDays={hiddenDays}
              key={v4()}
              onSelected={handleSelected(col.id)}
              selectedDay={selected}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
