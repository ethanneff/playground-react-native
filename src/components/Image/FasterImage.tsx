import React, {memo} from 'react';
import FastImage from 'react-native-fast-image';

type Props = {
  onImageLoad: () => void;
  uri: string;
  width: number;
  height: number;
};

export const FasterImage = memo(function FasterImage({
  onImageLoad,
  uri,
  width,
  height,
}: Props) {
  const containerStyle = {width, height};
  return (
    <FastImage
      onLoad={onImageLoad}
      resizeMode={FastImage.resizeMode.cover}
      source={{uri}}
      style={containerStyle}
    />
  );
});
