import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { View } from '..';
import { spacing } from '../../features';
import { useRootDispatch, useRootSelector } from '../../redux';
import { Icon } from '../Icon';
import { Pressable } from '../Pressable';
import { Text } from '../Text';
import { calendarActions } from './calendarReducer';

export const CalendarHeader = () => {
  const dispatch = useRootDispatch();
  const activeMonth = useRootSelector((state) => state.calendar.activeMonth);
  const month = dayjs(activeMonth).format('MMMM YYYY');

  const handleMonthDecrease = useCallback(() => {
    dispatch(calendarActions.nav(-1));
  }, [dispatch]);

  const handleMonthIncrease = useCallback(() => {
    dispatch(calendarActions.nav(1));
  }, [dispatch]);

  const handleTitlePress = useCallback(() => {
    dispatch(calendarActions.nav(0));
  }, [dispatch]);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Pressable onPress={handleMonthDecrease}>
        <Icon
          name="chevron-left"
          padded
          size={spacing(6)}
        />
      </Pressable>
      <Pressable onPress={handleTitlePress}>
        <Text
          center
          title={month}
          type="h5"
        />
      </Pressable>
      <Pressable onPress={handleMonthIncrease}>
        <Icon
          name="chevron-right"
          padded
          size={spacing(6)}
        />
      </Pressable>
    </View>
  );
};
