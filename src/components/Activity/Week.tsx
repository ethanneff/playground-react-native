import React, { memo } from "react";
import { View } from "react-native";
import { ActivityDayInWeek, ActivityDay } from "./utils";
import { Text } from "../Text";
import { Theme } from "../../utils";
import { ActivityDayCell } from "./Day";

interface Props {
  item: ActivityDayInWeek;
  max: number;
  index: number;
  size: number;
  margin: number;
  onPress: (item: ActivityDay) => () => void;
}

export const ActivityWeekRow = memo(function ActivityWeekRow({
  item,
  max,
  index,
  size,
  margin,
  onPress
}: Props) {
  const first = item[0].date;
  const showHeader = Number(first.format("DD")) <= 7;
  const header = showHeader ? first.format("MMM") : " ";
  return (
    <View key={index}>
      <Text
        center
        medium
        title={header}
        overline
        style={{ paddingBottom: Theme.padding.p03 }}
      />
      {item.map(day => 
        <ActivityDayCell
          key={day.date.format("YYYY-MM-DD")}
          day={day}
          max={max}
          size={size}
          margin={margin}
          onPress={onPress}
        />
      )}
    </View>
  );
});
