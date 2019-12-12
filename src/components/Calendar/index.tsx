import React, { memo, useState, useCallback } from "react";
import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { CalendarMatrix, getCalendarMatrix } from "./utils";
import { CalendarHeader } from "./Header";
import { CalendarDay } from "./Day";

type State = {
  unix: number;
  matrix: CalendarMatrix;
  selected: string | undefined;
};

const today = dayjs();
const setState = (date: Dayjs) => ({
  unix: date.valueOf(),
  matrix: getCalendarMatrix(date),
  selected: undefined
});

const getMonth = (unix: number, increment: number) =>
  dayjs(unix).add(increment, "month");

export const Calendar = memo(function Calendar() {
  const [calendar, setCalendar] = useState<State>(setState(today));

  const onSelected = (id: string) => () => {
    setCalendar(state => ({
      ...state,
      selected: id === calendar.selected ? undefined : id
    }));
  };

  const onMonthIncrease = useCallback(() => {
    setCalendar(setState(getMonth(calendar.unix, 1)));
  }, [calendar.unix]);

  const onMonthDecrease = useCallback(() => {
    setCalendar(setState(getMonth(calendar.unix, -1)));
  }, [calendar.unix]);

  const onTitlePress = useCallback(() => {
    setCalendar(setState(today));
  }, [calendar.unix]);

  return (
    <View>
      <CalendarHeader
        onTitlePress={onTitlePress}
        onMonthIncrease={onMonthIncrease}
        onMonthDecrease={onMonthDecrease}
        unix={calendar.unix}
      />
      {calendar.matrix.map((row, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {row.map(col => (
            <CalendarDay
              key={col.id}
              onSelected={onSelected}
              day={col}
              selectedDay={calendar.selected}
            />
          ))}
        </View>
      ))}
    </View>
  );
});
