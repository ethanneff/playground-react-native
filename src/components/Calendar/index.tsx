import React, { useEffect } from 'react';
import { View } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux';
import { CalendarHeader } from './CalendarHeader';
import { CalendarMonth } from './CalendarMonth';
import { calendarActions } from './calendarReducer';

type Properties = {
  readonly hiddenDays?: boolean;
};

export const Calendar = ({ hiddenDays }: Properties) => {
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
};
