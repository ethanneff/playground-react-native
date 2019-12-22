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

interface Props {
  hiddenDays?: boolean;
}

export const Calendar = memo(function Calendar({ hiddenDays }: Props) {
  const [calendar, setCalendar] = useState<State>(setState(today));

  const onSelected = (id: string) => () => {
    // TODO: navigate to month if pressing previous or next month
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
  }, []);

  return (
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
  );
});
