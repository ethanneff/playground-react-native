import React from "react";
import { connect } from "react-redux";
import { Button, Screen, TextInput } from "../../../../components";
import { RootState } from "../../../../containers";
import { NavigationScreen, navigate } from "../../../../models";
import { createItem } from "../../models/Item";

interface DispatchProps {
  createItem: typeof createItem;
  navigate: typeof navigate;
}
type Props = DispatchProps & DispatchProps;
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

    return (
      <Screen onLeftPress={this.nav("checklists")} title="Create Checklist">
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
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  private setName = (name: string) => {
    this.setState({ name });
  };
  private setDescription = (description: string) => {
    this.setState({ description });
  };
  private createList = () => {
    const { createItem: create } = this.props;
    const { name, description } = this.state;
    create({ name, description });
    this.nav("checklists");
  };
}

export default connect(
  (state: RootState) => ({
    state
  }),
  { createItem, navigate }
)(Component);
