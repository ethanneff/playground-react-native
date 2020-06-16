import React, {memo} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import {Text} from '../Text';
import {Theme} from '../../utils';
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
        name="chevron-left"
        onPress={onMonthDecrease}
        size={Theme.padding.p06}
      />
      <TouchableOpacity onPress={onTitlePress}>
        <Text
          center
          style={{paddingBottom: Theme.padding.p04}}
          title={dayjs(unix).format('MMMM YYYY')}
          type="h4"
        />
      </TouchableOpacity>
      <Icon
        name="chevron-right"
        onPress={onMonthIncrease}
        size={Theme.padding.p06}
      />
    </View>
  );
});
