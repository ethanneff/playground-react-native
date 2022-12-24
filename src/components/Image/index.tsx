import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components';
import { Loader } from '../Loader';
import { FasterImage } from './FasterImage';

type Props = {
  height: number;
  size?: number | 'small' | 'large';
  uri: string;
  width: number;
};

export const Image = memo(function Image({
  height,
  size = 'small',
  uri,
  width,
}: Props) {
  const [opacity, setOpacity] = useState(1);
  const styles = StyleSheet.create({
    indicatorOverlay: {
      height,
      justifyContent: 'center',
      opacity,
      position: 'absolute',
      width,
    },
  });
  const onImageLoad = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <View>
      <FasterImage
        height={height}
        onImageLoad={onImageLoad}
        uri={uri}
        width={width}
      />
      <Loader
        size={size}
        style={styles.indicatorOverlay}
      />
    </View>
  );
});
