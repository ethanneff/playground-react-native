import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import {useColor} from '../../../features';
import {Timer} from './Timer';

interface LapProps {
  num: number;
  interval: number;
  fastest: boolean;
  slowest: boolean;
}

export const Lap = memo(function Lap({
  num,
  interval,
  fastest,
  slowest,
}: LapProps) {
  const color = useColor();
  const styles = StyleSheet.create({
    fastest: {
      color: color.text.positive,
    },
    lap: {
      borderColor: color.border.secondary,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    lapText: {
      color: color.text.primaryB,
      fontFamily: 'Courier',
      fontSize: 18,
    },
    slowest: {
      color: color.text.negative,
    },
  });
  const lapStyle = [
    styles.lapText,
    fastest ? styles.fastest : undefined,
    slowest ? styles.slowest : undefined,
  ];

  return (
    <View style={styles.lap}>
      <Text style={lapStyle} title={`Lap ${num}`} />
      <Timer interval={interval} style={lapStyle} />
    </View>
  );
});
