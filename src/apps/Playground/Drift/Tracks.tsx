import React, {memo, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {DriftContext} from './Context';
import {TrackPositionWithColor} from './types';

interface TrackProps {
  track: TrackPositionWithColor;
}

const Track = memo(function TrackMemo({track}: TrackProps) {
  const size = track.size / 4;
  const styles = StyleSheet.create({
    tracks: {
      backgroundColor: track.color,
      borderRadius: track.size,
      height: size,
      opacity: 0.4,
      position: 'absolute',
      width: size,
    },
  });
  return (
    <>
      <View
        style={{
          ...styles.tracks,
          top: track.y - track.size / 2 - size / 2,
          left: track.x + track.size / 2 - track.size / 2,
        }}
      />
      <View
        style={{
          ...styles.tracks,
          top: track.y - track.size / 2 - size / 2,
          left: track.x + track.size / 2 + track.size / 2 - size,
        }}
      />
    </>
  );
});

export const Tracks = memo(function TracksMemo() {
  const {state} = useContext(DriftContext);
  return (
    <>
      {state.tracks.map((track: TrackPositionWithColor, index: number) => (
        <Track key={`${track.x}${track.y}${index}`} track={track} />
      ))}
    </>
  );
});
