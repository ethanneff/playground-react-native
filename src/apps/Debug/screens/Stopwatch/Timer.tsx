import React, { memo } from "react";
import { View, StyleSheet, Text, TextStyle, StyleProp } from "react-native";

interface TimerProps {
  interval: number;
  style: StyleProp<TextStyle>;
}

export default memo(function Timer({ interval, style }: TimerProps) {
  const pad = (n: number): string =>
    (n < 10 ? "0" + n.toString() : n).toString();
  const minutes = Math.floor(interval / 60000);
  const seconds = Math.floor(interval % 60000 / 1000);
  const milliseconds = Math.floor(interval % 60000 % 1000);
  const styles = StyleSheet.create({
    timerContainer: {
      flexDirection: "row"
    }
  });
  return (
    <View style={styles.timerContainer}>
      <Text style={style}>{pad(minutes)}:</Text>
      <Text style={style}>{pad(seconds)}.</Text>
      <Text style={style}>{pad(milliseconds).substr(0, 2)}</Text>
    </View>
  );
});
