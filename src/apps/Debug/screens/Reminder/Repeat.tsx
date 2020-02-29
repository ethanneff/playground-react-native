import dayjs, { Dayjs } from "dayjs";
import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, Text, Button } from "../../../../components";
import { Theme } from "../../../../utils";

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
