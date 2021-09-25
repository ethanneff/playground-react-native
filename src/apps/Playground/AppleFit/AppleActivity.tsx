import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MonoMultiColor, useColor } from '../../../features';
import { CenterCircle } from './CenterCircle';
import { CircularRing } from './CircularRing';
import { Stickers } from './Stickers';
import { Ring } from './types';

type Props = {
  rings: Ring[];
  backgroundColor: keyof MonoMultiColor;
  strokeWidth: number;
  size: number;
  animate?: boolean;
  speed?: number;
};

export const AppleActivity = ({
  backgroundColor,
  rings,
  strokeWidth,
  size,
  animate,
  speed = 0.02,
}: Props): JSX.Element => {
  const color = useColor();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color.background[backgroundColor],
      height: size,
      width: size,
    },
    overlay: {
      alignItems: 'center',
      height: size,
      justifyContent: 'center',
      position: 'absolute',
      width: size,
    },
  });
  const radius = rings[rings.length - 1].size / 2 - strokeWidth;
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return undefined;

    const interval = setInterval(() => {
      if (progress >= 1) {
        clearInterval(interval);
        return;
      }
      setProgress((p) => p + speed);
    }, 16);
    return () => clearInterval(interval);
  }, [animate, progress, speed]);

  return (
    <View style={styles.container}>
      {rings.map((ring, index) => (
        <View key={ring.icon} style={styles.overlay}>
          <CircularRing
            ring={ring}
            strokeWidth={strokeWidth}
            theta={ring.theta * progress}
          />
          <Stickers
            color={backgroundColor}
            icon={ring.icon}
            index={index}
            size={size}
            strokeWidth={strokeWidth}
          />
        </View>
      ))}
      <CenterCircle backgroundColor={backgroundColor} radius={radius} />
    </View>
  );
};
