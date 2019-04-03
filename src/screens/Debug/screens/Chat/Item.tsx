import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Message } from ".";
import { Button, RelativeDate, Text } from "../../../../components";
import { Theme } from "../../../../utils";

interface Props {
  item: Message;
  onDelete(item: Message): () => void;
}

export class Item extends React.PureComponent<Props> {
  private styles = StyleSheet.create({
    chat: {
      backgroundColor: Theme.color.primary,
      borderRadius: Theme.padding.p03,
      padding: Theme.padding.p02
    },
    container: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingTop: Theme.padding.p02
    }
  });

  public render() {
    const { item, onDelete } = this.props;
    return (
      <View key={item.id} style={this.styles.container}>
        <View style={this.styles.chat}>
          <Text title={item.message} body2 />
          <RelativeDate date={item.createdAt} />
        </View>
        <Button title="D" onPress={onDelete(item)} />
      </View>
    );
  }
}
