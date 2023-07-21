import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../../components';
import { useColors } from '../../../../features';
import { Timer } from './Timer';

type LapProps = {
  readonly fastest: boolean;
  readonly interval: number;
  readonly num: number;
  readonly slowest: boolean;
};

export const Lap = ({ fastest, interval, num, slowest }: LapProps) => {
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
};
