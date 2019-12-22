import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Button } from "../Button";
import { Theme } from "../../utils";
import dayjs from "dayjs";

interface Props {
  unix: number;
  onMonthIncrease(): void;
  onMonthDecrease(): void;
  onTitlePress(): void;
}
export const CalendarHeader = memo(function CalendarHeader({
  unix,
  onTitlePress,
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
      <TouchableOpacity onPress={onTitlePress}>
        <Text
          h4
          title={dayjs(unix).format("MMMM YYYY")}
          center
          style={{ paddingBottom: Theme.padding.p04 }}
        />
      </TouchableOpacity>
      <Button
        icon={"chevron-right"}
        iconSize={Theme.padding.p06}
        onPress={onMonthIncrease}
      />
    </View>
  );
});
