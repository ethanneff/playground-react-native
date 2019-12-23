import React, { memo, useCallback } from "react";
import { FlatList } from "react-native";
import { Button, Screen } from "../../../../components";
import { useNav, useColor } from "../../../../hooks";
import { useRootSelector, useRootDispatch } from "../../../../utils";
import {
  setActiveList,
  getActiveChecklistOrderByCreatedAt
} from "../../models";
import { navigate } from "../../../../models";

export default memo(function Checklists() {
  const nav = useNav();
  const color = useColor();
  const dispatch = useRootDispatch();
  const items = useRootSelector(getActiveChecklistOrderByCreatedAt);

  const handleItemPress = (id: string) => () => {
    dispatch(setActiveList(id));
    dispatch(navigate("checklistsList"));
  };

  const handleItemLongPress = (id: string) => () => {
    dispatch(setActiveList(id));
    dispatch(navigate("checklistsListUpdate"));
  };

  const renderItem = useCallback(
    ({ item }) => 
      <Button
        title={item.name}
        onPress={handleItemPress(item.id)}
        onLongPress={handleItemLongPress(item.id)}
      />
    ,
    [handleItemLongPress, handleItemPress]
  );

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Checklists" gutter>
      <FlatList
        keyExtractor={keyExtractor}
        data={items}
        renderItem={renderItem}
      />
      <Button
        right
        contained
        fab
        icon="plus"
        iconColor={color.background}
        onPress={nav.to("checklistsListCreate")}
      />
    </Screen>
  );
});
