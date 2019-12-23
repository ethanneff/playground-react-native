import React, { memo, useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { CalendarMatrix, getCalendarMatrix } from "./utils";
import { CalendarHeader } from "./Header";
import { CalendarDay } from "./Day";
import { Text } from "../Text";

type State = {
  unix: number;
  matrix: CalendarMatrix;
  selected: string | undefined;
  loading: boolean;
};

interface Props {
  hiddenDays?: boolean;
}

const initialState = {
  unix: dayjs().valueOf(),
  matrix: [],
  selected: undefined,
  loading: true
};

export const Calendar = memo(function Calendar({ hiddenDays }: Props) {
  const [calendar, setCalendar] = useState<State>(initialState);

  const onSelected = useCallback(
    (id: string) => () => {
      // TODO: navigate to month if pressing previous or next month
      setCalendar(state => ({
        ...state,
        selected: id === calendar.selected ? undefined : id
      }));
    },
    [calendar.selected]
  );

  const getMonth = useCallback(
    (unix: number, increment: number) => dayjs(unix).add(increment, "month"),
    []
  );

  const getState = useCallback(
    (date: Dayjs) => ({
      unix: date.valueOf(),
      matrix: getCalendarMatrix(date),
      selected: undefined,
      loading: false
    }),
    []
  );

  const onMonthIncrease = useCallback(() => {
    setCalendar(getState(getMonth(calendar.unix, 1)));
  }, [calendar.unix, getMonth, getState]);

  const onMonthDecrease = useCallback(() => {
    setCalendar(getState(getMonth(calendar.unix, -1)));
  }, [calendar.unix, getMonth, getState]);

  const onTitlePress = useCallback(() => {
    setCalendar(getState(dayjs()));
  }, [getState]);

  useEffect(() => {
    setCalendar(getState(dayjs()));
  }, [getState]);

  return calendar.loading ? 
    <Text h5 medium title="loading..." /> // TODO: update loading component to this (also components/Activity)
   : 
    <View>
      <CalendarHeader
        onTitlePress={onTitlePress}
        onMonthIncrease={onMonthIncrease}
        onMonthDecrease={onMonthDecrease}
        unix={calendar.unix}
      />
      {calendar.matrix.map((row, i) => 
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map(col => 
            <CalendarDay
              hiddenDays={hiddenDays}
              key={col.id}
              onSelected={onSelected}
              day={col}
              selectedDay={calendar.selected}
            />
          )}
        </View>
      )}
    </View>
  ;
});
