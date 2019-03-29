import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { RouteComponentProps } from "react-router";
import uuid from "uuid";
import { Button, Screen, Text, TextInput } from "../../../../components";

interface Message {
  id: string;
  createdBy: string;
  createdAt: number;
  message: string;
}
type Props = RouteComponentProps;
interface State { message: String; messages: Message[] }

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
    console.log(messages);
    return (
      <Screen onLeftPress={this.navBack}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => <Text title={item.message} key={item.id} />}
        />
        {/* <View style={this.styles.row}> */}
        <Button icon="check" onPress={this.onSubmit} />
        <TextInput
          title="bobo"
          value={message}
          onChangeText={this.onMessageChange}
          style={{ width: "100%" }}
          error="rar"
        />
        {/* </View> */}
      </Screen>
    );
  }

  private keyExtractor = (item: Message) => item.id;
  private navBack = () => this.props.history.goBack();
  private onMessageChange = (message: String) => this.setState({ message });
  private onSubmit = () => {
    const { message, messages } = this.state;
    const newMessage: Message = {
      id: uuid.v4(),
      createdBy: this.user,
      createdAt: Date.now(),
      message
    };
    this.setState({ message: "", messages: [newMessage, ...messages] });
  };
}
