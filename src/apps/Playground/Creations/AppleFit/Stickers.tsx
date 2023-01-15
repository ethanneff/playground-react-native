import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, type IconName, View } from '../../../../components';
import { type MonoMultiColor } from '../../../../features';

type Props = {
  color: keyof MonoMultiColor;
  icon: IconName;
  index: number;
  size: number;
  strokeWidth: number;
};

export const Stickers = memo(function Sticker({
  color,
  icon,
  index,
  size,
  strokeWidth,
}: Props) {
  const styles = StyleSheet.create({
    canvas: { height: size, width: size },
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
            left: size / 2 - strokeWidth / 2,
            position: 'absolute',
            top: strokeWidth * index,
          }}
        />
      </View>
    </View>
  );
});
