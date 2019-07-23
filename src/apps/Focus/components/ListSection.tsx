import React, { memo } from "react";
import { View } from "react-native";
import { Text } from "../../../components";
import { Theme } from "../../../utils";
import { Item } from "./List";

interface Props {
  item: Item;
}

export const ListSection = memo(({ item }: Props) => (
  <View
    style={{
      alignItems: "center",
      borderTopColor: "grey",
      borderTopWidth: 1,
      flexDirection: "row",
      justifyContent: "center",
      marginTop: Theme.padding.p02,
      padding: Theme.padding.p02
    }}
  >
    <Text h3 title={item.dayOfMonth} />
    <Text overline title={` ${item.month}, ${item.dayOfWeek}`} />
  </View>
));
