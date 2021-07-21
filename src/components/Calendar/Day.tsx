import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {useColor} from '../../hooks';
import {padding} from '../../utils';
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
}: Props): JSX.Element => {
  const color = useColor();
  const selected = day.id === selectedDay;
  const today = dayjs(day.id).isSame(dayjs(), 'day');
  const backgroundColor = selected ? color.background.accent : 'transparent';
  const nonMonthDay = hiddenDays && !day.current;
  const textColor =
    nonMonthDay && !day.header
      ? 'transparent'
      : selected
      ? color.text.primaryB
      : today
      ? color.text.positive
      : day.current
      ? color.text.primaryA
      : color.text.tertiary;
  const disabled = day.header || nonMonthDay;

  return (
    <TouchableOpacity
      containerStyle={{alignItems: 'center'}}
      disabled={disabled}
      flex
      key={day.id}
      onPress={onSelected}>
      <View
        style={{
          height: padding(8),
          width: padding(8),
          borderRadius: padding(20),
          justifyContent: 'center',
          backgroundColor,
        }}>
        <Text
          bold={today}
          center
          style={{color: textColor}}
          title={day.display}
        />
      </View>
    </TouchableOpacity>
  );
};
