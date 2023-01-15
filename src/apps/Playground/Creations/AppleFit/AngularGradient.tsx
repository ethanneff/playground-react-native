import React from 'react';
import { Image, type ImageSourcePropType, StyleSheet } from 'react-native';
import { MaskedView, View } from '../../../../components';

type Props = {
  colors: [string, string];
  size: number;
};

export const AngularGradient = ({
  size,
  colors: [start, end],
}: Props): JSX.Element => {
  const borderRadius = size / 2;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: start,
      borderRadius,
      height: size,
      width: size,
    },
    flex: { flex: 1 },
    image: { borderRadius, height: size, width: size },
    view: { backgroundColor: end, borderRadius, flex: 1 },
  });
  const image = require('./mask.png') as ImageSourcePropType;
  const Mask = (
    <Image
      source={image}
      style={styles.image}
    />
  );
  return (
    <View style={styles.container}>
      <MaskedView
        maskElement={Mask}
        style={styles.flex}
      >
        <View style={styles.view} />
      </MaskedView>
    </View>
  );
};
