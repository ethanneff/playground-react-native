import React, { memo } from "react";
import { View, Text } from "react-native";
import { useRootSelector } from "../../../../utils";

interface Props {
  title: string;
  description: string;
}

export default memo(function ExampleComponent(props: Props) {
  const appVersion = useRootSelector(state => state.device.version);
  return (
    <View>
      <Text testID="title">{props.title}</Text>
      <Text testID="description">{props.description}</Text>
      <Text testID="appVersion">{appVersion}</Text>
    </View>
  );
});
