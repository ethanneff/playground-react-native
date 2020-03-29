import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Timer from './Timer';

interface LapProps {
  num: number;
  interval: number;
  fastest: boolean;
  slowest: boolean;
}

export default memo(function Lap({num, interval, fastest, slowest}: LapProps) {
  const styles = StyleSheet.create({
    fastest: {
      color: '#4BC05F',
    },
    lap: {
      borderColor: '#151515',
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    lapText: {
      color: '#FFFFFF',
      fontFamily: 'Courier',
      fontSize: 18,
    },
    slowest: {
      color: '#CC3531',
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
