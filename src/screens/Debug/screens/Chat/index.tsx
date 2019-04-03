import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router";
import uuid from "uuid";
import { Button, Screen, TextInput } from "../../../../components";
import { Item } from "./Item";

export interface Message {
  id: string;
  createdBy: string;
  updatedAt: number;
  createdAt: number;
  message: string;
  archive: boolean;
}
type Props = RouteComponentProps;
interface State {
  message: string;
  messages: Message[];
}

export class Chat extends React.PureComponent<Props, State> {
  public state = {
    message: "",
    messages: []
  };
  private styles = StyleSheet.create({
    row: {
      flexDirection: "row"
    }
  });
  private user = "123";
  private sendIcon = "arrow-up-thick";

  public render() {
    const { message, messages } = this.state;
    return (
      <Screen onLeftPress={this.navBack}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <View style={this.styles.row}>
          <TextInput value={message} onChangeText={this.onMessageChange} flex />
          <Button icon={this.sendIcon} onPress={this.onSubmit} />
        </View>
      </Screen>
    );
  }

  private renderItem = ({ item }: { item: Message }) => (
    <Item item={item} onDelete={this.onDelete} />
  );

  private keyExtractor = (item: Message) => item.id;

  private navBack = () => this.props.history.goBack();

  private onMessageChange = (message: string) => this.setState({ message });

  private onSubmit = () => {
    const { message, messages } = this.state;
    if (message.trim().length === 0) {
      return;
    }
    const date = Date.now();
    const newMessage: Message = {
      archive: false,
      createdAt: date,
      createdBy: this.user,
      id: uuid.v4(),
      message,
      updatedAt: date
    };
    this.setState({ message: "", messages: [newMessage, ...messages] });
  };

  private onDelete = (item: Message) => () => {
    this.setState({
      messages: this.state.messages.filter(
        (message: Message) => message.id !== item.id
      )
    });
  };
}
