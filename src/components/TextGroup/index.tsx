import React, { type ReactNode } from 'react';
import {
  // eslint-disable-next-line no-restricted-imports
  Text as OriginalText,
  type StyleProp,
  type TextStyle,
} from 'react-native';

type Props = {
  children: ReactNode | ReactNode[];
  style: StyleProp<TextStyle>;
};

export const TextGroup = ({ children, style }: Props) => {
  return <OriginalText style={style}>{children}</OriginalText>;
};
