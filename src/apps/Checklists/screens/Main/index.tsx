import React, { memo } from "react";
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

  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Checklists" gutter>
      <FlatList
        keyExtractor={item => item.id}
        data={items}
        renderItem={({ item }) => 
          <Button title={item.name} onPress={handleItemPress(item.id)} />
        }
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
