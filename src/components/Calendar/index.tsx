import React, { memo, useState } from "react";
import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { CalendarMatrix, getCalendarMatrix, getMonth } from "./utils";
import { CalendarHeader } from "./Header";
import { CalendarDay } from "./Day";

type State = {
  month: string;
  matrix: CalendarMatrix;
  selected: string | undefined;
};

const today = dayjs();
const setState = (date: Dayjs) => ({
  month: getMonth(date),
  matrix: getCalendarMatrix(date),
  selected: undefined
});

export const Calendar = memo(function Calendar() {
  const [calendar, setCalendar] = useState<State>(setState(today));

  const onSelected = (id: string) => () =>
    setCalendar(state => ({
      ...state,
      selected: id === calendar.selected ? undefined : id
    }));

  const onMonthIncrease = () => {
    const date = dayjs(calendar.month).add(1, "month");
    setCalendar(setState(date));
  };

  const onMonthDecrease = () => {
    const date = dayjs(calendar.month).subtract(1, "month");
    setCalendar(setState(date));
  };

  return (
    <View style={{}}>
      <CalendarHeader
        onMonthIncrease={onMonthIncrease}
        onMonthDecrease={onMonthDecrease}
        month={calendar.month}
      />
      {calendar.matrix.map((row, i) => (
        <View key={`${calendar.month}${i}`} style={{ flexDirection: "row" }}>
          {row.map(col => (
            <CalendarDay
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
