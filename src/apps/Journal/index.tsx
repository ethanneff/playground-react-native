import React, { memo, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Screen, Text, TextInput, Card } from "../../components";
import { useColor, useNav } from "../../hooks";
import { Theme } from "../../utils";
import dayjs, { Dayjs } from "dayjs";

type Day = {
  id: string;
  display: string;
  current: boolean;
  header: boolean;
  today: boolean;
};

type Calendar = Day[][];

const generateDay = (
  id: string,
  display: number | string,
  current = false,
  today = false,
  header = false
): Day => ({ id, display: String(display), current, today, header });

const getEpoch = (today: Dayjs, month: number, day: number) =>
  String(
    today
      .add(month, "month")
      .date(day)
      .format("MM DD YYYY")
      .valueOf()
  );

const generateCalendar = (date: Dayjs): Calendar => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = Number(date.startOf("month").format("d"));
  const maxDays = Number(date.endOf("month").format("D"));
  const today = Number(date.format("D")) + 1;
  const prevMaxDays = Number(
    date
      .subtract(1, "month")
      .endOf("month")
      .format("D")
  );
  let dayCounter = 1;
  let prevDayCounter = prevMaxDays - firstDay + 1;
  let nextDayCounter = 1;
  const calendar: Calendar = [];
  calendar.push(days.map(day => generateDay(day, day, false, false, true)));
  for (let row = 1; row < 7; row++) {
    calendar[row] = [];
    for (let col = 0; col < 7; col++) {
      calendar[row][col] =
        row === 1 && col < firstDay
          ? generateDay(getEpoch(date, -1, prevDayCounter), prevDayCounter++)
          : row > 1 && dayCounter > maxDays
          ? generateDay(getEpoch(date, 1, nextDayCounter), nextDayCounter++)
          : generateDay(
              getEpoch(date, 0, dayCounter),
              dayCounter++,
              true,
              today === dayCounter
            );
    }
  }
  return calendar;
};

type State = {
  today: Dayjs;
  selected: string | undefined;
};

const Calendar = () => {
  const [calendar, setCalendar] = useState<State>({
    today: dayjs(),
    selected: undefined
  });

  const color = useColor();
  const month = calendar.today.format("MMMM YYYY");
  const matrix = generateCalendar(calendar.today);
  const handleSelected = (id: string) => () =>
    setCalendar(state => ({
      ...state,
      selected: id === calendar.selected ? undefined : id
    }));

  return (
    <View style={{}}>
      <Text
        h3
        title={month}
        center
        style={{ paddingBottom: Theme.padding.p04 }}
      />
      {matrix.map((row, i) => {
        return (
          <View key={i} style={{ flexDirection: "row" }}>
            {row.map(col => {
              const selected = col.id === calendar.selected;
              return (
                <TouchableOpacity
                  key={col.id}
                  onPress={handleSelected(col.id)}
                  disabled={col.header}
                  style={{
                    flex: 1,
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      height: Theme.padding.p08,
                      width: Theme.padding.p08,
                      borderRadius: 200,
                      justifyContent: "center",
                      backgroundColor: col.header
                        ? color.background
                        : selected
                        ? color.primary
                        : color.background
                    }}
                  >
                    <Text
                      title={col.display}
                      center
                      bold={col.today}
                      style={{
                        color: selected
                          ? color.background
                          : col.today
                          ? color.success
                          : col.current
                          ? color.text
                          : color.secondary
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default memo(function DebugTemplate() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    bottom: {
      paddingBottom: Theme.padding.p04
    }
  });

  return (
    <Screen
      onLeftPress={nav.to("portfolioLanding")}
      title="nope"
      style={{ backgroundColor: color.surface }}
    >
      <Card>
        <Text h2 title="Calendar" style={styles.bottom} />
        <Calendar />
      </Card>
      <ScrollView>
        <Card>
          <Text h2 title="Record" style={styles.bottom} />
          <Text
            overline
            title="one objective that will make everything easier"
            style={styles.bottom}
          />
          <TextInput
            title="Primary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />

          <Text
            overline
            title="Additional objectives"
            style={styles.overline}
          />

          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Secondary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <Text overline title="Bonus objectives" style={styles.bottom} />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="tertiary goal"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text h2 title="Review" style={styles.bottom} />
          <TextInput
            title="How likely are you to recommend this day?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="Why did you give this score?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
        <Card>
          <Text h2 title="Retro" style={styles.bottom} />
          <TextInput
            title="What went well?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What could be improved?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
          <TextInput
            title="What will you commit to tomorrow?"
            placeholder="fill me"
            value={""}
            onChangeText={() => undefined}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
});
