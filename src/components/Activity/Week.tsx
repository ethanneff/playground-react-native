import React, { memo } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { Theme } from '../../utils';
import { Day, ActivityDay } from './Day';
import format from 'date-fns/format';

export type ActivityWeek = Array<ActivityDay>;

interface Props {
  item: ActivityWeek;
  max: number;
  index: number;
  size: number;
  margin: number;
  onPress: (item: ActivityDay) => () => void;
}

export const Week = memo(function Week({
  item,
  max,
  index,
  size,
  margin,
  onPress,
}: Props) {
  const first = item[0].date;
  const showHeader = Number(format(first, 'dd')) <= 7;
  const header = showHeader ? format(first, 'MMM') : ' ';

  return (
    <View key={index}>
      <Text
        center
        medium
        title={header}
        overline
        style={{ paddingBottom: Theme.padding.p03 }}
      />
      {item.map((day) => (
        <Day
          key={String(day.date)}
          day={day}
          max={max}
          size={size}
          margin={margin}
          onPress={onPress}
        />
      ))}
    </View>
  );
});
