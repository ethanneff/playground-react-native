import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { ColorChoice } from "./Dpad";

export type TrackPosition = { x: number; y: number; size: number };
export type TrackPositionWithColor = TrackPosition & { color: ColorChoice };

interface TracksProps {
  tracks: TrackPositionWithColor[];
}
interface TrackProps {
  track: TrackPositionWithColor;
}

const Track = memo(function TrackMemo({ track }: TrackProps) {
  const size = track.size / 4;
  const styles = StyleSheet.create({
    tracks: {
      opacity: 0.4,
      borderRadius: track.size,
      position: "absolute",
      width: size,
      height: size,
      backgroundColor: track.color
    }
  });
  return (
    <View>
      <View
        style={{
          ...styles.tracks,
          top: track.y - track.size / 2 - size / 2,
          left: track.x + track.size / 2 - track.size / 2
        }}
      />
      <View
        style={{
          ...styles.tracks,
          top: track.y - track.size / 2 - size / 2,
          left: track.x + track.size / 2 + track.size / 2 - size
        }}
      />
    </View>
  );
});

export const Tracks = memo(function TracksMemo({ tracks }: TracksProps) {
  return (
    <View>
      {tracks.map((track, index) => 
        <Track key={`${track.x}${track.y}${index}`} track={track} />
      )}
    </View>
  );
});
