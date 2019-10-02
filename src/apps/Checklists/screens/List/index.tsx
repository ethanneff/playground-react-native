import React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { Button, Screen } from "../../../../components";
import { RootState } from "../../../../containers";
import { NavigationScreen, navigate } from "../../../../models";
import { Theme } from "../../../../utils";
import {
  ItemsArray,
  getItemsByCreatedAt,
  removeItem,
  toggleActiveItem,
  updateItem
} from "../../models";

interface StateProps {
  items: ItemsArray;
}

interface DispatchProps {
  updateItem: typeof updateItem;
  navigate: typeof navigate;
  removeItem: typeof removeItem;
  toggleActiveItem: typeof toggleActiveItem;
}

type Props = DispatchProps & StateProps & DispatchProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { items, removeItem: remove, toggleActiveItem: toggle } = this.props;
    return (
      <Screen disableScroll onLeftPress={this.nav("checklists")}>
        <FlatList
          keyExtractor={item => item.id}
          data={items}
          renderItem={({ item }) => 
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
          }
        />
        <Button
          fab
          contained
          icon="plus"
          onPress={this.nav("checklistsItemCreate")}
        />
      </Screen>
    );
  }
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);
}

const mapStateToProps = (state: RootState): StateProps => ({
  items: getItemsByCreatedAt(state)
});

const mapDispatchToProps: DispatchProps = {
  navigate,
  removeItem,
  toggleActiveItem,
  updateItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
