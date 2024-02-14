import Original from '@mdi/react';
import React, { type CSSProperties } from 'react';
import { icon, type IconName } from './config';

type Properties = {
  readonly color?: string;
  readonly name: IconName;
  readonly style?: CSSProperties | undefined;
};

export const Source = ({ color, name, style }: Properties) => {
  const path = icon[name];
  return path ? (
    <Original
      color={color}
      path={icon[name]}
      style={style}
    />
  ) : null;
};
