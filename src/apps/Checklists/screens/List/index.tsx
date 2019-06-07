import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen } from "../../../../components";
import { RootState } from "../../../../containers";
import { Theme } from "../../../../utils";
import {
  getItemsByCreatedAt,
  ItemsArray,
  removeItem,
  toggleActiveItem,
  updateItem
} from "../../models";
import { navigate, NavigationScreen } from "../../../../models";

interface StateProps {
  items: ItemsArray;
}

interface DispatchProps {
  updateItem: typeof updateItem;
  removeItem: typeof removeItem;
  toggleActiveItem: typeof toggleActiveItem;
  navigate: typeof navigate;
}

type Props = DispatchProps & StateProps & DispatchProps;

class Component extends React.PureComponent<Props> {
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
  public render() {
    const { items, removeItem: remove, toggleActiveItem: toggle } = this.props;
    return (
      <Screen
        disableScroll
        onLeftPress={this.nav(NavigationScreen.ChecklistsLists)}
      >
        <FlatList
          keyExtractor={item => item.id}
          data={items}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Button
                label
                icon="checkbox-marked-circle"
                iconColor={Theme.color.success}
                onPress={() => undefined}
              />
              <Button
                label
                icon="close-circle"
                iconColor={Theme.color.danger}
                onPress={() => remove(item.id)}
              />
              <Button
                label
                iconColor={Theme.color.warning}
                icon="clock"
                onPress={() => toggle(item.id)}
              />
              <Button
                label
                neutral={item.active}
                lowercase
                title={item.name}
                onPress={() => undefined}
              />
            </View>
          )}
        />
        <Button
          fab
          contained
          icon="plus"
          onPress={this.nav(NavigationScreen.ChecklistsItemCreate)}
        />
      </Screen>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  items: getItemsByCreatedAt(state)
});

const mapDispatchToProps: DispatchProps = {
  removeItem,
  toggleActiveItem,
  updateItem,
  navigate
};

export const List = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
