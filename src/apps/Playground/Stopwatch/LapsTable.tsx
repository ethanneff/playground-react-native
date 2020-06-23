import React, {memo} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Lap from './Lap';

interface LapTableProps {
  laps: number[];
  timer: number;
}

export default memo(function LapsTable({laps, timer}: LapTableProps) {
  const finishedLaps = laps.slice(1);
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  if (finishedLaps.length >= 2) {
    finishedLaps.forEach((lap) => {
      if (lap < min) {
        min = lap;
      }
      if (lap > max) {
        max = lap;
      }
    });
  }
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
          key={laps.length - index}
          num={laps.length - index}
          slowest={lap === max}
        />
      ))}
    </ScrollView>
  );
});
