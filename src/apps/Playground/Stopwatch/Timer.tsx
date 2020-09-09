import React, {memo} from 'react';
import {StyleProp, StyleSheet, TextStyle, View} from 'react-native';
import {Text} from '../../../components';

interface TimerProps {
  interval: number;
  style: StyleProp<TextStyle>;
}

export const Timer = memo(function Timer({interval, style}: TimerProps) {
  const pad = (n: number): string =>
    (n < 10 ? '0' + n.toString() : n).toString();
  const minutes = Math.floor(interval / 60000);
  const seconds = Math.floor((interval % 60000) / 1000);
  const milliseconds = Math.floor((interval % 60000) % 1000);
  const styles = StyleSheet.create({
    timerContainer: {
      flexDirection: 'row',
    },
  });
  return (
    <View style={styles.timerContainer}>
      <Text style={style} title={`${pad(minutes)}:`} />
      <Text style={style} title={`${pad(seconds)}.`} />
      <Text style={style} title={pad(milliseconds).substr(0, 2)} />
    </View>
  );
});
