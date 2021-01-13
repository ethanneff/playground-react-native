import dayjs from 'dayjs';
import React from 'react';
import {View} from 'react-native';
import {useColor} from '../../hooks';
import {colorWithOpacity, Config} from '../../utils';
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
      containerStyle={{alignItems: 'center'}}
      disabled={disabled}
      flex
      key={day.id}
      onPress={onSelected}>
      <View
        style={{
          height: Config.padding(8),
          width: Config.padding(8),
          borderRadius: Config.padding(20),
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
