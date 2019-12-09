import React, { memo, useState } from "react";
import { View } from "react-native";
import dayjs, { Dayjs } from "dayjs";
import { CalendarMatrix, getCalendarMatrix } from "./utils";
import { CalendarHeader } from "./Header";
import { CalendarDay } from "./Day";

type State = {
  date: number;
  matrix: CalendarMatrix;
  selected: string | undefined;
};

const today = dayjs();
const setState = (date: Dayjs) => ({
  date: date.valueOf(),
  matrix: getCalendarMatrix(date),
  selected: undefined
});

export const Calendar = memo(function Calendar() {
  // TODO: slow js
  const [calendar, setCalendar] = useState<State>(setState(today));

  const onSelected = (id: string) => () =>
    setCalendar(state => ({
      ...state,
      selected: id === calendar.selected ? undefined : id
    }));

  const onMonthIncrease = () => {
    const date = dayjs(calendar.date).add(1, "month");
    setCalendar(setState(date));
  };

  const onMonthDecrease = () => {
    const date = dayjs(calendar.date).subtract(1, "month");
    setCalendar(setState(date));
  };

  return (
    <View style={{}}>
      <CalendarHeader
        onMonthIncrease={onMonthIncrease}
        onMonthDecrease={onMonthDecrease}
        date={calendar.date}
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
