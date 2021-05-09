import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from '../ActivityIndicator';
import {FasterImage} from './FasterImage';

type Props = {
  uri: string;
  height: number;
  width: number;
  size?: number | 'small' | 'large';
};

export const Image = memo(function Image({
  uri,
  height,
  width,
  size = 'small',
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
      <ActivityIndicator size={size} style={styles.indicatorOverlay} />
    </View>
  );
});
