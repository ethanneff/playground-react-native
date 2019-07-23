import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Screen, Text } from "../../../../components";
import {
  getCurrentColor,
  getLandscapeOrientation,
  navigate,
  NavigationModal,
  NavigationScreen,
  showModal
} from "../../../../models";
import { Theme, useRootDispatch, useRootSelector } from "../../../../utils";
import { DailyProgress, Header, ProfileLevel } from "../../components";
import { app } from "../../data";

export const CantHurtMe = memo(() => {
  const dispatch = useRootDispatch();
  const landscape = useRootSelector(state => getLandscapeOrientation(state));
  const color = useRootSelector(state => getCurrentColor(state));

  const renderItem = (props: { item: string; index: number }) => {
    const { item, index } = props;
    const data = app.goals.byId[item];
    return (
      <Card key={data.id} flex onPress={() => undefined}>
        <Text
          title={`Challenge #${index + 1}`}
          center
          h4
          bold
          style={{ paddingBottom: Theme.padding.p04 }}
        />
        <Text title={data.challenge} center />
      </Card>
    );
  };

  const nav = (to: NavigationScreen) => () => dispatch(navigate(to));
  const modal = (to: NavigationModal) => () => dispatch(showModal(to));
  const keyExtractor = (id: string) => app.goals.byId[id].id;
  const renderFooter = () => (
    <View style={{ paddingBottom: Theme.padding.p04 }} />
  );
  const columns = landscape ? 4 : 2;

  return (
    <Screen
      onLeftPress={nav(NavigationScreen.PortfolioLanding)}
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
        renderItem={renderItem}
        numColumns={columns}
        ListFooterComponent={renderFooter}
      />
    </Screen>
  );
});
