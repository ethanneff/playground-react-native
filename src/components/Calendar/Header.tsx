import dayjs from 'dayjs';
import React, { memo } from 'react';
import { View } from '../../components';
import { spacing } from '../../features';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { TouchableOpacity } from '../TouchableOpacity';

type Props = {
  onMonthDecrease(): void;
  onMonthIncrease(): void;
  onTitlePress(): void;
  unix: number;
};
export const CalendarHeader = memo(function CalendarHeader({
  onMonthDecrease,
  onMonthIncrease,
  onTitlePress,
  unix,
}: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={onMonthDecrease}>
        <Icon
          name="chevron-left"
          padded
          size={spacing(6)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        flex
        onPress={onTitlePress}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Text
          center
          title={dayjs(unix).format('MMMM YYYY')}
          type="h5"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onMonthIncrease}>
        <Icon
          name="chevron-right"
          padded
          size={spacing(6)}
        />
      </TouchableOpacity>
    </View>
  );
});
