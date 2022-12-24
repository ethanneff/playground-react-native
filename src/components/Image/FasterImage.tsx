import React, { memo } from 'react';
import { FastImage } from '../FastImage';

type Props = {
  height: number;
  onImageLoad: () => void;
  uri: string;
  width: number;
};

export const FasterImage = memo(function FasterImage({
  height,
  onImageLoad,
  uri,
  width,
}: Props) {
  const containerStyle = { height, width };
  return (
    <FastImage
      onLoad={onImageLoad}
      resizeMode={FastImage.resizeMode.cover}
      source={{ uri }}
      style={containerStyle}
    />
  );
});
