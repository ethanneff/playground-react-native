import React, {memo} from 'react';
import Original from '@mdi/react';
import {Icons} from './config';

interface Props {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  style?: {};
}

export const Source: React.FC<Props> = memo(function IconSource({
  name,
  color,

  style,
}) {
  const path = Icons[name];
  return !path ? null : (
    <Original path={Icons[name]} color={color} style={style} />
  );
});
