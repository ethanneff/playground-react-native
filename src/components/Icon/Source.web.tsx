import Original from '@mdi/react';
import React, { CSSProperties, memo } from 'react';
import { Icons } from './config';

type Props = {
  color?: string;
  name: keyof typeof Icons;
  style?: CSSProperties | undefined;
};

export const Source = memo(function IconSource({ name, color, style }: Props) {
  const path = Icons[name];
  return path ? (
    <Original color={color} path={Icons[name]} style={style} />
  ) : null;
});
