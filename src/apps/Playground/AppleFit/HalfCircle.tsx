import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {AngularGradient} from './AngularGradient';
import {Ring} from './types';

interface Props {
  radius: number;
  flip?: boolean;
  ring: Ring;
  type: 'foreground' | 'background';
}

export const HalfCircle = memo(function HalfCircle({
  type,
  radius,
  flip,
  ring,
}: Props) {
  const colors: [string, string] = [ring.start, ring.end];
  const fg = <AngularGradient colors={colors} size={ring.size} />;
  const bg = <View style={{backgroundColor: ring.bg, flex: 1}} />;
  const styles = StyleSheet.create({
    circle: {
      borderRadius: radius,
      height: radius * 2,
      overflow: 'hidden',
      transform: [{rotate: flip ? '180deg' : '0deg'}],
      width: radius * 2,
    },
    container: {
      height: radius,
      overflow: 'hidden',
      width: radius * 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.circle}>{type === 'foreground' ? fg : bg}</View>
    </View>
  );
});
