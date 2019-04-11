import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Message } from ".";
import { Button, RelativeDate, Text } from "../../../../components";
import { Theme } from "../../../../utils";
import moment from "moment";

interface Props {
  item: Message;
  onDelete(item: Message): () => void;
}

export class Item extends React.PureComponent<Props> {
  image = require("../../../../assets/line-chart.png");
  private styles = StyleSheet.create({});

  public render() {
    const { item, onDelete } = this.props;
    return (
      <View key={item.id} style={{ flexDirection: "row" }}>
        <View style={{ width: 40 }}>
          <Image
            source={this.image}
            style={{
              resizeMode: "contain",
              paddingTop: 30,
              width: 20,
              height: 20,
              alignSelf: "center"
            }}
          />
        </View>
        <View style={{ flexShrink: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              title={item.createdBy}
              h6
              bold
              style={{ paddingRight: Theme.padding.p02 }}
            />
            <Text title={moment(item.createdAt).format("LT")} subtitle1 />
            {/* <RelativeDate date={item.createdAt} /> */}
          </View>
          <Text title={item.message} body1 style={{ paddingTop: 5 }} />
        </View>
      </View>
    );
  }
}
