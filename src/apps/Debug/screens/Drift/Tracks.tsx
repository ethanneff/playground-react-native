import React, {memo, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorChoice} from './Dpad';
import {DriftContext} from './Context';

export type TrackPosition = {x: number; y: number; size: number};
export type TrackPositionWithColor = TrackPosition & {color: ColorChoice};

interface TrackProps {
  track: TrackPositionWithColor;
}

const Track = memo(function TrackMemo({track}: TrackProps) {
  const size = track.size / 4;
  const styles = StyleSheet.create({
    tracks: {
      opacity: 0.4,
      borderRadius: track.size,
      position: 'absolute',
      width: size,
      height: size,
      backgroundColor: track.color,
    },
  });
  return (
    <View>
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
    </View>
  );
});

export const Tracks = memo(function TracksMemo() {
  const {state} = useContext(DriftContext);
  return (
    <View>
      {state.tracks.map((track: TrackPositionWithColor, index: number) => (
        <Track key={`${track.x}${track.y}${index}`} track={track} />
      ))}
    </View>
  );
});
