import React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen, Text } from "../../../../components";
import { RootState } from "../../../../containers";
import { NavigationScreen, navigate } from "../../../../models";

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
  public render() {
    return (
      <Screen onLeftPress={this.nav("portfolioLanding")}>
        <Text title="checklists" />
        <FlatList
          keyExtractor={item => item.id}
          data={this.items}
          renderItem={({ item }) => 
            <View style={{ flexDirection: "row" }}>
              <Button
                contained
                title={item.id}
                onPress={this.nav("checklistsList")}
              />
            </View>
          }
        />
        <Button
          right
          contained
          fab
          icon="plus"
          onPress={this.nav("checklistsListCreate")}
        />
      </Screen>
    );
  }
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

export default connect(
  (state: RootState) => ({
    state
  }),
  { navigate }
)(Component);
