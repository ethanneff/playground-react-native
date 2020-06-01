import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {useColor} from '../../hooks';
import {Theme, colorWithOpacity} from '../../utils';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';
import {Day} from './utils';

interface Props {
  day: Day;
  onSelected: () => void;
  selectedDay: string | undefined;
  hiddenDays?: boolean;
}

export const CalendarDay = ({
  day,
  onSelected,
  selectedDay,
  hiddenDays,
}: Props) => {
  const color = useColor();
  const selected = day.id === selectedDay;
  const today = dayjs(day.id).isSame(dayjs(), 'day');
  const backgroundColor = selected ? color.primary : 'transparent';
  const nonMonthDay = hiddenDays && !day.current;
  const textColor =
    nonMonthDay && !day.header
      ? 'transparent'
      : selected
      ? color.background
      : today
      ? color.success
      : day.current
      ? color.text
      : colorWithOpacity(color.secondary, 0.6);
  const disabled = day.header || nonMonthDay;

  return (
    <TouchableOpacity
      key={day.id}
      onPress={onSelected}
      disabled={disabled}
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          height: Theme.padding.p08,
          width: Theme.padding.p08,
          borderRadius: Theme.padding.p20,
          justifyContent: 'center',
          backgroundColor,
        }}>
        <Text
          title={day.display}
          center
          bold={today}
          style={{
            color: textColor,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
