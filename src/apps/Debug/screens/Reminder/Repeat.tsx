import React, { memo } from "react";
import { View } from "react-native";
import { Button } from "../../../../components";

export default memo(function Repeat() {
  const onPress = () => undefined;
  return (
    <View>
      <Button title="daily" onPress={onPress} />
      <Button title="weekly" onPress={onPress} />
      <Button title="monthly" onPress={onPress} />
      <Button title="yearly" onPress={onPress} />
    </View>
  );
});
