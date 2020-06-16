import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useColor} from '../../../../hooks';
import Timer from './Timer';

interface LapProps {
  num: number;
  interval: number;
  fastest: boolean;
  slowest: boolean;
}

export default memo(function Lap({num, interval, fastest, slowest}: LapProps) {
  const color = useColor();
  const styles = StyleSheet.create({
    fastest: {
      color: color.success,
    },
    lap: {
      borderColor: color.secondary,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    lapText: {
      color: color.text,
      fontFamily: 'Courier',
      fontSize: 18,
    },
    slowest: {
      color: color.danger,
    },
  });
  const lapStyle = [
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ];

  return (
    <View style={styles.lap}>
      <Text style={lapStyle}>Lap {num}</Text>
      <Timer style={lapStyle} interval={interval} />
    </View>
  );
});
