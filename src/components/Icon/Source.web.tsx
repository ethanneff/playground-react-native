import React, {memo} from 'react';
import Original from '@mdi/react';
import {Icons} from './config';

interface Props {
  name: keyof typeof Icons;
  color?: string;
  style?: {};
}

export const Source = memo(function IconSource({name, color, style}: Props) {
  const path = Icons[name];
  return !path ? null : (
    <Original path={Icons[name]} color={color} style={style} />
  );
});
