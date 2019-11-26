import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Screen } from "../../../../components";
import { Theme, useRootDispatch, useRootSelector } from "../../../../utils";
import {
  removeChecklistItem,
  toggleChecklistItemComplete,
  getCurrentActiveChecklistItemsOrderByCreatedAt,
  setActiveChecklistItem
} from "../../models";
import { useNav, useColor } from "../../../../hooks";
import { navigate } from "../../../../models";

export default memo(function Checklist() {
  const nav = useNav();
  const color = useColor();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getCurrentActiveChecklistItemsOrderByCreatedAt);

  const handleRemove = (id: string) => () => dispatch(removeChecklistItem(id));
  const handleToggle = (id: string) => () =>
    dispatch(toggleChecklistItemComplete(id));
  const handleEdit = (id: string) => () => {
    dispatch(setActiveChecklistItem(id));
    dispatch(navigate("checklistsItemUpdate"));
  };

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
              onPress={handleEdit(item.id)}
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
