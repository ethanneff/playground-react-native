import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components';
import { Loader } from '../Loader';
import { FasterImage } from './FasterImage';

type Props = {
  readonly height: number;
  readonly size?: number | 'large' | 'small';
  readonly uri: string;
  readonly width: number;
};

export const Image = ({ height, size = 'small', uri, width }: Props) => {
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
};
