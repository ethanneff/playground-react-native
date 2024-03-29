import React from 'react';
import { FastImage } from '../FastImage';

type Properties = {
  readonly height: number;
  readonly onImageLoad: () => void;
  readonly uri: string;
  readonly width: number;
};

export const FasterImage = ({
  height,
  onImageLoad,
  uri,
  width,
}: Properties) => {
  const containerStyle = { height, width };
  return (
    <FastImage
      onLoad={onImageLoad}
      resizeMode={FastImage.resizeMode.cover}
      source={{ uri }}
      style={containerStyle}
    />
  );
};
