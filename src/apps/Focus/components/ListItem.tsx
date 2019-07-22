import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { EllipsizeMode, Icon, Text } from "../../../components";
import { getCurrentColor } from "../../../models";
import { Theme, useRootSelector } from "../../../utils";
import { Item } from "./List";
import { ListSection } from "./ListSection";

interface Props {
  showSection: boolean;
  item: Item;
  onItemPress(item: Item): void;
}

export const ListItem = memo(({ showSection, item, onItemPress }: Props) => {
  const color = useRootSelector(state => getCurrentColor(state));
  console.log("item render");
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          height: Theme.padding.p10,
          flexDirection: "row",
          paddingVertical: Theme.padding.p02,
          paddingHorizontal: Theme.padding.p04
        }}
        onPress={() => onItemPress(item)}
      >
        <View
          style={{
            flexDirection: "row",
            width: Theme.padding.p20
          }}
        >
          <Icon
            name="checkbox-blank-circle"
            size={14}
            color={color.success}
            style={{ paddingRight: Theme.padding.p01 }}
          />
          <Text title={`${item.hour} ${item.zone}`} />
        </View>
        <Text
          style={{ flex: 1, color: color.secondary }}
          title={item.action}
          body1
          numberOfLines={1}
          ellipsizeMode={EllipsizeMode.Tail}
        />
      </TouchableOpacity>
      {showSection && <ListSection item={item} />}
    </View>
  );
});
