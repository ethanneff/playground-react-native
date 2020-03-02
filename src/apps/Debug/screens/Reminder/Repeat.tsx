import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "../../../../components";

interface Props {
  onPress: () => void;
}

export default memo(function OneTime(props: Props) {
  return (
    <View>
      <Button title="daily" onPress={props.onPress} />
      <Button title="weekly" onPress={props.onPress} />
      <Button title="monthly" onPress={props.onPress} />
      <Button title="yearly" onPress={props.onPress} />
    </View>
  );
});
