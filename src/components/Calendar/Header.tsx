import dayjs from 'dayjs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {padding} from '../../features/Config';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';

type Props = {
  unix: number;
  onMonthIncrease(): void;
  onMonthDecrease(): void;
  onTitlePress(): void;
};
export const CalendarHeader = memo(function CalendarHeader({
  unix,
  onTitlePress,
  onMonthIncrease,
  onMonthDecrease,
}: Props) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity onPress={onMonthDecrease}>
        <Icon name="chevron-left" padded size={padding(6)} />
      </TouchableOpacity>
      <TouchableOpacity
        flex
        onPress={onTitlePress}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text center title={dayjs(unix).format('MMMM YYYY')} type="h5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMonthIncrease}>
        <Icon name="chevron-right" padded size={padding(6)} />
      </TouchableOpacity>
    </View>
  );
});
