import React, { memo } from "react";
import { View } from "react-native";
import { Text } from "../Text";
import { Button } from "../Button";
import { Theme } from "../../utils";
import dayjs from "dayjs";

interface Props {
  date: number;
  onMonthIncrease(): void;
  onMonthDecrease(): void;
}
export const CalendarHeader = memo(function CalendarHeader({
  date,
  onMonthIncrease,
  onMonthDecrease
}: Props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        icon={"chevron-left"}
        iconSize={Theme.padding.p06}
        onPress={onMonthDecrease}
      />
      <Text
        h3
        title={dayjs(date).format("MMMM YYYY")}
        center
        style={{ paddingBottom: Theme.padding.p04 }}
      />
      <Button
        icon={"chevron-right"}
        iconSize={Theme.padding.p06}
        onPress={onMonthIncrease}
      />
    </View>
  );
});
