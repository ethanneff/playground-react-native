import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { RouteComponentProps } from "react-router";
import uuid from "uuid";
import { Button, Screen, Text, TextInput } from "../../../../components";
import RelativeDate from "../../../../components/RelativeDate";
import { Theme } from "../../../../utils";

interface Message {
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
  public styles = StyleSheet.create({
    row: {
      flexDirection: "row"
    }
  });
  public user = "123";
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
          <TextInput value={message} onChangeText={this.onMessageChange} />
          <Button icon="check" onPress={this.onSubmit} />
        </View>
      </Screen>
    );
  }

  private renderItem = ({ item }: { item: Message }) => {
    return (
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: Theme.padding.p02
        }}
      >
        <View
          style={{
            backgroundColor: Theme.color.primary,
            borderRadius: Theme.padding.p03,
            padding: Theme.padding.p02
          }}
        >
          <Text title={item.message} body2 />
          <RelativeDate date={item.createdAt} />
        </View>
        <Button
          title="D"
          onPress={() => {
            this.setState({
              messages: this.state.messages.filter(
                (message: Message) => message.id !== item.id
              )
            });
          }}
        />
      </View>
    );
  };
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
}
