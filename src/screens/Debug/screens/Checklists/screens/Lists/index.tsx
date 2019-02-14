import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../../../components";
import { RootState } from "../../../../../../models";

type Props = RouteComponentProps;

class Component extends React.PureComponent<Props> {
  private items = [
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
  public render() {
    const { history, match } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <Text title="checklists" />
        <FlatList
          keyExtractor={item => item.id}
          data={this.items}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Button
                contained
                title={item.id}
                onPress={() => history.push(`${match.path}/${item.id}`)}
              />
            </View>
          )}
        />
        <Button
          right
          contained
          fab
          icon="plus"
          onPress={() => history.push(`${match.path}/create`)}
        />
      </Screen>
    );
  }
}

export const Lists = connect(
  (state: RootState) => ({
    state
  }),
  {}
)(Component);
