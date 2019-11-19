import dayjs from "dayjs";
import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Text } from "../../../../components";
import { Theme } from "../../../../utils";
import { useColor } from "../../../../hooks";

const generateHistory = () => {
  const data = [];
  for (let i = 2; i >= -20; i--) {
    data.push({ date: dayjs().add(i, "day") });
  }
  return data;
};

export const DailyProgress = memo(function DailyProgress() {
  const data = generateHistory();
  const color = useColor();
  return (
    <FlatList
      horizontal
      keyExtractor={item => String(item.date)}
      inverted
      data={data}
      renderItem={({ item }) => {
        return (
          <View>
            <Button
              icon={
                item.date.isSame(dayjs(), "day")
                  ? "check"
                  : item.date > dayjs()
                  ? "cancel"
                  : "close"
              }
              iconColor={
                item.date.isSame(dayjs(), "day")
                  ? color.success
                  : item.date > dayjs()
                  ? color.secondary
                  : color.danger
              }
              onPress={() => undefined}
              neutral
            />
            <View
              style={{
                borderTopColor: color.text,
                borderTopWidth: 2,
                margin: Theme.padding.p01,
                width: Theme.padding.p15
              }}
            >
              <Text title={item.date.format("MMM DD")} center />
            </View>
          </View>
        );
      }}
    />
  );
});
