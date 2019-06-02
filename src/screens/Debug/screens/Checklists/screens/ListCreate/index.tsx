import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Button, Screen, TextInput } from "../../../../../../components";
import { RootState } from "../../../../../../containers";
import { createItem } from "../../models/Item";

interface DispatchProps {
  createItem: typeof createItem;
}
type Props = RouteComponentProps & DispatchProps;
interface State {
  name: string;
  description: string;
}

class Component extends React.PureComponent<Props, State> {
  public state = {
    description: "",
    name: ""
  };
  public render() {
    const { name, description } = this.state;
    const { history } = this.props;

    return (
      <Screen onLeftPress={() => history.goBack()}>
        <TextInput title="name" value={name} onChangeText={this.setName} />
        <TextInput
          title="description"
          value={description}
          onChangeText={this.setDescription}
        />
        <Button title="create" onPress={this.createList} />
      </Screen>
    );
  }

  private setName = (name: string) => {
    this.setState({ name });
  };
  private setDescription = (description: string) => {
    this.setState({ description });
  };
  private createList = () => {
    const { createItem: create, history } = this.props;
    const { name, description } = this.state;
    create({ name, description });
    history.goBack();
  };
}

export const ListCreate = connect(
  (state: RootState) => ({
    state
  }),
  { createItem }
)(Component);
