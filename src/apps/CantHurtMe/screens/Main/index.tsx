import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Screen } from "../../../../components";
import {
  getLandscapeOrientation,
  NavigationModal,
  showModal
} from "../../../../models";
import { Theme, useRootDispatch, useRootSelector } from "../../../../utils";
import { DailyProgress, Header, ProfileLevel } from "../../components";
import { app } from "../../data";
import { useColor, useNav } from "../../../../behaviors";
import { Item } from "./Item";

export default memo(function CantHurtMeMain() {
  const dispatch = useRootDispatch();
  const landscape = useRootSelector(state => getLandscapeOrientation(state));
  const color = useColor();
  const nav = useNav();
  const modal = (to: NavigationModal) => () => dispatch(showModal(to));
  const keyExtractor = (id: string) => app.goals.byId[id].id;
  const renderFooter = () => (
    <View style={{ paddingBottom: Theme.padding.p04 }} />
  );
  const columns = landscape ? 4 : 2;

  return (
    <Screen
      onLeftPress={nav.to("portfolioLanding")}
      title="Can't Hurt Me"
      style={{
        backgroundColor: color.background,
        padding: Theme.padding.p02
      }}
    >
      <Header title="Progress" />
      <Card>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <ProfileLevel onPress={modal(NavigationModal.CantHurtMeProfile)} />
          <Button
            icon="settings"
            onPress={modal(NavigationModal.CantHurtMeConfigs)}
            neutral
            fab
            center
          />
        </View>
        <DailyProgress />
      </Card>
      <Header title="Challenges" />
      <FlatList
        keyExtractor={keyExtractor}
        key={columns}
        data={app.goals.orderById}
        renderItem={Item}
        numColumns={columns}
        ListFooterComponent={renderFooter}
      />
    </Screen>
  );
});
