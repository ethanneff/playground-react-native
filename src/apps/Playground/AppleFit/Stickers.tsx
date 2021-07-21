import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from '../../../components';
import {MonoMultiColor} from '../../../utils';

type Props = {
  color: keyof MonoMultiColor;
  index: number;
  icon: string;
  size: number;
  strokeWidth: number;
};

export const Stickers = memo(function Sticker({
  icon,
  index,
  color,
  size,
  strokeWidth,
}: Props) {
  const styles = StyleSheet.create({
    canvas: {height: size, width: size},
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View style={styles.overlay}>
      <View style={styles.canvas}>
        <Icon
          color={color}
          key={icon}
          name={icon}
          size={strokeWidth}
          style={{
            position: 'absolute',
            top: strokeWidth * index,
            left: size / 2 - strokeWidth / 2,
          }}
        />
      </View>
    </View>
  );
});
