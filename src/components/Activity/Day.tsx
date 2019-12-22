import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { ActivityDay } from "./utils";
import { useColor } from "../../hooks";
import { colorWithOpacity } from "../../utils";
import dayjs from "dayjs";

interface Props {
  day: ActivityDay;
  max: number;
  size: number;
  margin: number;
  onPress: (item: ActivityDay) => () => void;
}

export const ActivityDayCell = memo(function ActivityDayCell({
  day,
  max,
  size,
  margin,
  onPress
}: Props) {
  const color = useColor();
  const backgroundColor =
    day.count === 0
      ? "transparent"
      : colorWithOpacity(color.success, day.count / max); // TODO: test colors because light is too light
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
});
