import Original from '@mdi/react';
import React, { CSSProperties, memo } from 'react';
import { icon, IconName } from './config';

type Props = {
  color?: string;
  name: IconName;
  style?: CSSProperties | undefined;
};

export const Source = memo(function IconSource({ color, name, style }: Props) {
  const path = icon[name];
  return path ? (
    <Original
      color={color}
      path={icon[name]}
      style={style}
    />
  ) : null;
});
