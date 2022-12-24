import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../../components';
import { useColors } from '../../../../features';
import { Timer } from './Timer';

type LapProps = {
  fastest: boolean;
  interval: number;
  num: number;
  slowest: boolean;
};

export const Lap = memo(function Lap({
  fastest,
  interval,
  num,
  slowest,
}: LapProps) {
  const colors = useColors();
  const styles = StyleSheet.create({
    fastest: {
      color: colors.text.positive,
    },
    lap: {
      borderColor: colors.border.secondary,
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },
    lapText: {
      color: colors.text.primaryB,
      fontFamily: 'Courier',
      fontSize: 18,
    },
    slowest: {
      color: colors.text.negative,
    },
  });
  const lapStyle = [
    styles.lapText,
    fastest ? styles.fastest : undefined,
    slowest ? styles.slowest : undefined,
  ];

  return (
    <View style={styles.lap}>
      <Text
        style={lapStyle}
        title={`Lap ${num}`}
      />
      <Timer
        interval={interval}
        style={lapStyle}
      />
    </View>
  );
});
