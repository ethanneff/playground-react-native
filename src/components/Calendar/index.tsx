import React, {memo, useCallback, useState} from 'react';
import {CalendarHeader} from './Header';
import {CalendarMonth} from './Month';
import {addMonths, CalendarMatrix, getCalendarMatrix} from './utils';

type State = {
  today: Date;
  matrix: CalendarMatrix;
  selected: string | undefined;
};

type Props = {
  hiddenDays?: boolean;
};

const today = new Date();
const initialState = {
  today,
  matrix: getCalendarMatrix(today),
  selected: undefined,
};

const getState = (date: Date) => ({
  today: date,
  matrix: getCalendarMatrix(date),
  selected: undefined,
});

export const Calendar = memo(function Calendar({hiddenDays}: Props) {
  const [calendar, setCalendar] = useState<State>(initialState);

  const onSelected = useCallback(
    (id: string) => {
      // TODO: navigate to month if pressing previous or next month
      setCalendar(state => ({
        ...state,
        selected: id === calendar.selected ? undefined : id,
      }));
    },
    [calendar.selected],
  );

  const onMonthIncrease = useCallback(() => {
    setCalendar(getState(addMonths(calendar.today, 1)));
  }, [calendar.today]);

  const onMonthDecrease = useCallback(() => {
    setCalendar(getState(addMonths(calendar.today, -1)));
  }, [calendar.today]);

  const onTitlePress = useCallback(() => {
    setCalendar(getState(new Date()));
  }, []);

  return (
    <>
      <CalendarHeader
        onMonthDecrease={onMonthDecrease}
        onMonthIncrease={onMonthIncrease}
        onTitlePress={onTitlePress}
        unix={calendar.today.valueOf()}
      />
      <CalendarMonth
        hiddenDays={hiddenDays}
        matrix={calendar.matrix}
        onSelected={onSelected}
        selected={calendar.selected}
      />
    </>
  );
});
