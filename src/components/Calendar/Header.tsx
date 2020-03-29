import React, {memo} from 'react';
import {View} from 'react-native';
import {Text} from '../Text';
import {Theme} from '../../utils';
import dayjs from 'dayjs';
import {Icon} from '../Icon';
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
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Icon
        name={'chevron-left'}
        size={Theme.padding.p06}
        onPress={onMonthDecrease}
      />
      <TouchableOpacity onPress={onTitlePress}>
        <Text
          h4
          title={dayjs(unix).format('MMMM YYYY')}
          center
          style={{paddingBottom: Theme.padding.p04}}
        />
      </TouchableOpacity>
      <Icon
        name={'chevron-right'}
        size={Theme.padding.p06}
        onPress={onMonthIncrease}
      />
    </View>
  );
});
