import moment from "moment";
import React from "react";
import { Image, View } from "react-native";
import { Message } from ".";
import { Text } from "../../../../components";
import { Theme } from "../../../../utils";

interface Props {
  item: Message;
  onDelete(item: Message): () => void;
}

export class Item extends React.PureComponent<Props> {
  public image = require("../../../../assets/line-chart.png");

  public render() {
    const { item } = this.props;
    return (
      <View key={item.id} style={{ flexDirection: "row" }}>
        <View style={{ width: 40 }}>
          <Image
            source={this.image}
            style={{
              alignSelf: "center",
              height: 20,
              paddingTop: 30,
              resizeMode: "contain",
              width: 20
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
