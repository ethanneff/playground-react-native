import moment from "moment";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import uuid from "uuid";
import { Button, Screen, TextInput } from "../../../../components";
import { navigate, NavigationScreen } from "../../../../models";
import { Item } from "./Item";

export interface Message {
  id: string;
  createdBy: string;
  updatedAt: number;
  createdAt: number;
  message: string;
  archive: boolean;
}

interface DispatchProps {
  navigate: typeof navigate;
}

type Props = DispatchProps;

interface State {
  message: string;
  messages: Message[];
}

const fakeData: Message[] = [
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 0,
        hours: 4,
        minutes: 4
      })
      .valueOf(),
    createdBy: "User steve",
    id: "6",
    message: "again",
    updatedAt: Date.now()
  },
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 1,
        hours: 1,
        minutes: 0
      })
      .valueOf(),
    createdBy: "User bob",
    id: "5",
    message: "another message",
    updatedAt: Date.now()
  },
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 2,
        hours: 8,
        minutes: 0
      })
      .valueOf(),
    createdBy: "User steve",
    id: "4",
    message: "first message",
    updatedAt: Date.now()
  },
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 2,
        hours: 6,
        minutes: 0
      })
      .valueOf(),
    createdBy: "User bob",
    id: "3",
    message: "third message",
    updatedAt: Date.now()
  },
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 3,
        hours: 2,
        minutes: 0
      })
      .valueOf(),
    createdBy: "User bob",
    id: "2",
    message: "second message",
    updatedAt: Date.now()
  },
  {
    archive: false,
    createdAt: moment()
      .subtract({
        days: 3,
        hours: 1,
        minutes: 0
      })
      .valueOf(),
    createdBy: "User bob",
    id: "1",
    message:
      "helloasdinaso dinasdoias daso dinaso dna nasd oiasnd ona niosao ao noinoas ao nodasno d",
    updatedAt: Date.now()
  }
];

class Container extends React.PureComponent<Props, State> {
  public readonly state = {
    message: "",
    messages: fakeData
  };

  private readonly styles = StyleSheet.create({
    row: {
      flexDirection: "row"
    }
  });
  private readonly user = "User bob";
  private readonly sendIcon = "send";
  public render() {
    const { message, messages } = this.state;

    return (
      <Screen onLeftPress={this.nav("debug")}>
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
  private nav = (to: NavigationScreen) => () => this.props.navigate(to);

  private renderItem = ({ item }: { item: Message }) => (
    <Item item={item} onDelete={this.onDelete} />
  );

  private keyExtractor = (item: Message) => item.id;

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

const mapDispatchToProps: DispatchProps = { navigate };

export default connect(
  null,
  mapDispatchToProps
)(Container);
