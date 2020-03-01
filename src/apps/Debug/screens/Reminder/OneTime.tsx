import dayjs, { Dayjs } from "dayjs";
import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Text } from "../../../../components";
import { Theme } from "../../../../utils";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const generateButtons = () => {
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

  return [
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
      description: `${daysOfWeek[tomorrow.day()]} ${tomorrow.format(
        "hh:mm A"
      )}`,
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
};

interface Props {
  onPress: (value: Dayjs) => () => void;
}

export default memo(function OneTime({ onPress }: Props) {
  const buttons = generateButtons();
  return (
    <View>
      {buttons.map(button => 
        <TouchableOpacity
          key={button.title}
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
          onPress={onPress(button.value)}
        >
          <Icon name="alarm" size={Theme.padding.p04} />
          <Text
            title={button.title}
            style={{ paddingLeft: Theme.padding.p02, flex: 1 }}
          />
          <Text title={button.description} />
        </TouchableOpacity>
      )}
    </View>
  );
});
