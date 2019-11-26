import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Screen } from "../../../../components";
import { Theme, useRootDispatch, useRootSelector } from "../../../../utils";
import {
  removeItem,
  toggleCompleteItem,
  getCurrentActiveChecklistItemsOrderByCreatedAt
} from "../../models";
import { useNav, useColor } from "../../../../hooks";

export default memo(function Checklist() {
  const nav = useNav();
  const color = useColor();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getCurrentActiveChecklistItemsOrderByCreatedAt);

  const handleRemove = (id: string) => () => dispatch(removeItem(id));
  const handleActive = (id: string) => () => id; // TODO:
  const handleToggle = (id: string) => () => dispatch(toggleCompleteItem(id));

  return (
    <Screen onLeftPress={nav.to("checklists")} title="Checklist" gutter>
      <FlatList
        keyExtractor={item => item.id}
        data={items}
        renderItem={({ item }) => 
          <View style={{ flexDirection: "row" }}>
            <Button
              label
              icon="checkbox-marked-circle"
              iconColor={Theme.color.success}
              onPress={handleActive(item.id)}
            />
            <Button
              label
              icon="close-circle"
              iconColor={Theme.color.danger}
              onPress={handleRemove(item.id)}
            />
            <Button
              label
              iconColor={Theme.color.warning}
              icon="clock"
              onPress={handleToggle(item.id)}
            />
            <Button
              label
              neutral={item.active}
              lowercase
              title={item.name}
              textStyle={{
                color: item.completed ? color.danger : color.black
              }}
              onPress={handleActive(item.id)}
            />
          </View>
        }
      />
      <Button
        fab
        right
        contained
        icon="plus"
        iconColor={color.background}
        onPress={nav.to("checklistsItemCreate")}
      />
    </Screen>
  );
});
