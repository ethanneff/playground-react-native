import dayjs from 'dayjs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {padding} from '../../utils';
import {Icon} from '../Icon';
import {Text} from '../Text';
import {TouchableOpacity} from '../TouchableOpacity';

interface Props {
  unix: number;
  onMonthIncrease(): void;
  onMonthDecrease(): void;
  onTitlePress(): void;
}
export const CalendarHeader = memo(function CalendarHeader({
  unix,
  onTitlePress,
  onMonthIncrease,
  onMonthDecrease,
}: Props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onMonthDecrease}>
        <Icon name="chevron-left" padded size={padding(6)} />
      </TouchableOpacity>
      <TouchableOpacity
        containerStyle={{justifyContent: 'center', alignItems: 'center'}}
        flex
        onPress={onTitlePress}>
        <Text center title={dayjs(unix).format('MMMM YYYY')} type="h5" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMonthIncrease}>
        <Icon name="chevron-right" padded size={padding(6)} />
      </TouchableOpacity>
    </View>
  );
});
