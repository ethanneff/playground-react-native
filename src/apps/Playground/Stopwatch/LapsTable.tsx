import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { v4 } from 'uuid';
import { ScrollView } from '../../../conversions';
import { Lap } from './Lap';

interface LapTableProps {
  laps: number[];
  timer: number;
}

export const LapsTable = memo(function LapsTable({
  laps,
  timer,
}: LapTableProps) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2)
    finishedLaps.forEach((lap) => {
      if (lap < min) min = lap;

      if (lap > max) max = lap;
    });

  const styles = StyleSheet.create({
    scrollView: {
      alignSelf: 'stretch',
    },
  });
  return (
    <ScrollView style={styles.scrollView}>
      {laps.map((lap, index) => (
        <Lap
          fastest={lap === min}
          interval={index === 0 ? timer + lap : lap}
          key={v4()}
          num={laps.length - index}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
});
