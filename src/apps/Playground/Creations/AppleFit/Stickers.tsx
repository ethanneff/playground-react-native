import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, View, type IconName } from '../../../../components';
import { type MonoMultiColor } from '../../../../features';

type Properties = {
  readonly color: keyof MonoMultiColor;
  readonly icon: IconName;
  readonly index: number;
  readonly size: number;
  readonly strokeWidth: number;
};

export const Stickers = ({
  color,
  icon,
  index,
  size,
  strokeWidth,
}: Properties) => {
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
};
