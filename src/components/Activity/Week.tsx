import { format, toDate } from 'date-fns';

import React, { memo } from 'react';
import { View } from '../../components';
import { spacing } from '../../features';
import { Text } from '../Text';
import { Day } from './Day';
import { type ActivityDay, type ActivityWeek } from './types';

type Props = {
  item: ActivityWeek;
  margin: number;
  max: number;
  onPress: (item: ActivityDay) => () => void;
  size: number;
};

export const Week = memo(function Week({
  item,
  margin,
  max,
  onPress,
  size,
}: Props) {
  const first = toDate(item[0].date);
  const showHeader = Number(format(first, 'dd')) <= 7;
  const header = showHeader ? format(first, 'MMM') : ' ';

  return (
    <View>
      <Text
        center
        emphasis="medium"
        style={{ paddingBottom: spacing(3) }}
        title={header}
        type="overline"
      />
      {item.map((day) => (
        <Day
          day={day}
          key={String(day.date)}
          margin={margin}
          max={max}
          onPress={onPress}
          size={size}
        />
      ))}
    </View>
  );
});
