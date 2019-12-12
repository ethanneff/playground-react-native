import React, { memo } from "react";
import { useColor } from "../../hooks";
import { View, TouchableOpacity } from "react-native";
import { Theme } from "../../utils";
import { Day } from "./utils";
import { Text } from "../Text";
import dayjs from "dayjs";

interface Props {
  day: Day;
  onSelected(id: string): () => void;
  selectedDay: string | undefined;
}

export const CalendarDay = memo(function CalendarDay({
  day,
  onSelected,
  selectedDay
}: Props) {
  const color = useColor();
  const selected = day.id === selectedDay;
  const today = dayjs(day.id).isSame(dayjs(), "day");
  const backgroundColor = day.header
    ? color.background
    : selected
    ? color.primary
    : color.background;
  const textColor = selected
    ? color.background
    : today
    ? color.success
    : day.current
    ? color.text
    : color.secondary;
  return (
    <TouchableOpacity
      key={day.id}
      onPress={onSelected(day.id)}
      disabled={day.header}
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <View
        style={{
          height: Theme.padding.p08,
          width: Theme.padding.p08,
          borderRadius: Theme.padding.p20,
          justifyContent: "center",
          backgroundColor
        }}
      >
        <Text
          title={day.display}
          center
          bold={today}
          style={{
            color: textColor
          }}
        />
      </View>
    </TouchableOpacity>
  );
});
