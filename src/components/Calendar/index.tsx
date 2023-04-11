import React, { memo, useEffect } from 'react';
import { View } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux';
import { CalendarHeader } from './CalendarHeader';
import { CalendarMonth } from './CalendarMonth';
import { calendarActions } from './calendarReducer';

type Props = {
  hiddenDays?: boolean;
};

export const Calendar = memo(function CalenderMemo({ hiddenDays }: Props) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.calendar.loading);

  useEffect(() => {
    dispatch(calendarActions.init());
  }, [dispatch]);

  return loading ? null : (
    <View>
      <CalendarHeader />
      <CalendarMonth hiddenDays={hiddenDays} />
    </View>
  );
});
