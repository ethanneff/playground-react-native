import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {MaskedView} from '../../../conversions';

interface Props {
  size: number;
  colors: [string, string];
}

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
    flex: {flex: 1},
    image: {borderRadius, height: size, width: size},
    view: {backgroundColor: end, borderRadius, flex: 1},
  });
  const Mask = <Image source={require('./mask.png')} style={styles.image} />;
  return (
    <View style={styles.container}>
      <MaskedView maskElement={Mask} style={styles.flex}>
        <View style={styles.view} />
      </MaskedView>
    </View>
  );
};
