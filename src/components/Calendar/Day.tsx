import dayjs from 'dayjs';
import React from 'react';
import { View } from 'react-native';
import { padding, useColors } from '../../features';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';
import { Day } from './utils';

type Props = {
  day: Day;
  hiddenDays?: boolean;
  onSelected: () => void;
  selectedDay: string | undefined;
};

export const CalendarDay = ({
  day,
  onSelected,
  selectedDay,
  hiddenDays,
}: Props): JSX.Element => {
  const colors = useColors();
  const selected = day.id === selectedDay;
  const today = dayjs(day.id).isSame(dayjs(), 'day');
  const backgroundColor = selected ? colors.background.accent : 'transparent';
  const nonMonthDay = hiddenDays && !day.current;
  const textColor =
    nonMonthDay && !day.header
      ? 'transparent'
      : selected
      ? colors.text.primaryB
      : today
      ? colors.text.positive
      : day.current
      ? colors.text.primaryA
      : colors.text.tertiary;
  const disabled = day.header || nonMonthDay;

  return (
    <TouchableOpacity
      disabled={disabled}
      flex
      key={day.id}
      onPress={onSelected}
      style={{ alignItems: 'center' }}
    >
      <View
        style={{
          height: padding(8),
          width: padding(8),
          borderRadius: padding(20),
          justifyContent: 'center',
          backgroundColor,
        }}
      >
        <Text
          bold={today}
          center
          style={{ color: textColor }}
          title={day.display}
        />
      </View>
    </TouchableOpacity>
  );
};
