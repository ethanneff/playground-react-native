import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../../../components';
import { useColors, type MonoMultiColor } from '../../../../features';
import { CenterCircle } from './CenterCircle';
import { CircularRing } from './CircularRing';
import { Stickers } from './Stickers';
import { type Ring } from './types';

type Properties = {
  readonly animate?: boolean;
  readonly backgroundColor: keyof MonoMultiColor;
  readonly rings: Ring[];
  readonly size: number;
  readonly speed?: number;
  readonly strokeWidth: number;
};

export const AppleActivity = ({
  animate,
  backgroundColor,
  rings,
  size,
  speed = 0.02,
  strokeWidth,
}: Properties) => {
  const colors = useColors();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background[backgroundColor],
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
  const radius = (rings.at(-1)?.size ?? 10) / 2 - strokeWidth;
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return () => null;

    const interval = setInterval(() => {
      if (progress >= 1) {
        clearInterval(interval);
        return;
      }
      setProgress((p) => p + speed);
    }, 16);
    return () => {
      clearInterval(interval);
    };
  }, [animate, progress, speed]);

  return (
    <View style={styles.container}>
      {rings.map((ring, index) => (
        <View
          key={ring.icon}
          style={styles.overlay}
        >
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
      <CenterCircle
        backgroundColor={backgroundColor}
        radius={radius}
      />
    </View>
  );
};
