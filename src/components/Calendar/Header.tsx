import dayjs from 'dayjs';
import React, {memo} from 'react';
import {View} from 'react-native';
import {config} from '../../utils';
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
      <Icon
        name="chevron-left"
        onPress={onMonthDecrease}
        padded
        size={config.padding(6)}
      />
      <TouchableOpacity
        containerStyle={{justifyContent: 'center', alignItems: 'center'}}
        flex
        onPress={onTitlePress}>
        <Text center title={dayjs(unix).format('MMMM YYYY')} type="h5" />
      </TouchableOpacity>
      <Icon
        name="chevron-right"
        onPress={onMonthIncrease}
        padded
        size={config.padding(6)}
      />
    </View>
  );
});
