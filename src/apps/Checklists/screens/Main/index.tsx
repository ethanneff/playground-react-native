import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Screen } from "../../../../components";
import { useNav } from "../../../../hooks";

type Items = {
  id: string;
  title: string;
}[];

const items: Items = [
  {
    id: "1",
    title: "bob"
  },
  {
    id: "2",
    title: "steve"
  },
  {
    id: "3",
    title: "jill"
  }
];
export default memo(function Checklists() {
  const nav = useNav();
  return (
    <Screen onLeftPress={nav.to("portfolioLanding")} title="Checklists">
      <FlatList
        keyExtractor={item => item.id}
        data={items}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Button
              contained
              title={item.id}
              onPress={nav.to("checklistsList")}
            />
          </View>
        )}
      />
      <Button
        right
        contained
        fab
        icon="plus"
        onPress={nav.to("checklistsListCreate")}
      />
    </Screen>
  );
});
