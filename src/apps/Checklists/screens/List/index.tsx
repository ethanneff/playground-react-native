import React, { memo, useCallback } from "react";
import { FlatList, View } from "react-native";
import { Button, Screen } from "../../../../components";
import { useRootDispatch, useRootSelector } from "../../../../utils";
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

  const renderItem = useCallback(
    ({ item }) => 
      <View style={{ flexDirection: "row" }}>
        <Button label icon="checkbox-marked-circle" iconColor={color.success} />
        <Button
          label
          icon="close-circle"
          iconColor={color.danger}
          onPress={handleRemove(item.id)}
        />
        <Button
          label
          iconColor={color.warning}
          icon="clock"
          onPress={handleToggle(item.id)}
        />
        <Button
          label
          primary={item.active}
          lowercase
          title={item.name}
          textStyle={{
            color: item.completed ? color.danger : color.text
          }}
          onPress={handleEdit(item.id)}
        />
      </View>
    ,
    [color.danger, color.success, color.text, color.warning, handleEdit, handleRemove, handleToggle]
  );
  const keyExtractor = useCallback(item => item.id, []);

  return (
    <Screen onLeftPress={nav.to("checklists")} title="Checklist" gutter>
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
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
