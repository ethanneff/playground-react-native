import * as React from "react";
import { FlatList, View } from "react-native";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../components";
import { Theme } from "../../../../utils";
import { Data } from "./data";

type Props = RouteComponentProps;

export class Checklist extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    const items: any = Data[5].items;
    const data = Object.keys(items).map(key => items[key]);
    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
        <Text title={Data[5].trigger} />
        <FlatList
          keyExtractor={item => item.id}
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <Button
                  icon="checkbox-marked-circle"
                  iconColor={Theme.color.success}
                  onPress={() => undefined}
                />
                <Button
                  icon="close-circle"
                  iconColor={Theme.color.danger}
                  onPress={() => undefined}
                />
                <Button
                  iconColor={Theme.color.warning}
                  icon="clock"
                  onPress={() => undefined}
                />
                <Button
                  label
                  neutral
                  lowercase
                  title={item.title}
                  onPress={() => undefined}
                />
              </View>
            );
          }}
        />
        <Button title="done" onPress={() => undefined} />
      </Screen>
    );
  }
}
