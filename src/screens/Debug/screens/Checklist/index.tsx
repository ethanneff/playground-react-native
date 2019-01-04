import * as React from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen } from "../../../../components";
import { RootState } from "../../../../models";
import { Theme } from "../../../../utils";
import { createItem, Items, removeItem, updateItem } from "./Item";

interface StateProps {
  items: Items;
}

interface DispatchProps {
  createItem: typeof createItem;
  updateItem: typeof updateItem;
  removeItem: typeof removeItem;
}

type Props = RouteComponentProps & StateProps & DispatchProps;

class Component extends React.PureComponent<Props> {
  public createItem = () => {
    const { createItem: create } = this.props;
    create({ name: Date.now().toString(), description: "hello" });
  };
  public createItem2 = () => {
    const { createItem: create } = this.props;
    create({ name: Date.now().toString() });
  };
  public updateItem = () => {
    const { updateItem: update } = this.props;
    update({
      id: "123",
      name: "123"
    });
  };
  public removeItem = (id: string) => {
    const { removeItem: remove } = this.props;
    remove(id);
  };

  public render() {
    const { history, items } = this.props;

    return (
      <Screen disableScroll onLeftPress={() => history.goBack()}>
        <FlatList
          keyExtractor={item => item.id}
          data={Object.values(items)}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Button
                icon="checkbox-marked-circle"
                iconColor={Theme.color.success}
                onPress={() => undefined}
              />
              <Button
                icon="close-circle"
                iconColor={Theme.color.danger}
                onPress={() => this.removeItem(item.id)}
              />
              <Button
                iconColor={Theme.color.warning}
                icon="clock"
                onPress={() => undefined}
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
        <Button title="create" onPress={this.createItem} />
        <Button title="update" onPress={this.updateItem} />
      </Screen>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  items: state.items
});

export const Checklist = connect(
  mapStateToProps,
  {
    updateItem,
    createItem,
    removeItem
  }
)(Component);
