import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { v4 } from 'uuid';
import { View } from '../../../../components';
import { DriftContext } from './Context';
import { type TrackPositionWithColor } from './types';

type TrackProperties = {
  readonly track: TrackPositionWithColor;
};

const Track = ({ track }: TrackProperties) => {
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
          left: track.x + track.size / 2 - track.size / 2,
          top: track.y - track.size / 2 - size / 2,
        }}
      />
      <View
        style={{
          ...styles.tracks,
          left: track.x + track.size / 2 + track.size / 2 - size,
          top: track.y - track.size / 2 - size / 2,
        }}
      />
    </>
  );
};

export const Tracks = () => {
  const { state } = useContext(DriftContext);
  return (
    <>
      {state.tracks.map((track: TrackPositionWithColor) => (
        <Track
          key={v4()}
          track={track}
        />
      ))}
    </>
  );
};
