import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text } from "../../../../components";
import { RootState } from "../../../../containers";
import { navigate, NavigationScreen } from "../../../../models";

interface DispatchProps {
  navigate: typeof navigate;
}
type Props = DispatchProps;

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
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    return (
      <Screen onLeftPress={this.nav(NavigationScreen.PortfolioLanding)}>
        <Text title="checklists" />
        <FlatList
          keyExtractor={item => item.id}
          data={this.items}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Button
                contained
                title={item.id}
                onPress={this.nav(NavigationScreen.ChecklistsList)}
              />
            </View>
          )}
        />
        <Button
          right
          contained
          fab
          icon="plus"
          onPress={this.nav(NavigationScreen.ChecklistsListCreate)}
        />
      </Screen>
    );
  }
}

export const Lists = connect(
  (state: RootState) => ({
    state
  }),
  { navigate }
)(Component);
