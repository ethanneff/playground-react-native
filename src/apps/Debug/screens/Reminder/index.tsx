import React, { memo, useState, useCallback } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Screen, Text, Button, Icon, Modal } from "../../../../components";
import { useColor, useNav } from "../../../../hooks";
import dayjs, { Dayjs } from "dayjs";
import { Theme } from "../../../../utils";

interface RadioProps {
  buttons: string[];
  horizontal?: boolean;
  value?: string;
  onChange: (id: string) => () => void;
}

const Radio = memo(function Radio({
  buttons,
  horizontal,
  onChange,
  value
}: RadioProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        flexDirection: horizontal ? "row" : "column"
      }}
    >
      {buttons.map(button => (
        <Button
          key={button}
          title={button}
          primary={button === value}
          onPress={onChange(button)} // TODO: causing re-renders because parent updates on state change instead of ref change
        />
      ))}
    </View>
  );
});

type ReminderType = "one time" | "repeat" | "location";
type State = {
  type: ReminderType;
  reminders: {
    id: string;
    date: number;
    format: string;
  }[];
  modals: {
    customDate: boolean;
  };
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const laterToday = dayjs()
  .add(3, "hour")
  .add(30, "minute")
  .set("minute", 0);

const evening = dayjs()
  .set("hour", 18)
  .set("minute", 0);

const tomorrow = dayjs()
  .add(1, "day")
  .set("hour", 6)
  .set("minute", 0);

const nextWeek = dayjs()
  .add(1, "week")
  .set("hour", 6)
  .set("minute", 0)
  .set("day", 0);

const nextMonth = dayjs()
  .startOf("month")
  .add(2, "month")
  .set("hour", 6)
  .set("minute", 0);

const yesterday = dayjs().subtract(1, "day");

const oneTimeButtons = [
  {
    title: "Later today",
    description: laterToday.format("hh:mm A"),
    value: laterToday
  },
  {
    title: "This Evening",
    description: evening.format("hh:mm A"),
    value: evening
  },
  {
    title: "Tomorrow",
    description: `${daysOfWeek[tomorrow.day()]} ${tomorrow.format("hh:mm A")}`,
    value: tomorrow
  },
  {
    title: "Next Week",
    description: `${nextWeek.format("MMM DD, hh:mm A")}`,
    value: nextWeek
  },
  {
    title: "Someday",
    description: ``,
    value: nextMonth
  },
  {
    title: "Custom",
    description: ``,
    value: yesterday
  }
];

console.log(tomorrow);

export default memo(function DebugReminder() {
  const color = useColor();
  const nav = useNav();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background
    }
  });

  const reminderTypes: ReminderType[] = ["one time", "repeat", "location"];
  const handleReminderTypePress = useCallback(
    type => () => {
      setForm(prev => ({ ...prev, type }));
    },
    []
  );

  const handleOneTimeReminder = (date: Dayjs) => () => {
    if (date.isBefore(dayjs())) {
      setForm(prev => ({
        ...prev,
        modals: { ...prev.modals, customDate: true }
      }));
      return;
    }
    setForm(prev => ({
      ...prev,
      reminders: [
        ...prev.reminders,
        {
          id: String(Date.now()),
          date: date.valueOf(),
          format: date.format("MMM DD, YYYY hh:mm A")
        }
      ]
    }));
  };

  const handleCustomDateBackgroundPress = () => {
    setForm(prev => ({
      ...prev,
      modals: { ...prev.modals, customDate: false }
    }));
  };

  const [form, setForm] = useState<State>({
    type: "one time",
    reminders: [],
    modals: {
      customDate: false
    }
  });

  return (
    <>
      <Screen onLeftPress={nav.to("debug")} title="Reminder">
        <View style={styles.container}>
          <Text h2 title="reminders" />
          <FlatList
            inverted
            keyExtractor={item => item.id}
            style={{ height: "40%" }}
            data={form.reminders.reverse()}
            renderItem={({ item, index }) => (
              <Text title={item.format} button={index === 0} />
            )}
          />
          <Text h2 title="create reminder" />
          <Radio
            buttons={reminderTypes}
            horizontal
            value={form.type}
            onChange={handleReminderTypePress}
          />
          {form.type === "one time" ? (
            <View>
              {oneTimeButtons.map(button => (
                <TouchableOpacity
                  key={button.title}
                  style={{
                    alignSelf: "center",
                    width: "70%",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                  onPress={handleOneTimeReminder(button.value)}
                >
                  <Icon name="alarm" size={Theme.padding.p04} />
                  <Text
                    title={button.title}
                    style={{ paddingLeft: Theme.padding.p02, flex: 1 }}
                  />
                  <Text title={button.description} />
                </TouchableOpacity>
              ))}
            </View>
          ) : form.type === "repeat" ? (
            <View>
              <View>
                <Button title="daily" />
                <Button title="weekly" />
                <Button title="monthly" />
                <Button title="yearly" />
              </View>
            </View>
          ) : form.type === "location" ? (
            <View></View>
          ) : (
            <Text title="invalid form type" />
          )}
        </View>
      </Screen>
      {form.modals.customDate && (
        <Modal onBackgroundPress={handleCustomDateBackgroundPress}>
          <Text title="hello" />
        </Modal>
      )}
    </>
  );
});
