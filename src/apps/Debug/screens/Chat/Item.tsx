import React, { memo } from "react";
import { Image, View } from "react-native";
import { Text, RelativeDate } from "../../../../components";
import { Theme } from "../../../../utils";
import { Message } from "./Messages";

interface Props {
  item: Message;
}

const image = require("../../../../assets/line-chart.png");
export const Item = memo(function ChatMessage({ item }: Props) {
  return (
    <View key={item.id} style={{ flexDirection: "row" }}>
      <View style={{ width: 40 }}>
        <Image
          source={image}
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
            title={item.userId}
            h6
            bold
            style={{ paddingRight: Theme.padding.p02 }}
          />

          <RelativeDate date={item.createdAt} />
        </View>
        <Text title={item.message} body1 style={{ paddingTop: 5 }} />
      </View>
    </View>
  );
});
