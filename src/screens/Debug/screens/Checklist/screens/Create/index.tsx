import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen, Text } from "../../../../../../components";
import { RootState } from "../../../../../../models";
import { createItem } from "../../models/Item";

interface DispatchProps {
  createItem: typeof createItem;
}
type Props = RouteComponentProps & DispatchProps;

class Component extends React.PureComponent<Props> {
  public render() {
    const { history } = this.props;
    return (
      <Screen onLeftPress={() => history.goBack()}>
        <Text title="Create" />
        <Button title="create" onPress={this.createItem} />
      </Screen>
    );
  }
  private createItem = () => {
    const { createItem: create, history } = this.props;
    create({ name: Date.now().toString(), description: "hello" });
    history.goBack();
  };
}

export const Create = connect(
  (state: RootState) => ({
    state
  }),
  { createItem }
)(Component);
