import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import { useColor } from "../../hooks";
import { colorWithOpacity } from "../../utils";
import dayjs from "dayjs";
import { ActivityDay } from "./interfaces";

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
      ? color.surface
      : colorWithOpacity(color.success, (day.count / max) * 3 + 0.25);
  const borderColor = day.date.isSame(dayjs(), "day")
    ? color.danger
    : "transparent";
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
        borderWidth: 2
      }}
    />
  );
});
