import dayjs from 'dayjs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {padding} from '../../utils';
import {Text} from '../Text';
import {Day} from './Day';
import {ActivityDay, ActivityWeek} from './types';

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
  const showHeader = Number(dayjs(first).format('DD')) <= 7;
  const header = showHeader ? dayjs(first).format('MMM') : ' ';

  return (
    <View key={index}>
      <Text
        center
        emphasis="medium"
        style={{paddingBottom: padding(3)}}
        title={header}
        type="overline"
      />
      {item.map(day => (
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
