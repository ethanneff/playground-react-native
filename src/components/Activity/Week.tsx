import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useColor } from "../../hooks";
import { ActivityDayInWeek, ActivityDay } from "./utils";
import { Text } from "../Text";
import dayjs from "dayjs";
import { Theme } from "../../utils";

interface Props {
  item: ActivityDayInWeek;
  index: number;
  size: number;
  margin: number;
  onPress: (item: ActivityDay) => () => void;
}

export const ActivityWeek = memo(function ActivityWeek({
  item,
  index,
  size,
  margin,
  onPress
}: Props) {
  const color = useColor();
  const first = item[0].date;
  const showHeader = Number(first.format("DD")) <= 7;
  const header = showHeader ? first.format("MMM") : " ";
  return (
    <View key={index}>
      <Text
        center
        secondary
        title={header}
        overline
        style={{ paddingBottom: Theme.padding.p03 }}
      />
      {item.map(day => {
        const backgroundColor = day.count > 0 ? color.light : color.success; // TODO: test colors because light is too light
        const borderColor = day.date.isSame(dayjs(), "day")
          ? color.danger
          : color.background;
        return (
          <TouchableOpacity
            onPress={onPress(day)}
            key={day.date.format("YYYY-MM-DD")}
            style={{
              width: size,
              height: size,
              margin,
              backgroundColor,
              borderColor,
              borderWidth: 1
            }}
          />
        );
      })}
    </View>
  );
});
