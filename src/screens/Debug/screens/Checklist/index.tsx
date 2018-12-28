import * as React from "react";
import { FlatList, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../components";
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
                <Button icon="calendar-check" onPress={() => undefined} />
                <Button icon="calendar-remove" onPress={() => undefined} />
                <Icon color="black" name="check" />

                <Button
                  iconColor={"#f5f5f5"}
                  icon="calendar-clock"
                  onPress={() => undefined}
                />
                <Text title={item.title} />
              </View>
            );
          }}
        />
        <Button title="done" onPress={() => undefined} />
      </Screen>
    );
  }
}
