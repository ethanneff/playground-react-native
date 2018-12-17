import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  title: string;
  description: string;
  onPress(): void;
}

export class Card extends React.PureComponent<Props> {
  public render() {
    const { onPress, title, description } = this.props;
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        onPress={onPress}
      >
        <View
          style={{
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1,
            backgroundColor: "#fafafa"
          }}
        >
          <Text>{title}</Text>
          <Text style={{ color: "#666" }}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
